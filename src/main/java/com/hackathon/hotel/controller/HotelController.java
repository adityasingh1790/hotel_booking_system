package com.hackathon.hotel.controller;

import com.hackathon.hotel.entity.Hotel;
import com.hackathon.hotel.service.HotelService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import org.springframework.http.ResponseEntity;
import com.hackathon.hotel.response.ApiResponse;
@RestController
@RequestMapping("/api/hotels")
@CrossOrigin("*")
public class HotelController {

    private final HotelService hotelService;

    public HotelController(HotelService hotelService) {
        this.hotelService = hotelService;
    }

    // Create Hotel
    @PostMapping
    public Hotel createHotel(@RequestBody Hotel hotel) {
        return hotelService.createHotel(hotel);
    }

    // Get All Hotels
    @GetMapping
    public List<Hotel> getAllHotels() {
        return hotelService.getAllHotels();
    }

    // Get Hotel By ID
    @GetMapping("/{id}")
    public Hotel getHotelById(@PathVariable Long id) {
        return hotelService.getHotelById(id);
    }

    // Delete Hotel by Id
    @DeleteMapping("/{id}")
    public void deleteHotel(@PathVariable Long id) {
        hotelService.deleteHotel(id);
    }
    
    @GetMapping("/search")
    public ResponseEntity<ApiResponse<List<Hotel>>> searchHotelByLocation(
            @RequestParam String location){

        return ResponseEntity.ok(
                new ApiResponse<>(
                        "Hotels fetched by location",
                        hotelService.searchByLocation(location)
                )
        );
    }
}