package emt.project.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    String username;

    String password;

    String name;

    String surname;

    String email;

    Long phoneNumber;

    String city;

    String street;

    Integer streetNumber;

    @Lob
    byte[] picture;
}
