package com.my_project.dao;

import com.my_project.database.DBConnection;
import com.my_project.model.User;

import java.sql.*;

public class UserDAO {

    public int addUser(User user) {

        String sql = "INSERT INTO users (name, email) VALUES (?, ?)";

        try (Connection connection = DBConnection.getConnection();
             PreparedStatement stmt = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {

            stmt.setString(1, user.getName());
            stmt.setString(2, user.getEmail());

            stmt.executeUpdate();

            ResultSet rs = stmt.getGeneratedKeys();
            if (rs.next()) {
                return rs.getInt(1);   // return generated ID
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return -1;
    }
}