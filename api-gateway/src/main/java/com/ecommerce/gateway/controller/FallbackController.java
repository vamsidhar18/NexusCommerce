package com.ecommerce.gateway.controller;

import com.ecommerce.common.dto.ApiResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/fallback")
public class FallbackController {

    @GetMapping("/users")
    public Mono<ApiResponse<String>> userServiceFallback() {
        return Mono.just(ApiResponse.error("User service is temporarily unavailable. Please try again later."));
    }

    @GetMapping("/products")
    public Mono<ApiResponse<String>> productServiceFallback() {
        return Mono.just(ApiResponse.error("Product service is temporarily unavailable. Please try again later."));
    }

    @GetMapping("/orders")
    public Mono<ApiResponse<String>> orderServiceFallback() {
        return Mono.just(ApiResponse.error("Order service is temporarily unavailable. Please try again later."));
    }

    @GetMapping("/payments")
    public Mono<ApiResponse<String>> paymentServiceFallback() {
        return Mono.just(ApiResponse.error("Payment service is temporarily unavailable. Please try again later."));
    }

    @GetMapping("/inventory")
    public Mono<ApiResponse<String>> inventoryServiceFallback() {
        return Mono.just(ApiResponse.error("Inventory service is temporarily unavailable. Please try again later."));
    }
}