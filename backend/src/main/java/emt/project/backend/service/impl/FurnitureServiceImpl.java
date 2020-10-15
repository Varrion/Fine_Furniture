package emt.project.backend.service.impl;

import emt.project.backend.model.Category;
import emt.project.backend.model.Furniture;
import emt.project.backend.model.Manufacturer;
import emt.project.backend.model.dto.FurnitureDto;
import emt.project.backend.model.enums.FurnitureColor;
import emt.project.backend.repository.FurnitureRepository;
import emt.project.backend.service.CategoryService;
import emt.project.backend.service.FurnitureService;
import emt.project.backend.service.ManufacturerService;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class FurnitureServiceImpl implements FurnitureService {
    private final FurnitureRepository furnitureRepository;
    private final CategoryService categoryService;
    private final ManufacturerService manufacturerService;

    public FurnitureServiceImpl(FurnitureRepository furnitureRepository, CategoryService categoryService, ManufacturerService manufacturerService) {
        this.furnitureRepository = furnitureRepository;
        this.categoryService = categoryService;
        this.manufacturerService = manufacturerService;
    }

    @Override
    public List<Furniture> getAllFurniture() {
        return furnitureRepository.findAll();
    }

    @Override
    public List<Furniture> findAllByCategoryId(Long id) {
        return furnitureRepository.findAllByCategoryId(id);
    }

    @Override
    public List<Furniture> findAllByManufacturerId(Long id) {
        return furnitureRepository.findAllByManufacturerId(id);
    }

    @Override
    public Optional<Furniture> getOneFurniture(Long id) {
        return furnitureRepository.findById(id);
    }

    @Override
    public Furniture addFurniture(FurnitureDto furnitureDto, MultipartFile furniturePicture) throws IOException {
        Furniture furniture = new Furniture();

        if (furniturePicture != null) {
            furniture.setPicture(furniturePicture.getBytes());
        }

        furniture.setName(furnitureDto.getName());
        furniture.setDescription(furnitureDto.getDescription());
        furniture.setPrice(furnitureDto.getPrice());

        Optional<Category> optionalCategory = categoryService.getOneCategory(furnitureDto.getCategoryId());
        furniture.setCategory(optionalCategory.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND)));

        Optional<Manufacturer> optionalManufacturer = manufacturerService.getOneManufacturers(furnitureDto.getManufacturerId());
        furniture.setManufacturer(optionalManufacturer.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND)));

        Set<FurnitureColor> colorSet = new HashSet<>();
        for (String color : furnitureDto.getFurnitureColors()) {
            colorSet.add(FurnitureColor.valueOf(color));
        }
        furniture.setColorSet(colorSet);

        return furnitureRepository.save(furniture);
    }

    @Override
    public Furniture editFurniture(Long id, FurnitureDto furnitureDto, MultipartFile furniturePicture) throws IOException {

        Optional<Furniture> optionalFurniture = getOneFurniture(id);

        if (optionalFurniture.isPresent()) {
            Furniture editedFurniture = optionalFurniture.get();

            if (furniturePicture != null) {
                editedFurniture.setPicture(furniturePicture.getBytes());
            }

            editedFurniture.setName(furnitureDto.getName());
            editedFurniture.setDescription(furnitureDto.getDescription());
            editedFurniture.setPrice(furnitureDto.getPrice());

            Optional<Category> optionalCategory = categoryService.getOneCategory(furnitureDto.getCategoryId());
            editedFurniture.setCategory(optionalCategory.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND)));

            Set<FurnitureColor> colorSet = new HashSet<>();
            for (String color : furnitureDto.getFurnitureColors()) {
                colorSet.add(FurnitureColor.valueOf(color));
            }
            editedFurniture.setColorSet(colorSet);
            return furnitureRepository.save(editedFurniture);
        }

        throw new ResponseStatusException(HttpStatus.NOT_FOUND);
    }

    @Override
    public void deleteFurniture(Long id) {
        furnitureRepository.deleteById(id);
    }
}
