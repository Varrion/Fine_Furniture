package emt.project.backend.controller;

import emt.project.backend.model.User;
import emt.project.backend.model.dto.LoginDto;
import emt.project.backend.model.dto.UserDto;
import emt.project.backend.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(value = "api/user")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{username}")
    User getUserByUsername(@PathVariable String username) {
        return (User) userService.loadUserByUsername(username);
    }

    @PostMapping
    User registerUser(@RequestPart("userDto") @Valid UserDto userDto,
                      @RequestPart("userPicture") Optional<MultipartFile> userPicture) throws IOException {
        return userService.addUser(userDto, userPicture.orElse(null));
    }

    @PostMapping("login")
    User loginUser(@RequestBody @Valid LoginDto loginDto) throws ResponseStatusException {
        return userService.loginUser(loginDto).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Provided user is not found"));
    }

    @PutMapping("/{id}")
    User editUser(@PathVariable Long id, @RequestPart("userDto") @Valid UserDto userDto,
                  @RequestPart("userPicture") Optional<MultipartFile> userPicture) throws IOException {
        return userService.editUser(id, userDto, userPicture.orElse(null));
    }

    @DeleteMapping("/{id}")
    void deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
    }
}
