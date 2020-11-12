package emt.project.backend.service;

import emt.project.backend.model.Category;

import java.util.List;
import java.util.Optional;

public interface CategoryService {

    List<Category> getAllCategories();

    Optional<Category> getOneCategory(Long id);

    Category saveCategory(Category category);

    Category editCategory(Long id, Category category);

    void deleteCategory(Long id);
}
