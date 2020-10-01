package emt.project.backend.controller;

import emt.project.backend.model.Furniture;
import emt.project.backend.service.FurnitureService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/furniture")
public class FurnitureController {
    private final FurnitureService furnitureService;

    public FurnitureController(FurnitureService furnitureService) {
        this.furnitureService = furnitureService;
    }

    @GetMapping
    List<Furniture> getAllFurnitures(){
        return furnitureService.getAllFurnitures();
    }

    @GetMapping("/{id}")
    Optional<Furniture> getOneFurniture(@PathVariable Long id){
        return furnitureService.getOneFurniture(id);
    }

    @GetMapping("/{categoryId}")
    List<Furniture> getAllByCategory(@PathVariable Long categoryId){
        return furnitureService.findAllByCategoryId(categoryId);
    }

    @GetMapping("/{manufacturerId}")
    List<Furniture> getAllByManufacturerId(@PathVariable Long manufacturerId){
        return furnitureService.findAllByManufacturerId(manufacturerId);
    }

    @PostMapping
    Furniture addFurniture(@RequestBody Furniture furniture){
        return furnitureService.addFurniture(furniture);
    }

    @PutMapping("/{id}")
    Furniture editFurniture(@PathVariable Long id,@RequestBody Furniture furniture){
        return furnitureService.editFurniture(furniture);
    }

    @DeleteMapping("/{id}")
    void deleteFurnite(@PathVariable Long id){
        furnitureService.deleteFurniture(id);
    }
}
