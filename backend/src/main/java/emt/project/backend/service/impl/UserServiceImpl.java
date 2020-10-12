package emt.project.backend.service.impl;

import emt.project.backend.model.User;
import emt.project.backend.model.dto.LoginDto;
import emt.project.backend.model.dto.UserDto;
import emt.project.backend.repository.UserRepository;
import emt.project.backend.service.UserService;
import org.apache.tomcat.util.http.fileupload.FileUploadException;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
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
    public User addUser(UserDto userDto, MultipartFile userPicture) throws IOException {
        User user = new User();

        if (userPicture != null) {
            user.setPicture(userPicture.getBytes());
        }

        user.setUsername(userDto.getUsername());
        user.setPassword(userDto.getPassword());

        user.setName(userDto.getName());
        user.setSurname(userDto.getSurname());

        user.setEmail(userDto.getEmail());
        user.setPhoneNumber(userDto.getPhoneNumber());
        user.setCity(userDto.getCity());
        user.setAddress(userDto.getAddress());

        user.setIsManufacturer(userDto.getIsManufacturer());

        return userRepository.save(user);
    }

    @Override
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    @Override
    public Optional<User> loginUser(LoginDto loginDto) {
        return userRepository.getByUsernameAndPassword(loginDto.getUsername(), loginDto.getPassword());
    }

    @Override
    public User editUser(Long id, UserDto userDto, MultipartFile userPicture) throws IOException {
        Optional<User> optionalUser = getOneUser(id);

        if (optionalUser.isPresent()) {

            User editedUser = optionalUser.get();

            if (userPicture != null) {
                editedUser.setPicture(userPicture.getBytes());
            }

            editedUser.setName(userDto.getName());
            editedUser.setSurname(userDto.getSurname());

            editedUser.setEmail(userDto.getEmail());
            editedUser.setPassword(userDto.getPassword());

            editedUser.setAddress(userDto.getAddress());
            editedUser.setCity(userDto.getCity());
            editedUser.setPhoneNumber(userDto.getPhoneNumber());

            return userRepository.save(editedUser);
        }

        throw new ResponseStatusException(HttpStatus.NOT_FOUND);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> optionalCustomer = userRepository.getByUsername(username);
        optionalCustomer.orElseThrow(() -> new UsernameNotFoundException("Requested user cannot be found"));

        return optionalCustomer.get();
    }
}
