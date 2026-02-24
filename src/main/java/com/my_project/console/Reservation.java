package com.my_project.console;

public class Reservation {
    private int reservationId;
    private User user;
    private Room room;
    private String date;
    private String timeSlot;

    public Reservation(int reservationId, User user, Room room, String date, String timeSlot) {
        this.reservationId = reservationId;
        this.user = user;
        this.room = room;
        this.date = date;
        this.timeSlot = timeSlot;
    }

    public int getReservationId(){
        return reservationId;
    }
    public User getUser(){
        return user;
    }
    public Room getRoom(){
        return room;
    }
    public String getDate(){
        return date;
    }
    public String getTimeSlot(){
        return timeSlot;
    }

    public String toString(){
        return "Reservation ID: "+ reservationId +
                ", User: "+ user +
                ", Room: "+ room.getRoomName() +
                ", Date: "+ date +
                ", Time: "+ timeSlot;
    }
}
