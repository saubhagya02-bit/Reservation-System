package com.my_project.console;

import java.util.ArrayList;

public class ReservationSystem {
    private ArrayList<User> users = new ArrayList<>();
    private ArrayList<Room> rooms = new ArrayList<>();
    private ArrayList<Reservation> reservations = new ArrayList<>();

    private int userCounter = 1;
    private int reservationCounter = 1;

    //Add User
    public void addUser(String name, String email){
        User user = new User(userCounter++, name, email);
        users.add(user);
        System.out.println("User Registered Successfully!");
    }

    //Add Room
    public void addRoom(int id, String name, int capacity){
        rooms.add(new Room(id, name, capacity));
    }

    //View Rooms
    public void viewRooms(){
        for (Room room : rooms) {
            System.out.println(room);
        }
    }

    //Find User
    private User findUser(int userId) {
        for (User user : users)
            if (user.getId() == userId)
                return user;
        return null;
    }

    //Find Room
    private Room findRoom(int roomId) {
        for (Room room : rooms)
            if (room.getRoomId() == roomId)
                return room;
        return null;
    }

    //Check availability
    public boolean checkAvailability(int roomId, String date, String timeSlot) {
        for (Reservation reservation : reservations) {
            if (reservation.getRoom().getRoomId() == roomId &&
                    reservation.getDate().equals(date) &&
                    reservation.getTimeSlot().equals(timeSlot)) {
                return false;
            }
        }
        return true;
    }

    //Book Room
    public void bookRoom(int userId, int roomId, String date, String timeSlot) {
        User user = findUser(userId);
        Room room = findRoom(roomId);

        if (user == null || room == null) {
            System.out.println("Invalid user or room ID!");
            return;
        }
        if (!checkAvailability(roomId, date, timeSlot)) {
            System.out.println("Room already booked for this time!");
            return;
        }

        Reservation reservation = new Reservation(reservationCounter++, user, room, date, timeSlot);
        reservations.add(reservation);

        System.out.println("Booking Successful!");
        System.out.println(reservation);
    }

    //Cancel Reservation
    public void cancelReservation(int reservationId) {
        for (Reservation reservation : reservations) {
            if (reservation.getReservationId() == reservationId) {
                reservations.remove(reservation);
                System.out.println("Reservation Cancelled!");
                return;
            }
        }
        System.out.println("Reservation not found!");
    }

    //View User Reservation
    public void viewUserReservation(int useId) {
        for (Reservation reservation : reservations) {
            if (reservation.getUser().getId() == useId) {
                System.out.println(reservation);
            }
        }
    }
}
