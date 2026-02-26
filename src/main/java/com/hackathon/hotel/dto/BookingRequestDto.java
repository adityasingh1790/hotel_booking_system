package com.hackathon.hotel.dto;

import java.time.LocalDate;

public class BookingRequestDto {

    private String guestName;
    private LocalDate checkInDate;
    private LocalDate checkOutDate;
    private Long roomId;

    public String getGuestName() {
        return guestName;
    }

    public LocalDate getCheckInDate() {
        return checkInDate;
    }

    public LocalDate getCheckOutDate() {
        return checkOutDate;
    }

    public Long getRoomId() {
        return roomId;
    }
}