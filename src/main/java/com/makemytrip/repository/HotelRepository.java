package com.makemytrip.repository;
import com.makemytrip.models.Hotels;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface HotelRepository extends MongoRepository<Hotels,String> {
}
