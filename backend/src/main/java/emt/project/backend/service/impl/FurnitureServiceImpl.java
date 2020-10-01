package emt.project.backend.service.impl;

import emt.project.backend.model.Furniture;
import emt.project.backend.repository.FurnitureRepository;
import emt.project.backend.service.FurnitureService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FurnitureServiceImpl implements FurnitureService {
    private final FurnitureRepository furnitureRepository;

    public FurnitureServiceImpl(FurnitureRepository furnitureRepository) {
        this.furnitureRepository = furnitureRepository;
    }

    @Override
    public List<Furniture> getAllFurnitures() {
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
    public Furniture addFurniture(Furniture furniture) {
        return furnitureRepository.save(furniture);
    }

    @Override
    public Furniture editFurniture(Furniture furniture) {

        Optional<Furniture> furniture1 = getOneFurniture(furniture.getId());

        if (furniture1.isPresent()){
            Furniture editedFurniture = furniture1.get();
            editedFurniture.setId(furniture.getId());
            editedFurniture.setName(furniture.getName());
            editedFurniture.setPicture(furniture.getPicture());
            editedFurniture.setPrice(furniture.getPrice());
            editedFurniture.setDescription(furniture.getDescription());
            editedFurniture.setCategory(furniture.getCategory());

            return furnitureRepository.save(editedFurniture);
        }
        return null;
    }

    @Override
    public void deleteFurniture(Long id) {
        furnitureRepository.deleteById(id);
    }
}
