package com.hotelbooking.BookingService.Model;



	import jakarta.persistence.*;
	import lombok.Data;

	import java.time.LocalDate;

	@Entity
	@Table(name = "bookings")
	@Data
	public class Booking {

	    @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;

	    private Long userId;

	    private Long roomId;

	    private LocalDate checkIn;

	    private LocalDate checkOut;

	    private String status = "CONFIRMED";
	
}
