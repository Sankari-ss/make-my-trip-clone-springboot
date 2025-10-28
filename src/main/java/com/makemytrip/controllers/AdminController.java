package com.makemytrip.controllers;
import com.makemytrip.repository.FlightRepository;
import com.makemytrip.repository.HotelRepository;
import com.makemytrip.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.*;
import com.makemytrip.models.Users;
import com.makemytrip.models.Flights;
import com.makemytrip.models.Hotels;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins="*")
public class AdminController {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private HotelRepository hotelRepository;

    @Autowired
    private FlightRepository flightRepository;

    @GetMapping("/users")
    public ResponseEntity<List<Users>> getallusers() {
        List<Users> users = userRepository.findAll();
        return ResponseEntity.ok(users);
    }

    @PostMapping("/flight")
    public Flights addFlight(@RequestBody Flights flights) {
        return flightRepository.save(flights);
    }

    @PostMapping("/hotel")
    public Hotels addHotel(@RequestBody Hotels hotels) {
        return hotelRepository.save(hotels);
    }

    @PutMapping("/flight/{id}")
    public ResponseEntity<Flights> editFlight(@PathVariable String id, @RequestBody Flights updatedFlight) {
        Optional<Flights> flightsOptional = flightRepository.findById(id);
        if (flightsOptional.isPresent()) {
            Flights flights = flightsOptional.get();
            flights.setFlightName(updatedFlight.getFlightName());
            flights.setFrom(updatedFlight.getFrom());
            flights.setTo(updatedFlight.getTo());
            flights.setDepartureTime(updatedFlight.getDepartureTime());
            flights.setArrivalTime(updatedFlight.getArrivalTime());
            flights.setAvailableSeats(updatedFlight.getAvailableSeats());
            flights.setPrice(updatedFlight.getPrice());
            flightRepository.save(flights);
            return ResponseEntity.ok(flights);
        }
        return ResponseEntity.notFound().build();
    }


    @PutMapping("/hotel/{id}")
    public ResponseEntity<Hotels> editHotel(@PathVariable String id, @RequestBody Hotels updatedHotel){
        Optional<Hotels> hotelsOptional=hotelRepository.findById(id);
        if(hotelsOptional.isPresent()){
                    Hotels hotels=hotelsOptional.get();
                    hotels.setHotelName(updatedHotel.getHotelName());
                    hotels.setLocation(updatedHotel.getLocation());
                    hotels.setAmenities(updatedHotel.getAmenities());
                    hotels.setAvailableRooms(updatedHotel.getAvailableRooms());
                    hotels.setPricePerNight(updatedHotel.getPricePerNight());
                    hotelRepository.save(hotels);
                    return ResponseEntity.ok(hotels);
                }
        return  ResponseEntity.notFound().build();
    }
    }


