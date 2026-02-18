package console;

import java.util.Scanner;

public class Main {
    public static void main(String[] args){
        ReservationSystem system = new ReservationSystem();
        Scanner scanner = new Scanner(System.in);

        int choice;

        do {
            System.out.println("-----Reservation System-----");
            System.out.println("1. Register User");

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
            }
        } while (choice != 0);

        scanner.close();
    }
}
