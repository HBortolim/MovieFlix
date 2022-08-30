package com.devsuperior.movieflix.dto;

import com.devsuperior.movieflix.entities.Review;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.swing.text.html.parser.Entity;
import javax.validation.constraints.NotBlank;
import java.io.Serializable;
import java.util.Objects;

public class ReviewDto implements Serializable {
    private Long id;
    @NotBlank(message = "Field cannot be empty")
    private String text;
    @JsonProperty("user")
    private UserDto userDto;
    private Long movieId;


    public ReviewDto() {
    }

    public ReviewDto(Long id, String text) {
        this.id = id;
        this.text = text;
    }

    public ReviewDto(Review entity){
        id = entity.getId();
        text = entity.getText();
        movieId = entity.getMovie().getId();
        userDto = new UserDto(entity.getUser());
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public UserDto getUserDto() {
        return userDto;
    }

    public void setUserDto(UserDto userDto) {
        this.userDto = userDto;
    }

    public Long getMovieId() {
        return movieId;
    }

    public void setMovieId(Long movieId) {
        this.movieId = movieId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ReviewDto entity = (ReviewDto) o;
        return Objects.equals(this.id, entity.id) &&
                Objects.equals(this.text, entity.text);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, text);
    }

    @Override
    public String toString() {
        return getClass().getSimpleName() + "(" +
                "id = " + id + ", " +
                "text = " + text + ")";
    }
}
