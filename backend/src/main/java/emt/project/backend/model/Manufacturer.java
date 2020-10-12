package emt.project.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
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

    String email;

    String address;

    String phoneNumber;

    @OneToOne
    User manufacturerAdmin;

    @Lob
    byte[] picture;

    @OneToMany(mappedBy = "manufacturer")
    Set<Furniture> furniture;
}
