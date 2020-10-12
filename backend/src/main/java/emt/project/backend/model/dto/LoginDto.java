package emt.project.backend.model.dto;

import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class LoginDto {

    @NotBlank(message = " Username must be provided")
    String username;

    @NotBlank(message = " password must be provided")
    String password;
}
