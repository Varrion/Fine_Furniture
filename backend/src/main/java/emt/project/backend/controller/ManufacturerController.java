package emt.project.backend.controller;

import emt.project.backend.model.Manufacturer;
import emt.project.backend.service.ManufacteurerService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/manufacturer")
public class ManufacturerController {
    private final ManufacteurerService manufacteurerService;

    public ManufacturerController(ManufacteurerService manufacteurerService) {
        this.manufacteurerService = manufacteurerService;
    }

    @GetMapping
    List<Manufacturer> getAllManufacturers(){
        return manufacteurerService.getAllManufacteurers();
    }

    @GetMapping("/{id}")
    Optional<Manufacturer> getOneManufacturer(@PathVariable Long id){
        return manufacteurerService.getOneManufacteurer(id);
    }

    @PostMapping
    Manufacturer addManufacturer(@RequestBody Manufacturer manufacturer){
        return manufacteurerService.addManufacteurer(manufacturer);
    }

    @PutMapping("/{id}")
    Manufacturer editManufacturer(@PathVariable Long id, @RequestBody Manufacturer manufacturer){
        return manufacteurerService.editManufacteurer(manufacturer);
    }

    @DeleteMapping("/{id}")
    void deleteManufacturers(@PathVariable Long id){
        manufacteurerService.deleteManufacteurer(id);
    }
}
