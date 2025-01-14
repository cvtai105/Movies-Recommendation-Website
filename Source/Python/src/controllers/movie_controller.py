class MovieController:
    def __init__(self, movie_service):
        self.movie_service = movie_service

    def get_movies(self):
        movies = self.movie_service.fetch_movies()
        return {"movies": movies}, 200

    def search_people(self, query):
        people = self.movie_service.search_people_in_db(query)
        return {"people": people}, 200