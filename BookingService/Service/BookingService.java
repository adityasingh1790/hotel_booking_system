package com.hotelbooking.BookingService.Service;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

import com.hotelbooking.BookingService.dto.BookingRequest;
import com.hotelbooking.BookingService.Model.Booking;
import com.hotelbooking.BookingService.Repository.BookingRepository;

@Service
@RequiredArgsConstructor
public class BookingService {

    private final BookingRepository bookingRepository;

    // CREATE BOOKING
    public Booking createBooking(BookingRequest request) {

        Booking booking = new Booking();

        booking.setUserId(request.getUserId());
        booking.setRoomId(request.getRoomId());
        booking.setCheckIn(request.getCheckIn());
        booking.setCheckOut(request.getCheckOut());

        return bookingRepository.save(booking);
    }

    // GET BOOKINGS BY USER
    public List<Booking> getUserBookings(Long userId) {
        return bookingRepository.findByUserId(userId);
    }

    // CANCEL BOOKING
    public String cancelBooking(Long id) {
        bookingRepository.deleteById(id);
        return "Booking Cancelled Successfully";
    }
}