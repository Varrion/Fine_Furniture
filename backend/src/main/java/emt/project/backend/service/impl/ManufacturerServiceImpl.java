package emt.project.backend.service.impl;

import emt.project.backend.model.Manufacturer;
import emt.project.backend.repository.ManufacturerRepository;
import emt.project.backend.service.ManufacteurerService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ManufacturerServiceImpl implements ManufacteurerService {
    private final ManufacturerRepository manufacturerRepository;

    public ManufacturerServiceImpl(ManufacturerRepository manufacturerRepository) {
        this.manufacturerRepository = manufacturerRepository;
    }

    @Override
    public List<Manufacturer> getAllManufacteurers() {
        return manufacturerRepository.findAll();
    }

    @Override
    public Optional<Manufacturer> getOneManufacteurer(Long id) {
        return manufacturerRepository.findById(id);
    }

    @Override
    public Manufacturer addManufacteurer(Manufacturer manufacturer) {
        return manufacturerRepository.save(manufacturer);
    }

    @Override
    public Manufacturer editManufacteurer(Manufacturer manufacturer) {

        Optional<Manufacturer> manufacturer1 = getOneManufacteurer(manufacturer.getId());

        if (manufacturer1.isPresent()){
            Manufacturer editedManufacturer = manufacturer1.get();
            editedManufacturer.setCategories(manufacturer.getCategories());
            editedManufacturer.setCity(manufacturer.getCity());
            editedManufacturer.setDescription(manufacturer.getDescription());
            editedManufacturer.setId(manufacturer.getId());
            editedManufacturer.setName(manufacturer.getName());
            editedManufacturer.setNumberOfStreet(manufacturer.getNumberOfStreet());
            editedManufacturer.setStreet(manufacturer.getStreet());
            editedManufacturer.setPicture(manufacturer.getPicture());
            editedManufacturer.setPhoneNumber(manufacturer.getPhoneNumber());

            return manufacturerRepository.save(editedManufacturer);
        }
        return null;
    }

    @Override
    public void deleteManufacteurer(Long id) {
        manufacturerRepository.deleteById(id);
    }
}
