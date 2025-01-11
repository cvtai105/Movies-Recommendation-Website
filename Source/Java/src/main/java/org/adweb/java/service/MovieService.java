package org.adweb.java.service;

import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.adweb.java.collection.Movie;
import org.adweb.java.repository.MovieRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@RequiredArgsConstructor
@Service
public class MovieService {
    @Autowired
    private MovieRepo movieRepo;
    public Page<Movie> getMovies(int page, int pageSize) {
        PageRequest pageRequest = PageRequest.of(page, pageSize);
        return movieRepo.findAll(pageRequest);
    }

}
