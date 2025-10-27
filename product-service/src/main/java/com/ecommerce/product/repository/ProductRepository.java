package com.ecommerce.product.repository;

import com.ecommerce.product.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, String> {
    
    Page<Product> findByActiveTrue(Pageable pageable);
    
    Page<Product> findByActiveTrueAndCategory(String category, Pageable pageable);
    
    @Query("SELECT p FROM Product p WHERE p.active = true AND " +
           "(LOWER(p.name) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(p.description) LIKE LOWER(CONCAT('%', :keyword, '%')))")
    Page<Product> searchProducts(@Param("keyword") String keyword, Pageable pageable);
    
    @Query("SELECT p FROM Product p WHERE p.active = true AND p.price BETWEEN :minPrice AND :maxPrice")
    Page<Product> findByPriceRange(@Param("minPrice") BigDecimal minPrice, 
                                   @Param("maxPrice") BigDecimal maxPrice, 
                                   Pageable pageable);
    
    @Query("SELECT DISTINCT p.category FROM Product p WHERE p.active = true ORDER BY p.category")
    List<String> findAllCategories();
    
    @Query("SELECT p FROM Product p WHERE p.active = true ORDER BY p.salesCount DESC")
    Page<Product> findTopSellingProducts(Pageable pageable);
    
    @Query("SELECT p FROM Product p WHERE p.active = true AND p.stockQuantity > 0 ORDER BY p.createdAt DESC")
    Page<Product> findLatestProducts(Pageable pageable);
    
    List<Product> findByStockQuantityLessThanAndActiveTrue(Integer threshold);
}