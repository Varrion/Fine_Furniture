package emt.project.backend.service;

import emt.project.backend.model.User;

import java.util.List;
import java.util.Optional;

public interface UserService {

    List<User> getAllUsers();

    Optional<User> getOneUser(Long id);

    User addUser(User user);

    User editUser(User user);

    void deleteUser(Long id);
}
