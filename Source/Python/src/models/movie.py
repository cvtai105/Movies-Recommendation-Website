class Movie:
    def __init__(self, title, director, release_year):
        self.title = title
        self.director = director
        self.release_year = release_year

    def to_dict(self):
        return {
            "title": self.title,
            "director": self.director,
            "release_year": self.release_year
        }