package com.my_project.database;

import java.sql.Connection;

public class DBTest {
    public static void main (String [] args){
        Connection connection = DBConnection.getConnection();
        System.out.println(connection != null ? "Connected! ": "Failed");
    }
}
