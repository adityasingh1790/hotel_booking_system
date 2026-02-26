package com.hackathon.hotel.service;

import com.hackathon.hotel.dto.BookingRequestDto;
import com.hackathon.hotel.entity.Booking;
import com.hackathon.hotel.entity.Room;
import com.hackathon.hotel.exception.ResourceNotFoundException;
import com.hackathon.hotel.repository.BookingRepository;
import com.hackathon.hotel.repository.RoomRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;
    private final RoomRepository roomRepository;

    public BookingService(BookingRepository bookingRepository,
                          RoomRepository roomRepository) {
        this.bookingRepository = bookingRepository;
        this.roomRepository = roomRepository;
    }

    public Booking bookRoom(BookingRequestDto dto) {

        Room room = roomRepository.findById(dto.getRoomId())
                .orElseThrow(() -> new ResourceNotFoundException("Room not found"));

        if (!room.isAvailable()) {
            throw new RuntimeException("Room is not available");
        }

        Booking booking = new Booking();
        booking.setGuestName(dto.getGuestName());
        booking.setCheckInDate(dto.getCheckInDate());
        booking.setCheckOutDate(dto.getCheckOutDate());
        booking.setRoom(room);

        room.setAvailable(false);
        roomRepository.save(room);

        return bookingRepository.save(booking);
    }

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    public void cancelBooking(Long id) {

        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found"));

        Room room = booking.getRoom();
        room.setAvailable(true);
        roomRepository.save(room);

        bookingRepository.deleteById(id);
    }
}