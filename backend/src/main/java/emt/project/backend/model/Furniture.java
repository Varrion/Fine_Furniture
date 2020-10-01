package emt.project.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

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




    
}
