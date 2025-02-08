
package com.example.product_catalog.security;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ApiKeyFilterConfig {

    private final ApiKeyAuthenticationFilter apiKeyAuthenticationFilter;

    public ApiKeyFilterConfig(ApiKeyAuthenticationFilter apiKeyAuthenticationFilter) {
        this.apiKeyAuthenticationFilter = apiKeyAuthenticationFilter;
    }

    @Bean
    public FilterRegistrationBean<ApiKeyAuthenticationFilter> apiKeyFilterRegistrationBean() {
        FilterRegistrationBean<ApiKeyAuthenticationFilter> registrationBean = new FilterRegistrationBean<>();
        registrationBean.setFilter(apiKeyAuthenticationFilter);
        registrationBean.addUrlPatterns("/api/*"); // Apply to all URLs under /api/
        registrationBean.setOrder(1); // Set the order of the filter
        return registrationBean;
    }
}