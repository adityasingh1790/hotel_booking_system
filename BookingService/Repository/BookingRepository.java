package com.hotelbooking.BookingService.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.hotelbooking.BookingService.Model.Booking;

import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {

    List<Booking> findByUserId(Long userId);
}