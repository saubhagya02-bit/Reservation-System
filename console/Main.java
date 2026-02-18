package console;

import java.util.Scanner;

public class Main {
    public static void main(String[] args){
        ReservationSystem system = new ReservationSystem();
        Scanner scanner = new Scanner(System.in);

        system.addRoom(1, "Conference Room", 10);
        system.addRoom(2, "Meeting Room", 5);
        system.addRoom(3, "Bed Room", 50);

        int choice;

        do {
            System.out.println("-----Reservation System-----");
            System.out.println("1. Register User");
            System.out.println("2. View Rooms");

            choice = scanner.nextInt();
            scanner.nextLine();

            switch (choice) {
                case 1:
                    System.out.println("Enter name: ");
                    String name = scanner.nextLine();
                    System.out.println("Enter email address: ");
                    String email = scanner.nextLine();
                    system.addUser(name, email);
                    break;

                case 2:
                    system.viewRooms();
                    break;
            }
        } while (choice != 0);

        scanner.close();
    }
}
