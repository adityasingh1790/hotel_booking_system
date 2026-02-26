package com.hackathon.hotel.service;

import com.hackathon.hotel.entity.Hotel;
import com.hackathon.hotel.repository.HotelRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HotelService {

    private final HotelRepository hotelRepository;

    public HotelService(HotelRepository hotelRepository) {
        this.hotelRepository = hotelRepository;
    }

    // Create Hotel
    public Hotel createHotel(Hotel hotel) {
        return hotelRepository.save(hotel);
    }

    // Get All Hotels
    public List<Hotel> getAllHotels() {
        return hotelRepository.findAll();
    }

    // Get Hotel By ID
    public Hotel getHotelById(Long id) {
        return hotelRepository.findById(id).orElse(null);
    }

    // Delete Hotel
    public void deleteHotel(Long id) {
        hotelRepository.deleteById(id);
    }
}