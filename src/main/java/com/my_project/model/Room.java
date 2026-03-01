package com.my_project.model;

import jakarta.persistence.*;

@Entity
@Table(name = "rooms")
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private Integer number;
    private String name;
    private int capacity;

    public Room() {}

    public Room(String name, int capacity, Integer number) {
        this.name = name;
        this.capacity = capacity;
        this.number = number;
    }

    public Integer getId() { return id; }
    public String getName() { return name; }
    public int getCapacity() { return capacity; }
    public Integer getNumber() { return number; }

    public void setName(String name) { this.name = name; }
    public void setCapacity(int capacity) { this.capacity = capacity; }
    public void setNumber(Integer number) { this.number = number; }
}