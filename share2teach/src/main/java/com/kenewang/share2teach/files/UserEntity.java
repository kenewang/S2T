package com.kenewang.share2teach.files;

import java.time.LocalDateTime;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Column;
import jakarta.persistence.Table;

@Entity
@Table(name = "user", schema = "public")
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long user_id;

    @Column(name = "fname")
    private String fname;

    @Column(name = "lname")
    private String lname;
    @Column(name = "username")
    private String username;
    @Column(name = "password_hash")
    private String password_hash;

    @Column(name = "email")
    private String email;

    @Column(name = "is_active")
    private Boolean is_active;

    @Column(name = "role")
    private String role;

    @Column(name = "token_version")
    private Integer token_version = 0;

    @Column(name = "created_at")

    private LocalDateTime created_at = LocalDateTime.now();

    // setters

    public void setUser_id(Long user_id) {
        this.user_id = user_id;
    }

    public void setFname(String fname) {
        this.fname = fname;
    }

    public void setLname(String lname) {
        this.lname = lname;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword_hash(String password_hash) {
        this.password_hash = password_hash;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setIs_active(Boolean is_active) {
        this.is_active = is_active;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public void setToken_version(Integer token_version) {
        this.token_version = token_version;
    }

    public void setCreated_at(LocalDateTime created_at) {
        this.created_at = created_at;
    }

    // getters

    public Long getUser_id() {
        return user_id;
    }

    public String getFname() {
        return fname;
    }

    public String getLname() {
        return lname;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword_hash() {
        return password_hash;
    }

    public String getEmail() {
        return email;
    }

    public Boolean getIs_active() {
        return is_active;
    }

    public String getRole() {
        return role;
    }

    public Integer getToken_version() {
        return token_version;
    }

    public LocalDateTime getCreated_at() {
        return created_at;
    }

}
