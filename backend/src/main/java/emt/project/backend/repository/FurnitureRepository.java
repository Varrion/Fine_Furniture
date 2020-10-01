package emt.project.backend.repository;

import emt.project.backend.model.Furniture;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface FurnitureRepository extends JpaRepository<Furniture,Long> {
    @Transactional
    List<Furniture> findAllByCategoryId(Long id);

    @Transactional
    List<Furniture> findAllByManufacturerId(Long id);
}
