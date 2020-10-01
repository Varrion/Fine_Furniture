package emt.project.backend.service;

import emt.project.backend.model.Manufacturer;

import java.util.List;
import java.util.Optional;

public interface ManufacteurerService {

    List<Manufacturer> getAllManufacteurers();

    Optional<Manufacturer> getOneManufacteurer(Long id);

    Manufacturer addManufacteurer(Manufacturer manufacturer);

    Manufacturer editManufacteurer(Manufacturer manufacturer);

    void deleteManufacteurer(Long id);
}
