package emt.project.backend.model;

import emt.project.backend.model.enums.FurnitureColor;
import emt.project.backend.model.enums.FurnitureType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Set;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Furniture {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    String name;

    String description;

    Long price;

    @Lob
    byte[] picture;

    @ManyToOne
    Category category;

    @ManyToOne
    Manufacturer manufacturer;

    @Enumerated(EnumType.STRING)
    FurnitureType furnitureType;

    @ElementCollection(targetClass = FurnitureColor.class)
    @CollectionTable(name = "furniture_color",
            joinColumns = @JoinColumn(name = "furniture_id"))
    @Enumerated(EnumType.STRING)
    @Column(name = "color")
    Set<FurnitureColor> colorSet;
}
