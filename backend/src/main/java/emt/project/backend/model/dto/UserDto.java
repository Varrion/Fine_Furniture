package emt.project.backend.model.dto;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
public class UserDto {

    @NotBlank(message = " Username must be provided")
    String username;

    @NotBlank(message = " password must be provided")
    String password;

    @NotBlank(message = " Name must be provided")
    String name;

    @NotBlank(message = " Surname must be provided")
    String surname;

    @NotBlank(message = " Email must be provided")
    String email;

    String phoneNumber;

    String city;

    String address;

    @NotNull(message = "Role must be provided")
    Boolean isManufacturer;
}
