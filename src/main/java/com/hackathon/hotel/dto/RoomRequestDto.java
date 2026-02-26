package com.hackathon.hotel.dto;

import lombok.Data;

@Data
public class RoomRequestDto {

    private String roomType;
    private double price;
    private boolean available;
    private Long hotelId;
}