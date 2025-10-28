package com.makemytrip.services;
import com.makemytrip.models.Users;
import com.makemytrip.models.Users.Booking;
import com.makemytrip.models.Flights;
import com.makemytrip.models.Hotels;
import com.makemytrip.repository.UserRepository;
import com.makemytrip.repository.FlightRepository;
import com.makemytrip.repository.HotelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Optional;

@Service
public class BookingService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private FlightRepository flightRepository;

    @Autowired
    private HotelRepository hotelRepository;

    public Booking bookFlight(String userId, String flightId, int seats, double price) {
        Optional<Users> usersOptional = userRepository.findById(userId);
        Optional<Flights> flightsOptional = flightRepository.findById(flightId);
        if (usersOptional.isPresent() && flightsOptional.isPresent()) {
            Users user = usersOptional.get();
            Flights flights = flightsOptional.get();
            if (flights.getAvailableSeats() >= seats) {
                flightRepository.save(flights);

                Booking booking = new Booking();
                booking.setType("Flight");
                booking.setBookingId(flightId);
                booking.setDate(LocalDate.now().toString());
                booking.setQuantity(seats);
                booking.setTotalPrice(price);
                user.getBookings().add(booking);
                userRepository.save(user);
                return booking;
            } else {
                throw new RuntimeException("Not enough seats available");
            }
        }
        throw new RuntimeException("User or flight not found");
    }

    public Booking bookHotel(String userId, String hotelId, int rooms, double price) {
        Optional<Users> usersOptional = userRepository.findById(userId);
        Optional<Hotels> hotelsOptional = hotelRepository.findById(hotelId);
        if (usersOptional.isPresent() && hotelsOptional.isPresent()) {
            Users user = usersOptional.get();
            Hotels hotels = hotelsOptional.get();
            if (hotels.getAvailableRooms() >= rooms) {
                hotels.setAvailableRooms(hotels.getAvailableRooms() - rooms);
                hotelRepository.save(hotels);

                Booking booking = new Booking();
                booking.setType("Hotel");
                booking.setBookingId(hotelId);
                booking.setDate(LocalDate.now().toString());
                booking.setQuantity(rooms);
                booking.setTotalPrice(price);
                user.getBookings().add(booking);
                userRepository.save(user);
                return booking;
            } else {
                throw new RuntimeException("Not enough seats available");
            }
        }
        throw new RuntimeException("User or flight not found");
    }
}

