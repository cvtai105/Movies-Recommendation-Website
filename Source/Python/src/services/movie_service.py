class MovieService:
    def __init__(self, db):
        self.db = db

    def fetch_movies(self):
        return list(self.db.movies.find())

    def search_people_in_db(self, name):
        return list(self.db.people.find({"name": {"$regex": name, "$options": "i"}}))