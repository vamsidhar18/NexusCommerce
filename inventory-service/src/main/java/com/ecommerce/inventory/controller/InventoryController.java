package com.ecommerce.inventory.controller;

import com.ecommerce.common.dto.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/inventory")
@CrossOrigin(origins = "*")
public class InventoryController {

    @GetMapping("/{productId}")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getInventory(@PathVariable String productId) {
        Map<String, Object> inventory = new HashMap<>();
        inventory.put("productId", productId);
        inventory.put("quantity", 100); // Mock data
        inventory.put("reserved", 5);
        inventory.put("available", 95);
        
        return ResponseEntity.ok(ApiResponse.success(inventory));
    }

    @PostMapping("/reserve")
    public ResponseEntity<ApiResponse<String>> reserveInventory(@RequestBody Map<String, Object> request) {
        // Mock inventory reservation
        return ResponseEntity.ok(ApiResponse.success("Inventory reserved successfully"));
    }

    @GetMapping("/health")
    public ResponseEntity<ApiResponse<String>> health() {
        return ResponseEntity.ok(ApiResponse.success("Inventory service is healthy"));
    }
}