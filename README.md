# Product Catalog Microservice

A Spring Boot-based microservice for managing a product catalog.

## Description

This microservice provides a REST API for creating, retrieving, updating, and deleting product information. It includes features such as:

*   CRUD operations for products
*   Search functionality
*   Error handling
*   Data validation
*   Basic API key authentication

## Technologies Used

*   Java
*   Spring Boot
*   Spring Data JPA (or MongoDB)
*   H2 Database (or MySQL/PostgreSQL/MongoDB)
*   REST APIs
*   Lombok
*   Docker

## Getting Started

1.  Clone the repository:

    ```bash
    git clone <repository_url>
    ```

2.  Build the project:

    ```bash
    mvn clean install
    ```

3.  Run the application:

    ```bash
    java -jar target/product-catalog-0.0.1-SNAPSHOT.jar
    ```

## API Endpoints

*   `GET /api/products`: Get all products
*   `GET /api/products/{id}`: Get a product by ID
*   `POST /api/products`: Create a new product
*   `PUT /api/products/{id}`: Update an existing product
*   `DELETE /api/products/{id}`: Delete a product
*   `GET /api/products/search?name=keyword`: Search for products by name

## Contributing


## License

