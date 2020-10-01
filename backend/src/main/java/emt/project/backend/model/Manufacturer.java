package emt.project.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Set;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Manufacturer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    String name;

    String description;

    String city;

    String street;

    Integer numberOfStreet;

    Long phoneNumber;

    @Lob
    byte[] picture;

    @ManyToMany
    Set<Category> categories;

    @OneToMany(mappedBy = "manufacturer")
    Set<Furniture> furnitures;
}
