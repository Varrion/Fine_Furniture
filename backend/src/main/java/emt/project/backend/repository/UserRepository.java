package emt.project.backend.repository;

import emt.project.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    @Transactional
    Optional<User> getByUsernameAndPassword(String username, String password);

    @Transactional
    Optional<User> getByUsername(String username);
}
