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
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    String name;

    String description;

    @OneToMany(mappedBy = "category")
    @JsonIgnore
    Set<Furniture> furniture;

    @ManyToMany
    Set<Manufacturer> manufacturers;

    @Override
    public boolean equals(Object o) {

        if (o == this) return true;
        if (!(o instanceof Furniture)) {
            return false;
        }

        Category category = (Category) o;

        return category.name.equals(name) &&
                category.id.equals(id);
    }

    @Override
    public int hashCode() {
        int result = 17;
        result = 31 * result + name.hashCode();
        result = 31 * result + description.hashCode();
        return result;
    }
}
