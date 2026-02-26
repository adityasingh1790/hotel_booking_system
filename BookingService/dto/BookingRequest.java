package com.hotelbooking.BookingService.dto;

	import lombok.Data;
	import java.time.LocalDate;

	@Data
	public class BookingRequest {

	    private Long userId;
	    private Long roomId;
	    private LocalDate checkIn;
	    private LocalDate checkOut;
	}
