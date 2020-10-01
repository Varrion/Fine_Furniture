package emt.project.backend.service.impl;

import emt.project.backend.model.User;
import emt.project.backend.repository.UserRepository;
import emt.project.backend.service.UserService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public Optional<User> getOneUser(Long id) {
        return userRepository.findById(id);
    }

    @Override
    public User addUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public User editUser(User user) {

        Optional<User> account = getOneUser(user.getId());

        if(account.isPresent()){
            User editedUser = account.get();

            editedUser.setId(user.getId());
            editedUser.setName(user.getName());
            editedUser.setSurname(user.getSurname());
            editedUser.setUsername(user.getUsername());
            editedUser.setPassword(user.getPassword());
            editedUser.setEmail(user.getEmail());
            editedUser.setPicture(user.getPicture());
            editedUser.setCity(user.getCity());
            editedUser.setStreet(user.getStreet());
            editedUser.setStreetNumber(user.getStreetNumber());
            editedUser.setPhoneNumber(user.getPhoneNumber());

            return userRepository.save(editedUser);
        }
        return null;
    }

    @Override
    public void deleteUser(Long id) {
        userRepository.deleteById(id);

    }
}
