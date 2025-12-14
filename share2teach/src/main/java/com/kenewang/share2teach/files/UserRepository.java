package com.kenewang.share2teach.files;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEntity, Long> {
    Optional<UserEntity> findByEmail(String email);

    /*
     * • If a user with that email exists → the Optional will contain the
     * UserEntity.
     * 
     * • If no user exists with that email → the Optional will be empty (not null).
     */

    Optional<UserEntity> findByResetPasswordToken(String token);

}
