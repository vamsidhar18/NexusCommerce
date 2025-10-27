package com.ecommerce.order.service;

import com.ecommerce.common.events.OrderEvent;
import com.ecommerce.order.dto.OrderRequest;
import com.ecommerce.order.dto.OrderResponse;
import com.ecommerce.order.entity.Order;
import com.ecommerce.order.entity.OrderItem;
import com.ecommerce.order.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Transactional
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private KafkaTemplate<String, OrderEvent> kafkaTemplate;

    public Page<OrderResponse> getAllOrders(Pageable pageable) {
        Page<Order> orders = orderRepository.findAll(pageable);
        return orders.map(this::convertToResponse);
    }

    public OrderResponse getOrderById(String orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        return convertToResponse(order);
    }

    public Page<OrderResponse> getOrdersByUserId(String userId, Pageable pageable) {
        Page<Order> orders = orderRepository.findByUserId(userId, pageable);
        return orders.map(this::convertToResponse);
    }

    public Page<OrderResponse> getOrdersByStatus(Order.OrderStatus status, Pageable pageable) {
        Page<Order> orders = orderRepository.findByStatus(status, pageable);
        return orders.map(this::convertToResponse);
    }

    public OrderResponse createOrder(OrderRequest request) {
        Order order = new Order();
        order.setUserId(request.getUserId());
        order.setShippingAddress(request.getShippingAddress());
        order.setPaymentMethod(request.getPaymentMethod());
        
        // Calculate total amount and create order items
        BigDecimal totalAmount = BigDecimal.ZERO;
        List<OrderItem> orderItems = request.getItems().stream()
                .map(itemRequest -> {
                    OrderItem item = new OrderItem();
                    item.setProductId(itemRequest.getProductId());
                    item.setProductName(itemRequest.getProductName());
                    item.setQuantity(itemRequest.getQuantity());
                    item.setPrice(itemRequest.getPrice());
                    item.setTotalPrice(itemRequest.getPrice().multiply(BigDecimal.valueOf(itemRequest.getQuantity())));
                    item.setOrder(order);
                    return item;
                })
                .collect(Collectors.toList());
        
        totalAmount = orderItems.stream()
                .map(OrderItem::getTotalPrice)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        
        order.setTotalAmount(totalAmount);
        order.setItems(orderItems);
        
        Order savedOrder = orderRepository.save(order);
        
        // Publish order created event
        publishOrderEvent(savedOrder, OrderEvent.ORDER_CREATED);
        
        return convertToResponse(savedOrder);
    }

    public OrderResponse updateOrderStatus(String orderId, Order.OrderStatus status) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        
        order.setStatus(status);
        Order updatedOrder = orderRepository.save(order);
        
        // Publish status update event
        String eventType = switch (status) {
            case CONFIRMED -> OrderEvent.ORDER_CONFIRMED;
            case CANCELLED -> OrderEvent.ORDER_CANCELLED;
            default -> "ORDER_STATUS_UPDATED";
        };
        
        publishOrderEvent(updatedOrder, eventType);
        
        return convertToResponse(updatedOrder);
    }

    public void cancelOrder(String orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        
        if (order.getStatus() == Order.OrderStatus.PENDING || 
            order.getStatus() == Order.OrderStatus.CONFIRMED) {
            order.setStatus(Order.OrderStatus.CANCELLED);
            orderRepository.save(order);
            
            publishOrderEvent(order, OrderEvent.ORDER_CANCELLED);
        } else {
            throw new RuntimeException("Cannot cancel order in current status: " + order.getStatus());
        }
    }

    public List<OrderResponse> getOrdersByDateRange(LocalDateTime startDate, LocalDateTime endDate) {
        List<Order> orders = orderRepository.findOrdersByDateRange(startDate, endDate);
        return orders.stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    public Long getOrderCountByStatus(Order.OrderStatus status) {
        return orderRepository.countByStatus(status);
    }

    public Double getTotalRevenue() {
        return orderRepository.getTotalRevenue();
    }

    public Page<OrderResponse> getRecentOrders(Pageable pageable) {
        Page<Order> orders = orderRepository.findRecentOrders(pageable);
        return orders.map(this::convertToResponse);
    }

    private void publishOrderEvent(Order order, String eventType) {
        try {
            OrderEvent event = new OrderEvent();
            event.setEventId(UUID.randomUUID().toString());
            event.setEventType(eventType);
            event.setOrderId(order.getId());
            event.setUserId(order.getUserId());
            event.setTotalAmount(order.getTotalAmount());
            
            List<OrderEvent.OrderItem> eventItems = order.getItems().stream()
                    .map(item -> new OrderEvent.OrderItem(
                            item.getProductId(),
                            item.getProductName(),
                            item.getQuantity(),
                            item.getPrice()
                    ))
                    .collect(Collectors.toList());
            
            event.setItems(eventItems);
            
            kafkaTemplate.send("order-events", event);
        } catch (Exception e) {
            // Log error but don't fail the transaction
            System.err.println("Failed to publish order event: " + e.getMessage());
        }
    }

    private OrderResponse convertToResponse(Order order) {
        OrderResponse response = new OrderResponse();
        response.setId(order.getId());
        response.setUserId(order.getUserId());
        response.setTotalAmount(order.getTotalAmount());
        response.setStatus(order.getStatus().name());
        response.setShippingAddress(order.getShippingAddress());
        response.setPaymentMethod(order.getPaymentMethod());
        response.setPaymentId(order.getPaymentId());
        response.setCreatedAt(order.getCreatedAt());
        response.setUpdatedAt(order.getUpdatedAt());
        
        List<OrderResponse.OrderItemResponse> itemResponses = order.getItems().stream()
                .map(item -> {
                    OrderResponse.OrderItemResponse itemResponse = new OrderResponse.OrderItemResponse();
                    itemResponse.setId(item.getId());
                    itemResponse.setProductId(item.getProductId());
                    itemResponse.setProductName(item.getProductName());
                    itemResponse.setQuantity(item.getQuantity());
                    itemResponse.setPrice(item.getPrice());
                    itemResponse.setTotalPrice(item.getTotalPrice());
                    return itemResponse;
                })
                .collect(Collectors.toList());
        
        response.setItems(itemResponses);
        return response;
    }
}