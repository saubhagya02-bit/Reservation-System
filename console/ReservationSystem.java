package console;

import java.util.ArrayList;

public class ReservationSystem {
    private ArrayList<User> users = new ArrayList<>();
    private ArrayList<Room> rooms = new ArrayList<>();

    private int userCounter = 1;

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
}
