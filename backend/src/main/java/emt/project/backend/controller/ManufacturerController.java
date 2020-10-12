package emt.project.backend.controller;

import emt.project.backend.model.Manufacturer;
import emt.project.backend.model.dto.ManufacturerDto;
import emt.project.backend.service.ManufacturerService;
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
@RequestMapping("/api/manufacturer")
public class ManufacturerController {
    private final ManufacturerService manufacturerService;

    public ManufacturerController(ManufacturerService manufacturerService) {
        this.manufacturerService = manufacturerService;
    }

    @GetMapping
    List<Manufacturer> getAllManufacturers() {
        return manufacturerService.getAllManufacturers();
    }

    @GetMapping("/{id}")
    Optional<Manufacturer> getOneManufacturer(@PathVariable Long id) {
        return manufacturerService.getOneManufacturers(id);
    }

    @PostMapping
    Manufacturer addManufacturer(@RequestPart("manufacturerDto") @Valid ManufacturerDto manufacturerDto,
                                 @RequestPart("manufacturerPicture") Optional<MultipartFile> manufacturerPicture) throws IOException {
        return manufacturerService.addManufacturer(manufacturerDto, manufacturerPicture.orElse(null));
    }

    @PutMapping("/{id}")
    Manufacturer editManufacturer(@PathVariable Long id, @RequestPart("manufacturerDto") @Valid ManufacturerDto manufacturerDto,
                                  @RequestPart("manufacturerPicture") Optional<MultipartFile> manufacturerPicture) throws IOException {
        return manufacturerService.editManufacturer(manufacturerDto, manufacturerPicture.orElse(null), id);
    }

    @GetMapping("/my-shop/{manufacturerId}")
    Manufacturer myShop(@PathVariable Long manufacturerId) {
        return manufacturerService.getManufacturerByAdmin(manufacturerId).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Provided manufacturer is not found"));
    }

    @DeleteMapping("/{id}")
    void deleteManufacturers(@PathVariable Long id) {
        manufacturerService.deleteManufacturer(id);
    }
}
