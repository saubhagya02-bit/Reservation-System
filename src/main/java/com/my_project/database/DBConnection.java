package com.my_project.database;

import java.sql.Connection;
import java.sql.DriverManager;
import java.util.Properties;

public class DBConnection {

    public static Connection getConnection() {
        try {
            Properties properties = new Properties();
            properties.load(DBConnection.class.getClassLoader().getResourceAsStream("db.properties"));

            String url = properties.getProperty("db.url");
            String user = properties.getProperty("db.username");
            String password = properties.getProperty("db.password");

            return DriverManager.getConnection(url, user, password);
        } catch (Exception e) {
            throw new RuntimeException("Database connection failed: "+ e.getMessage());
        }
    }
}
