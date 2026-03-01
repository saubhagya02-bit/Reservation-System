package com.my_project.model;

import jakarta.persistence.*;

@Entity
@Table(name = "payments")
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    private Reservation reservation;

    private Double amount;
    private String status; // PAID / FAILED

    public Payment() {}

    public Payment(Reservation reservation, Double amount, String status) {
        this.reservation = reservation;
        this.amount = amount;
        this.status = status;
    }

    public Integer getId() { return id; }
    public Reservation getReservation() { return reservation; }
    public Double getAmount() { return amount; }
    public String getStatus() { return status; }

    public void setReservation(Reservation reservation) { this.reservation = reservation; }
    public void setAmount(Double amount) { this.amount = amount; }
    public void setStatus(String status) { this.status = status; }
}