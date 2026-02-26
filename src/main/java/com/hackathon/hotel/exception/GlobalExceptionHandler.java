package com.hackathon.hotel.exception;

import com.hackathon.hotel.response.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ApiResponse<String>> handleResourceNotFound(ResourceNotFoundException ex) {

        return ResponseEntity.badRequest()
                .body(new ApiResponse<>(ex.getMessage(), null));
    }
}