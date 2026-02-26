package com.hackathon.hotel.controller;

import com.hackathon.hotel.dto.BookingRequestDto;
import com.hackathon.hotel.entity.Booking;
import com.hackathon.hotel.response.ApiResponse;
import com.hackathon.hotel.service.BookingService;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin("*")
public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Booking>> bookRoom(@RequestBody BookingRequestDto dto) {

        return ResponseEntity.ok(
                new ApiResponse<>("Room Booked Successfully",
                        bookingService.bookRoom(dto))
        );
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<Booking>>> getAllBookings() {

        return ResponseEntity.ok(
                new ApiResponse<>("All bookings fetched",
                        bookingService.getAllBookings())
        );
    }

    @DeleteMapping("/{id}")
    public void cancelBooking(@PathVariable Long id) {
        bookingService.cancelBooking(id);
    }
}