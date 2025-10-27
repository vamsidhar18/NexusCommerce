package com.ecommerce.product.service;

import com.ecommerce.product.dto.ProductRequest;
import com.ecommerce.product.dto.ProductResponse;
import com.ecommerce.product.entity.Product;
import com.ecommerce.product.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Cacheable(value = "products", key = "#pageable.pageNumber + '-' + #pageable.pageSize")
    public Page<ProductResponse> getAllProducts(Pageable pageable) {
        Page<Product> products = productRepository.findByActiveTrue(pageable);
        return products.map(this::convertToResponse);
    }

    @Cacheable(value = "product", key = "#productId")
    public ProductResponse getProductById(String productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        return convertToResponse(product);
    }

    public Page<ProductResponse> getProductsByCategory(String category, Pageable pageable) {
        Page<Product> products = productRepository.findByActiveTrueAndCategory(category, pageable);
        return products.map(this::convertToResponse);
    }

    public Page<ProductResponse> searchProducts(String keyword, Pageable pageable) {
        Page<Product> products = productRepository.searchProducts(keyword, pageable);
        return products.map(this::convertToResponse);
    }

    public Page<ProductResponse> getProductsByPriceRange(BigDecimal minPrice, BigDecimal maxPrice, Pageable pageable) {
        Page<Product> products = productRepository.findByPriceRange(minPrice, maxPrice, pageable);
        return products.map(this::convertToResponse);
    }

    @Cacheable(value = "categories")
    public List<String> getAllCategories() {
        return productRepository.findAllCategories();
    }

    public Page<ProductResponse> getTopSellingProducts(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Product> products = productRepository.findTopSellingProducts(pageable);
        return products.map(this::convertToResponse);
    }

    public Page<ProductResponse> getLatestProducts(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Product> products = productRepository.findLatestProducts(pageable);
        return products.map(this::convertToResponse);
    }

    @CacheEvict(value = {"products", "categories"}, allEntries = true)
    public ProductResponse createProduct(ProductRequest request) {
        Product product = new Product();
        product.setName(request.getName());
        product.setDescription(request.getDescription());
        product.setPrice(request.getPrice());
        product.setCategory(request.getCategory());
        product.setStockQuantity(request.getStockQuantity());
        product.setImageUrl(request.getImageUrl());

        Product savedProduct = productRepository.save(product);
        return convertToResponse(savedProduct);
    }

    @CacheEvict(value = {"product", "products", "categories"}, allEntries = true)
    public ProductResponse updateProduct(String productId, ProductRequest request) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        product.setName(request.getName());
        product.setDescription(request.getDescription());
        product.setPrice(request.getPrice());
        product.setCategory(request.getCategory());
        product.setStockQuantity(request.getStockQuantity());
        product.setImageUrl(request.getImageUrl());

        Product updatedProduct = productRepository.save(product);
        return convertToResponse(updatedProduct);
    }

    @CacheEvict(value = {"product", "products"}, allEntries = true)
    public void deleteProduct(String productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        product.setActive(false);
        productRepository.save(product);
    }

    public boolean updateStock(String productId, Integer quantity) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        
        if (product.getStockQuantity() >= quantity) {
            product.setStockQuantity(product.getStockQuantity() - quantity);
            product.setSalesCount(product.getSalesCount() + quantity);
            productRepository.save(product);
            return true;
        }
        return false;
    }

    public List<ProductResponse> getLowStockProducts(Integer threshold) {
        List<Product> products = productRepository.findByStockQuantityLessThanAndActiveTrue(threshold);
        return products.stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    private ProductResponse convertToResponse(Product product) {
        ProductResponse response = new ProductResponse();
        response.setId(product.getId());
        response.setName(product.getName());
        response.setDescription(product.getDescription());
        response.setPrice(product.getPrice());
        response.setCategory(product.getCategory());
        response.setStockQuantity(product.getStockQuantity());
        response.setImageUrl(product.getImageUrl());
        response.setActive(product.getActive());
        response.setSalesCount(product.getSalesCount());
        response.setRating(product.getRating());
        response.setReviewCount(product.getReviewCount());
        response.setCreatedAt(product.getCreatedAt());
        response.setUpdatedAt(product.getUpdatedAt());
        return response;
    }
}