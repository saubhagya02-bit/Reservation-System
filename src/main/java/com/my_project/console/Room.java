package com.my_project.console;

public class Room {
    private int roomId;
    private String roomName;
    private int capacity;

    public Room(int roomId, String roomName, int capacity) {
        this.roomId = roomId;
        this.roomName = roomName;
        this.capacity = capacity;
    }

    public int getRoomId(){
        return roomId;
    }
    public String getRoomName(){
        return roomName;
    }
    public int getCapacity(){
        return capacity;
    }

    public String toString(){
        return "Room ID: "+ roomId + ", Name: "+ roomName + ", Capacity: "+ capacity;
    }
}
