from flask import Flask
from src.controllers.movie_controller import MovieController

app = Flask(__name__)

# Initialize the MovieController
movie_controller = MovieController()

# Set up routes
@app.route('/movies', methods=['GET'])
def get_movies():
    return movie_controller.get_movies()

@app.route('/search', methods=['GET'])
def search_people():
    return movie_controller.search_people()

if __name__ == '__main__':
    app.run(debug=True)