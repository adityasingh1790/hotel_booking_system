package com.hackathon.hotel.repository;

import com.hackathon.hotel.entity.Hotel;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
public interface HotelRepository extends JpaRepository<Hotel, Long> {
	List<Hotel> findByLocationContainingIgnoreCase(String location);
}