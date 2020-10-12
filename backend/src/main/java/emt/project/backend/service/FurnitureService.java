package emt.project.backend.service;

import emt.project.backend.model.Furniture;
import emt.project.backend.model.dto.FurnitureDto;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

public interface FurnitureService {

    List<Furniture> getAllFurniture();

    List<Furniture> findAllByCategoryId(Long id);

    List<Furniture> findAllByManufacturerId(Long id);

    Optional<Furniture> getOneFurniture(Long id);

    Furniture addFurniture(FurnitureDto furnitureDto, MultipartFile orElse) throws IOException;

    void deleteFurniture(Long id);

    Furniture editFurniture(Long id, FurnitureDto furnitureDto, MultipartFile furniturePicture) throws IOException;
}
