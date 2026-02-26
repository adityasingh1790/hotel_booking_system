package com.hackathon.hotel.service;

import com.hackathon.hotel.entity.Room;
import com.hackathon.hotel.exception.ResourceNotFoundException;
import com.hackathon.hotel.repository.RoomRepository;
import org.springframework.stereotype.Service;
import com.hackathon.hotel.dto.RoomRequestDto;
import com.hackathon.hotel.entity.Hotel;
import com.hackathon.hotel.repository.HotelRepository;
import java.util.List;

@Service
public class RoomService {

    private final RoomRepository roomRepository;

    private final HotelRepository hotelRepository;

    public RoomService(RoomRepository roomRepository,
                       HotelRepository hotelRepository) {
        this.roomRepository = roomRepository;
        this.hotelRepository = hotelRepository;
    }
    
    public List<Room> getAvailableRooms() {
        return roomRepository.findByAvailableTrue();
    }

    // Create Room
    public Room createRoom(RoomRequestDto dto) {

        Hotel hotel = hotelRepository.findById(dto.getHotelId())
        		.orElseThrow(() -> new ResourceNotFoundException("Hotel not found"));

        Room room = new Room();
        room.setRoomType(dto.getRoomType());
        room.setPrice(dto.getPrice());
        room.setAvailable(dto.isAvailable());
        room.setHotel(hotel);

        return roomRepository.save(room);
    }

    // Get All Rooms
    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }

    // Delete Room
    public void deleteRoom(Long id) {
        roomRepository.deleteById(id);
    }
    
    public List<Room> getRoomsByHotel(Long hotelId) {
        return roomRepository.findByHotel_Id(hotelId);
    }
    
    public Room updateAvailability(Long roomId, boolean available) {

        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new ResourceNotFoundException("Room not found"));

        room.setAvailable(available);

        return roomRepository.save(room);
    }
}