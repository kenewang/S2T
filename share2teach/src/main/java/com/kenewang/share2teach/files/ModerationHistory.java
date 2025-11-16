package com.kenewang.share2teach.files;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import jakarta.persistence.Table;
import jakarta.persistence.Column;
import java.time.LocalDateTime;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "moderation_history", schema = "public")
public class ModerationHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "moderation_id")
    private Long moderationId;

    // File reference (foreign key)
    @ManyToOne
    @JoinColumn(name = "file_id", referencedColumnName = "file_id")
    private FileEntity file;

    // Moderator reference (foreign key → user.user_id)
    @ManyToOne
    @JoinColumn(name = "moderator_id", referencedColumnName = "user_id")
    private UserEntity moderator;

    @Column(name = "action")
    private String action;

    @Column(name = "comments")
    private String comments;

    @Column(name = "action_date")
    private LocalDateTime actionDate = LocalDateTime.now();

    // Getters & Setters

    public Long getModerationId() {
        return moderationId;
    }

    public void setModerationId(Long moderationId) {
        this.moderationId = moderationId;
    }

    public FileEntity getFile() {
        return file;
    }

    public void setFile(FileEntity file) {
        this.file = file;
    }

    public UserEntity getModerator() {
        return moderator;
    }

    public void setModerator(UserEntity moderator) {
        this.moderator = moderator;
    }

    public String getAction() {
        return action;
    }

    public void setAction(String action) {
        this.action = action;
    }

    public String getComments() {
        return comments;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }

    public LocalDateTime getActionDate() {
        return actionDate;
    }

    public void setActionDate(LocalDateTime actionDate) {
        this.actionDate = actionDate;
    }
}
