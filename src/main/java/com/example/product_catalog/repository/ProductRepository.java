package com.example.product_catalog.repository;

import com.example.product_catalog.model.Product;
import org.springframework.data.jpa.repository.JpaRepository; // For JPA
//import org.springframework.data.mongodb.repository.MongoRepository; // For MongoDB
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> { // Use MongoRepository for MongoDB

    List<Product> findByNameContainingIgnoreCase(String name); // Example search method
}