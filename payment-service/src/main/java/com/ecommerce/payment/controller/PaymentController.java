package com.ecommerce.payment.controller;

import com.ecommerce.common.dto.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/payments")
@CrossOrigin(origins = "*")
public class PaymentController {

    @PostMapping("/process")
    public ResponseEntity<ApiResponse<Map<String, Object>>> processPayment(
            @RequestBody Map<String, Object> paymentRequest) {
        
        try {
            // Simulate payment processing
            String orderId = (String) paymentRequest.get("orderId");
            BigDecimal amount = new BigDecimal(paymentRequest.get("amount").toString());
            String paymentMethod = (String) paymentRequest.get("paymentMethod");
            
            // Simulate payment gateway response
            Map<String, Object> response = new HashMap<>();
            response.put("paymentId", "PAY-" + UUID.randomUUID().toString().substring(0, 8));
            response.put("orderId", orderId);
            response.put("amount", amount);
            response.put("status", "SUCCESS");
            response.put("paymentMethod", paymentMethod);
            response.put("transactionId", "TXN-" + System.currentTimeMillis());
            
            return ResponseEntity.ok(ApiResponse.success("Payment processed successfully", response));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Payment processing failed: " + e.getMessage()));
        }
    }

    @GetMapping("/status/{paymentId}")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getPaymentStatus(@PathVariable String paymentId) {
        Map<String, Object> status = new HashMap<>();
        status.put("paymentId", paymentId);
        status.put("status", "SUCCESS");
        status.put("timestamp", System.currentTimeMillis());
        
        return ResponseEntity.ok(ApiResponse.success(status));
    }

    @GetMapping("/health")
    public ResponseEntity<ApiResponse<String>> health() {
        return ResponseEntity.ok(ApiResponse.success("Payment service is healthy"));
    }
}