# python-llm-movie-api/python-llm-movie-api/README.md

# Python LLM Movie API

This project is a Python API that utilizes a large language model (LLM) to search for movies and people, backed by a MongoDB database. It provides a simple interface for querying movie data and retrieving information about individuals associated with those movies.

## Project Structure

```
python-llm-movie-api
├── src
│   ├── app.py                # Entry point of the application
│   ├── controllers           # Contains API controllers
│   │   └── movie_controller.py
│   ├── models                # Defines data models
│   │   └── movie.py
│   ├── services              # Contains business logic
│   │   └── movie_service.py
│   ├── utils                 # Utility functions
│   │   └── llm_processor.py
│   └── config.py            # Configuration settings
├── requirements.txt          # Project dependencies
├── Dockerfile                # Docker configuration
├── .env                      # Environment variables
└── README.md                 # Project documentation
```

## Setup Instructions

1. Clone the repository:

    ```
    git clone <repository-url>
    cd python-llm-movie-api
    ```

2. Create a virtual environment:

    ```
    python -m venv venv
    source venv/bin/activate  # On Windows use `venv\Scripts\activate`
    ```

3. Install the required dependencies:

    ```
    pip install -r requirements.txt
    ```

4. Set up your environment variables in the `.env` file. You will need to provide your MongoDB connection string and any necessary API keys.

5. Run the application:
    ```
    python src/app.py
    ```

## Usage

The API provides the following endpoints:

-   `GET /movies`: Retrieve a list of movies.
-   `GET /search`: Search for people associated with movies.

## Docker

To build and run the application using Docker, use the following commands:

1. Build the Docker image:

    ```
    docker build -t python-llm-movie-api .
    ```

2. Run the Docker container:
    ```
    docker run -p 5000:5000 --env-file .env python-llm-movie-api
    ```

## License

This project is licensed under the MIT License. See the LICENSE file for more details.
