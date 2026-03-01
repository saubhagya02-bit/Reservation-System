package com.my_project.dto;

import java.time.LocalDate;

public class ReservationDTO {
    private Integer userId;
    private Integer roomId;
    private LocalDate date;
    private String timeSlot;
    private Double amount;

    public Integer getUserId() { return userId; }
    public void setUserId(Integer userId) { this.userId = userId; }

    public Integer getRoomId() { return roomId; }
    public void setRoomId(Integer roomId) { this.roomId = roomId; }

    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }

    public String getTimeSlot() { return timeSlot; }
    public void setTimeSlot(String timeSlot) { this.timeSlot = timeSlot; }

    public Double getAmount() { return amount; }
    public void setAmount(Double amount) { this.amount = amount; }
}