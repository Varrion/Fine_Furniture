package emt.project.backend.service;

import emt.project.backend.model.Manufacturer;
import emt.project.backend.model.dto.ManufacturerDto;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

public interface ManufacturerService {

    List<Manufacturer> getAllManufacturers();

    Optional<Manufacturer> getOneManufacturers(Long id);

    Optional<Manufacturer> getManufacturerByName(String name);

    Optional<Manufacturer> getManufacturerByAdmin(Long manufacturerAdmin);

    Manufacturer addManufacturer(ManufacturerDto manufacturerDto, MultipartFile manufacturerPicture) throws IOException;

    Manufacturer editManufacturer(ManufacturerDto manufacturerDto, MultipartFile manufacturerPicture, Long id) throws IOException;

    void deleteManufacturer(Long id);

}
