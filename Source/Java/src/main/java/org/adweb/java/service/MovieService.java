package org.adweb.java.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mongodb.client.result.UpdateResult;
import com.mongodb.internal.bulk.UpdateRequest;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.adweb.java.collection.Movie.*;
import org.adweb.java.collection.User.MovieShort;
import org.adweb.java.collection.User.Review;
import org.adweb.java.document.MovieGenre;
import org.adweb.java.repository.Movie.*;
import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationOperation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class MovieService {

    private final MovieRepo movieRepo;
    private final MovieUpcomingRepo movieUpcomingRepo;
    private final MovieTrendingRepo movieTrendingRepo;
    private final MoviePopularRepo moviePopularRepo;
    private final MovieNowPlayingRepo movieNowPlayingRepo;
    private final MovieTopRatedRepo movieTopRatedRepo;
    private final MongoTemplate mongoTemplate;

    public Page<Movie> getMovies(int page, int pageSize) {
        PageRequest pageRequest = PageRequest.of(page, pageSize);
        return movieRepo.findAll(pageRequest);
    }

    public Page<MoviePopular> getMoviePopular(int page, int pageSize) {
        PageRequest pageRequest = PageRequest.of(page, pageSize);
        return moviePopularRepo.findAll(pageRequest);
    }

    public Page<MovieTopRated> getMovieTopRated(int page, int pageSize) {
        PageRequest pageRequest = PageRequest.of(page, pageSize);
        return movieTopRatedRepo.findAll(pageRequest);
    }

    public Page<MovieTrending> getMovieTrending(int page, int pageSize) {
        PageRequest pageRequest = PageRequest.of(page, pageSize);
        return movieTrendingRepo.findAll(pageRequest);
    }

    public Page<MovieNowPlaying> getMovieNowPlaying(int page, int pageSize) {
        PageRequest pageRequest = PageRequest.of(page, pageSize);
        return movieNowPlayingRepo.findAll(pageRequest);
    }

    public Page<MovieUpcoming> getMovieUpComing(int page, int pageSize) {
        PageRequest pageRequest = PageRequest.of(page, pageSize);
        return movieUpcomingRepo.findAll(pageRequest);
    }

    public Movie getMovieDetails(Long id) {
        return movieRepo.findByTmdbId(id)
                .orElseThrow(
                        () -> new RuntimeException("Movie not found with tmdb_id " + id)
                );
    }

    public Review addReview(Long tmdbId, Review review) {
        review.setCreatedAt(LocalDateTime.now().toString());
        Query query = new Query(Criteria.where("tmdb_id").is(tmdbId));
        Update update = new Update().push("reviews", review);
        mongoTemplate.updateFirst(query, update, Movie.class);
        return review;
    }

    public Page<Movie> findMoviesWithSameGenres(Long tmdbId, int page, int size) {
        // Fetch the movie by its ID
        Movie targetMovie = movieRepo.findByTmdbId(tmdbId)
                .orElseThrow(() -> new RuntimeException("Movie not found when find same genre"));

        // Extract genre IDs from the target movie
        List<Integer> genreIds = targetMovie.getGenres().stream()
                .map(MovieGenre::getId)
                .collect(Collectors.toList());

        // Create Pageable object for pagination
        PageRequest pageRequest = PageRequest.of(page, size);

        // Find movies with matching genres and return paginated results
        return movieRepo.findByGenres(genreIds, pageRequest);
    }

    public List<Movie> findSimilarDocuments(List<Float> embedding) {
        AggregationOperation vectorSearch = context -> new Document("$vectorSearch", new Document()
                .append("queryVector", embedding)
                .append("path", "overview_embedding")
                .append("numCandidates", 100)
                .append("limit", 5)
                .append("index", "overviewEmbeddingIndex")
        );

        Aggregation aggregation = Aggregation.newAggregation(vectorSearch);
        AggregationResults<Movie> results = mongoTemplate.aggregate(aggregation, "movies", Movie.class);

        return results.getMappedResults();
    }

    public List<MovieShort> findSimilarMovies(List<Float> embedding) {

            // Create the custom aggregation adding the vector embedding as an argument
            Document vectorSearchStage = new Document("$vectorSearch", new Document()
                    .append("queryVector", embedding)
                    .append("path", "overview_embedding")
                    .append("numCandidates", 100)
                    .append("limit", 5) // Number of nearest neighbors to retrieve
                    .append("index", "overviewEmbeddingIndex") // Specify the vector index name
            );

            Aggregation aggregation = Aggregation.newAggregation(
                    context -> vectorSearchStage, // Custom $search stage
                    Aggregation.project("tmdb_id", "poster_path", "original_title", "overview") // project needed fields
            );

            // Execute the aggregation pipeline
            AggregationResults<Map> results = mongoTemplate.aggregate(aggregation, "movies", Map.class);
            List<MovieShort> moviesShort = results.getMappedResults().stream()
                    .map(movie -> {
                        Object tmdbIdObj = movie.get("tmdb_id");
                        Long tmdbId = (tmdbIdObj instanceof Number) ? ((Number) tmdbIdObj).longValue(): null;

                        return MovieShort.builder()
                        .tmdbId(tmdbId)
                            .name((String)movie.get("original_title"))
                            .posterPath((String)movie.get("poster_path"))
                            .build();
                    }).collect(Collectors.toList());
            return moviesShort;

    }
}
