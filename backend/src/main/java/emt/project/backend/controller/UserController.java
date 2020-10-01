package emt.project.backend.controller;

import emt.project.backend.model.User;
import emt.project.backend.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/user")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    List<User> getAllUsers(){
        return userService.getAllUsers();
    }

    @GetMapping("/{id}")
    Optional<User> getOneUser(@PathVariable Long id){
        return userService.getOneUser(id);
    }

    @PostMapping
    User addUser(@RequestBody User user){
        return userService.addUser(user);
    }

    @PutMapping("/{id}")
    User editUser(@PathVariable Long id, @RequestBody User user){
        return userService.editUser(user);
    }

    @DeleteMapping("/{id}")
    void deleteUser(@PathVariable Long id){
       userService.deleteUser(id);
    }
}
