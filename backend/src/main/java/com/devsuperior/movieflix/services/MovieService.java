package com.devsuperior.movieflix.services;

import com.devsuperior.movieflix.dto.MovieDto;
import com.devsuperior.movieflix.dto.MovieDtoMin;
import com.devsuperior.movieflix.dto.ReviewDto;
import com.devsuperior.movieflix.entities.Genre;
import com.devsuperior.movieflix.entities.Movie;
import com.devsuperior.movieflix.entities.Review;
import com.devsuperior.movieflix.repositories.GenreRepository;
import com.devsuperior.movieflix.repositories.MovieRepository;
import com.devsuperior.movieflix.repositories.ReviewRepository;
import com.devsuperior.movieflix.services.exceptions.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class MovieService {

    @Autowired
    private MovieRepository movieRepository;

    @Autowired
    private ReviewRepository reviewRepository;

    @Transactional(readOnly = true)
    public MovieDto findById(Long id) {
        Optional<Movie> obj = movieRepository.findById(id);
        Movie entity = obj.orElseThrow(() -> new ResourceNotFoundException("Entity not found!"));
        return new MovieDto(entity);
    }

    @Transactional(readOnly = true)
    public Page<MovieDtoMin> findByGenre(Long genreId, Pageable pageable) {
        Long id = (genreId == 0) ? null : genreId;
        Page<Movie> page = movieRepository.findMovieByGenre(id, pageable);
        return page.map(x -> new MovieDtoMin(x));
    }

    @Transactional(readOnly = true)
    public List<ReviewDto> findReviewsByMovie(Long id) {
        Movie movie = movieRepository.getOne(id);
        List<Review> list = reviewRepository.findReviewsByMovie(movie);
        return list.stream().map(x -> new ReviewDto(x)).collect(Collectors.toList());
    }
}
