package com.ecommerce.notification.service;

import com.ecommerce.common.events.OrderEvent;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class NotificationService {

    @KafkaListener(topics = "order-events", groupId = "notification-group")
    public void handleOrderEvent(OrderEvent event) {
        System.out.println("Processing notification for order event: " + event.getEventType());
        
        switch (event.getEventType()) {
            case OrderEvent.ORDER_CREATED:
                sendOrderConfirmationEmail(event);
                break;
            case OrderEvent.ORDER_CONFIRMED:
                sendOrderConfirmedEmail(event);
                break;
            case OrderEvent.ORDER_CANCELLED:
                sendOrderCancelledEmail(event);
                break;
            case OrderEvent.PAYMENT_PROCESSED:
                sendPaymentConfirmationEmail(event);
                break;
            default:
                System.out.println("Unknown event type: " + event.getEventType());
        }
    }

    private void sendOrderConfirmationEmail(OrderEvent event) {
        System.out.println("Sending order confirmation email for order: " + event.getOrderId());
        // Mock email sending logic
    }

    private void sendOrderConfirmedEmail(OrderEvent event) {
        System.out.println("Sending order confirmed email for order: " + event.getOrderId());
        // Mock email sending logic
    }

    private void sendOrderCancelledEmail(OrderEvent event) {
        System.out.println("Sending order cancelled email for order: " + event.getOrderId());
        // Mock email sending logic
    }

    private void sendPaymentConfirmationEmail(OrderEvent event) {
        System.out.println("Sending payment confirmation email for order: " + event.getOrderId());
        // Mock email sending logic
    }
}