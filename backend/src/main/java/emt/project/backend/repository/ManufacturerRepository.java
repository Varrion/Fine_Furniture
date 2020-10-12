package emt.project.backend.repository;

import emt.project.backend.model.Manufacturer;
import emt.project.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.Optional;

@Repository
public interface ManufacturerRepository extends JpaRepository<Manufacturer, Long> {

    @Transactional
    Optional<Manufacturer> findByManufacturerAdmin(User user);

    @Transactional
    Optional<Manufacturer> findByName(String name);
}
