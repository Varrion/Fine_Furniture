package emt.project.backend.service;

import emt.project.backend.model.Furniture;

import java.util.List;
import java.util.Optional;

public interface FurnitureService {

    List<Furniture> getAllFurnitures();

    List<Furniture> findAllByCategoryId(Long id);

    List<Furniture> findAllByManufacturerId(Long id);

    Optional<Furniture> getOneFurniture(Long id);

    Furniture addFurniture(Furniture furniture);

    Furniture editFurniture(Furniture furniture);

    void deleteFurniture(Long id);
}
