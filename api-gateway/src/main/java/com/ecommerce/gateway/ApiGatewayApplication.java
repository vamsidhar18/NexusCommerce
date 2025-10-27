package com.ecommerce.gateway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class ApiGatewayApplication {

    public static void main(String[] args) {
        SpringApplication.run(ApiGatewayApplication.class, args);
    }

    @Bean
    public RouteLocator customRouteLocator(RouteLocatorBuilder builder) {
        return builder.routes()
                // User Service Routes
                .route("user-service", r -> r.path("/api/users/**", "/api/auth/**")
                        .filters(f -> f.circuitBreaker(config -> config
                                .setName("user-service-cb")
                                .setFallbackUri("forward:/fallback/users")))
                        .uri("http://user-service:8081"))
                
                // Product Service Routes
                .route("product-service", r -> r.path("/api/products/**", "/api/categories/**")
                        .filters(f -> f.circuitBreaker(config -> config
                                .setName("product-service-cb")
                                .setFallbackUri("forward:/fallback/products")))
                        .uri("http://product-service:8082"))
                
                // Order Service Routes
                .route("order-service", r -> r.path("/api/orders/**")
                        .filters(f -> f.circuitBreaker(config -> config
                                .setName("order-service-cb")
                                .setFallbackUri("forward:/fallback/orders")))
                        .uri("http://order-service:8083"))
                
                // Payment Service Routes
                .route("payment-service", r -> r.path("/api/payments/**")
                        .filters(f -> f.circuitBreaker(config -> config
                                .setName("payment-service-cb")
                                .setFallbackUri("forward:/fallback/payments")))
                        .uri("http://payment-service:8084"))
                
                // Inventory Service Routes
                .route("inventory-service", r -> r.path("/api/inventory/**")
                        .filters(f -> f.circuitBreaker(config -> config
                                .setName("inventory-service-cb")
                                .setFallbackUri("forward:/fallback/inventory")))
                        .uri("http://inventory-service:8085"))
                
                .build();
    }
}