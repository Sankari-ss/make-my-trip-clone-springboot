package com.makemytrip.controllers;
import com.makemytrip.models.Flights;
import com.makemytrip.models.Hotels;
import com.makemytrip.models.Users;
import com.makemytrip.repository.FlightRepository;
import com.makemytrip.repository.HotelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class RootController{

    @Autowired
    private HotelRepository hotelRepository;

    @Autowired
    private FlightRepository flightRepository;

    @GetMapping("/")
    public String home() { return " Its running on port 8080!";}


    @GetMapping("/hotel")
    public ResponseEntity<List<Hotels>> getallusers(){
        List<Hotels> hotels=hotelRepository.findAll();
        return ResponseEntity.ok(hotels);
    }
    @GetMapping("/flight")
    public ResponseEntity<List<Flights>> getallflights(){
        List<Flights> flights=flightRepository.findAll();
        return ResponseEntity.ok(flights);
    }

}