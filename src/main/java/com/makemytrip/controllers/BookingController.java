package com.makemytrip.controllers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.makemytrip.models.Users;
import com.makemytrip.services.BookingService;

@RestController
@RequestMapping("/booking")
public class BookingController {
    @Autowired
    private BookingService bookingService;

    @PostMapping("/flight")
    public Users.Booking bookFlight(@RequestParam String userId,@RequestParam String flightId, @RequestParam int seats, @RequestParam double price ){
        return bookingService.bookFlight(userId,flightId,seats,price);
    }
    @PostMapping("/hotel")
    public Users.Booking bookHotel(@RequestParam String userId, @RequestParam String  hotelId, @RequestParam int rooms, @RequestParam double price ){
        return bookingService.bookHotel(userId,hotelId,rooms,price);
    }
}
