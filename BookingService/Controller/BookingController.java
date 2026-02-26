package com.hotelbooking.BookingService.Controller;



import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import com.hotelbooking.BookingService.dto.BookingRequest;
import com.hotelbooking.BookingService.Model.Booking;
import com.hotelbooking.BookingService.Service.BookingService;

@RestController
@RequestMapping("/bookings")
@RequiredArgsConstructor
public class BookingController {

    private final BookingService bookingService;

    // CREATE BOOKING
    @PostMapping
    public Booking createBooking(@RequestBody BookingRequest request) {
        return bookingService.createBooking(request);
    }

    // GET BOOKINGS OF USER
    @GetMapping("/user/{userId}")
    public List<Booking> getBookings(@PathVariable Long userId) {
        return bookingService.getUserBookings(userId);
    }

    // CANCEL BOOKING
    @DeleteMapping("/{id}")
    public String cancelBooking(@PathVariable Long id) {
        return bookingService.cancelBooking(id);
    }
}