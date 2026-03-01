package com.my_project.console;

import com.my_project.service.ReservationService;

import java.util.Scanner;

public class Main {

    public static void main(String[] args) {

        ReservationService service = new ReservationService();
        Scanner scanner = new Scanner(System.in);

        System.out.println("Enter name:");
        String name = scanner.nextLine();

        System.out.println("Enter email:");
        String email = scanner.nextLine();

        service.registerUser(name, email);

        scanner.close();
    }
}