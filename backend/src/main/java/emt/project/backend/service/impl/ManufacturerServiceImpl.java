package emt.project.backend.service.impl;

import emt.project.backend.model.Manufacturer;
import emt.project.backend.model.User;
import emt.project.backend.model.dto.ManufacturerDto;
import emt.project.backend.repository.ManufacturerRepository;
import emt.project.backend.service.ManufacturerService;
import emt.project.backend.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class ManufacturerServiceImpl implements ManufacturerService {
    private final ManufacturerRepository manufacturerRepository;
    private final UserService userService;

    public ManufacturerServiceImpl(ManufacturerRepository manufacturerRepository, UserService userService) {
        this.manufacturerRepository = manufacturerRepository;
        this.userService = userService;
    }

    @Override
    public List<Manufacturer> getAllManufacturers() {
        return manufacturerRepository.findAll();
    }

    @Override
    public Optional<Manufacturer> getOneManufacturers(Long id) {
        return manufacturerRepository.findById(id);
    }

    @Override
    public Optional<Manufacturer> getManufacturerByName(String name) {
        return manufacturerRepository.findByName(name);
    }

    @Override
    public Optional<Manufacturer> getManufacturerByAdmin(Long manufacturerAdmin) {
        Optional<User> optionalUser = userService.getOneUser(manufacturerAdmin);

        return manufacturerRepository.findByManufacturerAdmin(optionalUser.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND)));
    }

    @Override
    public Manufacturer addManufacturer(ManufacturerDto manufacturerDto, MultipartFile manufacturerPicture) throws IOException {
        Manufacturer manufacturer = new Manufacturer();

        if (manufacturerPicture != null) {
            manufacturer.setPicture(manufacturerPicture.getBytes());
        }

        if (manufacturerDto.getManufacturerAdminId() != null) {
            Optional<User> optionalUser = userService.getOneUser(manufacturerDto.getManufacturerAdminId());
            manufacturer.setManufacturerAdmin(optionalUser.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND)));
        } else {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }

        manufacturer.setPhoneNumber(manufacturerDto.getPhoneNumber());
        manufacturer.setCity(manufacturerDto.getCity());
        manufacturer.setDescription(manufacturerDto.getDescription());
        manufacturer.setName(manufacturerDto.getName());
        manufacturer.setAddress(manufacturerDto.getAddress());
        manufacturer.setAddress(manufacturerDto.getEmail());

        return manufacturerRepository.save(manufacturer);
    }

    @Override
    public Manufacturer editManufacturer(ManufacturerDto manufacturerDto, MultipartFile manufacturerPicture, Long id) throws IOException {

        Optional<Manufacturer> optionalManufacturer = getOneManufacturers(id);

        if (optionalManufacturer.isPresent()) {
            Manufacturer editedManufacturer = optionalManufacturer.get();

            if (manufacturerPicture != null) {
                editedManufacturer.setPicture(manufacturerPicture.getBytes());
            }

            editedManufacturer.setPhoneNumber(manufacturerDto.getPhoneNumber());
            editedManufacturer.setCity(manufacturerDto.getCity());
            editedManufacturer.setDescription(manufacturerDto.getDescription());
            editedManufacturer.setName(manufacturerDto.getName());
            editedManufacturer.setAddress(manufacturerDto.getAddress());
            editedManufacturer.setEmail(manufacturerDto.getEmail());

            return manufacturerRepository.save(editedManufacturer);
        }

        throw new ResponseStatusException(HttpStatus.NOT_FOUND);
    }

    @Override
    public void deleteManufacturer(Long id) {
        manufacturerRepository.deleteById(id);
    }
}
