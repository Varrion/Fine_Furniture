package emt.project.backend.model.dto;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
public class ManufacturerDto {

    @NotBlank(message = "Name must be provided")
    String name;

    String description;

    String email;

    String city;

    String address;

    String phoneNumber;

    @NotNull(message = "Admin must be provided")
    Long manufacturerAdminId;
}
