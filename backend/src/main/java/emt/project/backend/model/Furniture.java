package emt.project.backend.model;

import emt.project.backend.model.enums.FurnitureColor;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

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

    @ElementCollection(targetClass = FurnitureColor.class)
    @CollectionTable(name = "furniture_color",
            joinColumns = @JoinColumn(name = "furniture_id"))
    @Enumerated(EnumType.STRING)
    @Column(name = "color")
    @Fetch(value = FetchMode.SELECT)
    Set<FurnitureColor> colorSet;

    @Override
    public boolean equals(Object o) {

        if (o == this) return true;
        if (!(o instanceof Furniture)) {
            return false;
        }

        Furniture furniture = (Furniture) o;

        return furniture.name.equals(name) &&
                furniture.id.equals(id);
    }

    @Override
    public int hashCode() {
        int result = 17;
        result = 31 * result + name.hashCode();
        result = 31 * result + price.intValue();
        result = 31 * result + description.hashCode();
        return result;
    }
}
