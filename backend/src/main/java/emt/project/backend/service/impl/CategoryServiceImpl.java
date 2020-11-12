package emt.project.backend.service.impl;

import emt.project.backend.model.Category;
import emt.project.backend.repository.CategoryRepository;
import emt.project.backend.service.CategoryService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryServiceImpl implements CategoryService {
    final private CategoryRepository categoryRepository;

    public CategoryServiceImpl(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    @Override
    public Optional<Category> getOneCategory(Long id) {
        return categoryRepository.findById(id);
    }

    @Override
    public Category saveCategory(Category category) {
        return categoryRepository.save(category);
    }

    @Override
    public Category editCategory(Long id, Category category) {

        Optional<Category> optionalCategory = getOneCategory(id);
        if (optionalCategory.isPresent()) {

            Category editedCategory = optionalCategory.get();
            editedCategory.setName(category.getName());
            editedCategory.setDescription(category.getDescription());

            return categoryRepository.save(editedCategory);
        }

        return null;
    }

    @Override
    public void deleteCategory(Long id) {
        categoryRepository.deleteById(id);
    }
}
