package emt.project.backend.service;

import emt.project.backend.model.User;
import emt.project.backend.model.dto.LoginDto;
import emt.project.backend.model.dto.UserDto;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

public interface UserService extends UserDetailsService {

    List<User> getAllUsers();

    Optional<User> getOneUser(Long id);

    void deleteUser(Long id);

    Optional<User> loginUser(LoginDto loginDto);

    User addUser(UserDto userDto, MultipartFile userPicture) throws IOException;

    User editUser(Long id, UserDto userDto, MultipartFile userPicture) throws IOException;
}
