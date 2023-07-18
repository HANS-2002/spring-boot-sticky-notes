package com.example.stickyNotesAPI.models.Notes;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("notes")
public class Notes {
    @Id
    private String id;

    private String title;
    private String content;
    private String color;
    private String userId;

    public Notes() {
    }

    public Notes(String title, String content, String color, String userId) {
        this.title = title;
        this.content = content;
        this.color = color;
        this.userId = userId;
    }

    public Notes(String id, String title, String content, String color, String userId) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.color = color;
        this.userId = userId;
    }

    public String getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getContent() {
        return content;
    }

    public String getColor() {
        return color;
    }

    public String getUserId() {
        return userId;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    @Override
    public String toString() {
        return "Notes{" +
                "id='" + id + '\'' +
                ", title='" + title + '\'' +
                ", content='" + content + '\'' +
                ", color='" + color + '\'' +
                ", userId='" + userId + '\'' +
                '}';
    }
}
