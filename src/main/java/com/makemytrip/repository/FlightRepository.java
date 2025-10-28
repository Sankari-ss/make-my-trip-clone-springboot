package com.makemytrip.repository;
import com.makemytrip.models.Flights;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface FlightRepository extends MongoRepository<Flights,String> {
}
