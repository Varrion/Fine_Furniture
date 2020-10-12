package emt.project.backend.model.dto;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
public class FurnitureDto {

    @NotBlank(message = "Furniture name must be provided")
    String name;

    String description;

    @NotNull(message = "category must be provided")
    Long categoryId;

    @NotNull(message = "Price must be set")
    Long price;

    @NotBlank(message = "Type must be provided")
    String furnitureType;

    @NotNull(message = "At least one color must be given")
    String[] furnitureColors;
}
