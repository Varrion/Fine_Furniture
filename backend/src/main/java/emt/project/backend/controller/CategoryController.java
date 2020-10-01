package emt.project.backend.controller;

import emt.project.backend.model.Category;
import emt.project.backend.service.CategoryService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/category")
public class CategoryController {
    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping
    List<Category> getAllCategories(){
        return categoryService.getAllCategories();
    }

    @GetMapping("/{id}")
    Optional<Category> getOneCategory(@PathVariable Long id){
        return categoryService.getOneCategory(id);
    }

    @PostMapping
    Category addCategory(@RequestBody Category category){
        return categoryService.saveCategory(category);
    }

    @PutMapping("/{id}")
    Category editCategory(@PathVariable Long id, @RequestBody Category category){
        return categoryService.editCategory(category);
    }

    @DeleteMapping("/{id}")
    void deleteCategory(@PathVariable Long id){
        categoryService.deleteCategory(id);
    }
}
