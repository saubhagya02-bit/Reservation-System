package console;

import java.util.ArrayList;

public class ReservationSystem {
    private ArrayList<User> users = new ArrayList<>();

    private int userCounter = 1;

    //Add User
    public void addUser(String name, String email){
        User user = new User(userCounter++, name, email);
        users.add(user);
        System.out.println("User Registered Successfully!");
    }
}
