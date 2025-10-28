package com.makemytrip.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Document(collection = "users")
public class Users {
    @Id
    private String id;
    private String firstName;
    private String lastName;
    private String email;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    private String role;
    private String phoneNumber;
    private List<Booking> bookings = new ArrayList<>();

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getFirstName() {return firstName;}
    public void setFirstName(String firstName) {this.firstName = firstName;}
    public String getLastName() {return lastName;}
    public void setLastName(String lastName) {this.lastName = lastName;}
    public String getPhoneNumber() {return phoneNumber;}
    public void setPhoneNumber(String phoneNumber) {this.phoneNumber = phoneNumber;}
    public String getPassword() {return password;}
    public void setPassword(String password) {this.password = password;}
    public String getEmail() {return email;}
    public void setEmail(String email) {this.email = email;}
    public String getRole() {return role;}
    public void setRole(String role) {this.role = role;}
    public List<Booking> getBookings() { return bookings; }
    public void setBookings(List<Booking> bookings) { this.bookings = bookings; }


    public static class Booking{
        private String type;
        private String bookingId;
        private String date;
        private int quantity;
        private double totalPrice;

        public String getType() {return type;}
        public void setType(String type) {this.type = type;}
        public String getBookingId() {return bookingId;}
        public void setBookingId(String bookingId) {this.bookingId = bookingId;}
        public String getDate() {return date;}
        public void setDate(String date) {this.date = date;}
        public int getQuantity() {return quantity;}
        public void setQuantity(int quantity) {this.quantity = quantity;}
        public double getTotalPrice() {return totalPrice;}
        public void setTotalPrice(double totalPrice) {this.totalPrice = totalPrice;}
    }
}