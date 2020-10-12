package emt.project.backend.controller;

import emt.project.backend.model.Furniture;
import emt.project.backend.model.dto.FurnitureDto;
import emt.project.backend.service.FurnitureService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/furniture")
public class FurnitureController {
    private final FurnitureService furnitureService;

    public FurnitureController(FurnitureService furnitureService) {
        this.furnitureService = furnitureService;
    }

    @GetMapping
    List<Furniture> getAllFurniture() {
        return furnitureService.getAllFurniture();
    }

    @GetMapping("/{id}")
    Optional<Furniture> getOneFurniture(@PathVariable Long id) {
        return furnitureService.getOneFurniture(id);
    }

    @GetMapping("/category/{categoryId}")
    List<Furniture> getAllByCategory(@PathVariable Long categoryId) {
        return furnitureService.findAllByCategoryId(categoryId);
    }

    @GetMapping("/{manufacturerId}")
    List<Furniture> getAllByManufacturerId(@PathVariable Long manufacturerId) {
        return furnitureService.findAllByManufacturerId(manufacturerId);
    }

    @PostMapping
    Furniture addFurniture(@RequestPart("furnitureDto") @Valid FurnitureDto furnitureDto,
                           @RequestPart("furniturePicture") Optional<MultipartFile> furniturePicture) throws IOException {
        return furnitureService.addFurniture(furnitureDto, furniturePicture.orElse(null));
    }

    @PutMapping("/{id}")
    Furniture editFurniture(@PathVariable Long id, @RequestPart("furnitureDto") @Valid FurnitureDto furnitureDto,
                            @RequestPart("furniturePicture") Optional<MultipartFile> furniturePicture) throws IOException {
        return furnitureService.editFurniture(id, furnitureDto, furniturePicture.orElse(null));
    }

    @DeleteMapping("/{id}")
    void deleteFurniture(@PathVariable Long id) {
        furnitureService.deleteFurniture(id);
    }
}
