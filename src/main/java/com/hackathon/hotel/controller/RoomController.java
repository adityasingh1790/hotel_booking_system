package com.hackathon.hotel.controller;

import com.hackathon.hotel.entity.Room;
import com.hackathon.hotel.service.RoomService;
import com.hackathon.hotel.dto.RoomRequestDto;
import com.hackathon.hotel.response.ApiResponse;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.List;

@RestController
@RequestMapping("/api/rooms")
@CrossOrigin("*")
public class RoomController {

    private final RoomService roomService;

    public RoomController(RoomService roomService) {
        this.roomService = roomService;
    }

    // Create Room
    @PostMapping
    public ResponseEntity<ApiResponse<Room>> createRoom(@RequestBody RoomRequestDto dto) {
        
        Room room = roomService.createRoom(dto);

        return ResponseEntity.ok(
                new ApiResponse<>("Room Created Successfully", room)
        );
    }

    // Get All Rooms
    @GetMapping
    public ResponseEntity<ApiResponse<List<Room>>> getAllRooms() {

        List<Room> rooms = roomService.getAllRooms();

        return ResponseEntity.ok(
                new ApiResponse<>("Rooms Fetched Successfully", rooms)
        );
    }
    @GetMapping("/hotel/{hotelId}")
    public ResponseEntity<ApiResponse<List<Room>>> getRoomsByHotel(@PathVariable Long hotelId) {

        List<Room> rooms = roomService.getRoomsByHotel(hotelId);

        return ResponseEntity.ok(
                new ApiResponse<>("Rooms fetched by Hotel", rooms)
        );
    }
    // Delete Room
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<String>> deleteRoom(@PathVariable Long id) {

        roomService.deleteRoom(id);

        return ResponseEntity.ok(
                new ApiResponse<>("Room Deleted Successfully", null)
        );
    }
    
    @GetMapping("/available")
    public ResponseEntity<ApiResponse<List<Room>>> getAvailableRooms() {

        List<Room> rooms = roomService.getAvailableRooms();

        return ResponseEntity.ok(
                new ApiResponse<>("Available Rooms Fetched", rooms)
        );
    }
    
    @PutMapping("/{roomId}/availability")
    public ResponseEntity<ApiResponse<Room>> updateRoomAvailability(
            @PathVariable Long roomId,
            @RequestParam boolean available) {

        Room updatedRoom = roomService.updateAvailability(roomId, available);

        return ResponseEntity.ok(
                new ApiResponse<>("Room Availability Updated", updatedRoom)
        );
    }
}