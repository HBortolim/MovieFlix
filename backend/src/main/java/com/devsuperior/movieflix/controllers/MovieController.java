package com.devsuperior.movieflix.controllers;

import com.devsuperior.movieflix.dto.MovieDto;
import com.devsuperior.movieflix.dto.MovieDtoMin;
import com.devsuperior.movieflix.dto.ReviewDto;
import com.devsuperior.movieflix.services.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/movies")
public class MovieController {

    @Autowired
    private MovieService movieService;

    @GetMapping(value = "/{id}")
    public ResponseEntity<MovieDto> findById(@PathVariable Long id) {
        MovieDto dto = movieService.findById(id);
        return ResponseEntity.ok().body(dto);
    }

    @GetMapping
    public ResponseEntity<Page<MovieDtoMin>> findByGenre(
            @RequestParam(name = "genreId", defaultValue = "0") Long genreId,
            Pageable pageable
    ){
        Page<MovieDtoMin> page= movieService.findByGenre(genreId, pageable);
        return ResponseEntity.ok().body(page);
    }

    @GetMapping(value = "/{id}/reviews")
    public ResponseEntity<List<ReviewDto>> findReviewsByMovie(@PathVariable Long id){
        List<ReviewDto> list = movieService.findReviewsByMovie(id);
        return ResponseEntity.ok().body(list);
    }

}
