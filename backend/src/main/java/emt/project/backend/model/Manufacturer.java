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

    @OneToMany(mappedBy = "manufacturer", orphanRemoval = true)
    @JsonIgnore
    Set<Furniture> furniture;

    @Override
    public boolean equals(Object o) {

        if (o == this) return true;
        if (!(o instanceof Furniture)) {
            return false;
        }

        Manufacturer manufacturer = (Manufacturer) o;

        return manufacturer.name.equals(name) &&
                manufacturer.id.equals(id);
    }

    @Override
    public int hashCode() {
        int result = 17;
        result = 31 * result + name.hashCode();
        result = 31 * result + description.hashCode();
        return result;
    }
}
