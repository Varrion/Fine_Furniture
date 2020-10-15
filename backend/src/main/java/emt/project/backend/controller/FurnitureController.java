package emt.project.backend.controller;

import emt.project.backend.model.Furniture;
import emt.project.backend.model.dto.FurnitureDto;
import emt.project.backend.model.dto.PaymentDto;
import emt.project.backend.service.FurnitureService;
import emt.project.backend.service.PaymentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    private final PaymentService paymentService;

    public FurnitureController(FurnitureService furnitureService, PaymentService paymentService) {
        this.furnitureService = furnitureService;
        this.paymentService = paymentService;
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
    List<Furniture> getAllFurnitureByCategory(@PathVariable Long categoryId) {
        return furnitureService.findAllByCategoryId(categoryId);
    }

    @GetMapping("/manufacturer/{manufacturerId}")
    List<Furniture> getAllFurnitureByManufacturer(@PathVariable Long manufacturerId) {
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

    @PostMapping("/buy")
    public ResponseEntity<String> buyFurniture(@RequestBody PaymentDto request) {
        String chargeId = paymentService.createCharge(request);

        return chargeId != null
                ? new ResponseEntity<String>(chargeId, HttpStatus.OK)
                : new ResponseEntity<String>("Please check your credit card informations", HttpStatus.BAD_REQUEST);
    }
}
