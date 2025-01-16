import React, { act } from 'react';
import { Link } from 'react-router-dom';

const ActorCard = ({ actor }) => {
  const handleImageError = (e) => {
    e.target.src =
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTed7ytmvKOdAhKD4DibQ3xEuFuBozev9PjLp3a00xpu94MUrWzIcX_pideQYkSK91kydw&usqp=CAU'; // Replace with the path to your "No Poster" image
  };
  return (
    <Link to={`/actors/${actor.id}`}>
      <div style={styles.card}>
        <div style={styles.posterWrapper}>
          {actor.profile_path ? (
            <img
              src={actor.profile_path}
              style={styles.poster}
              onError={handleImageError}
              alt={`${actor.title} Poster`}
            />
          ) : (
            <div
              style={{
                ...styles.poster,
                backgroundColor: '#f5f5f5',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <span style={{ color: '#999' }}>No Poster</span>
            </div>
          )}
        </div>
        <div style={styles.details}>
          <h3 style={styles.title}>{actor.name}</h3>
        </div>
      </div>
    </Link>
  );
};

export default ActorCard;

const styles = {
  card: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    flexGrow: 1,
    width: '220px',
    overflow: 'hidden',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Arial, sans-serif',
  },
  posterWrapper: {
    position: 'relative',
    height: '20rem',
    overflow: 'hidden',
  },
  poster: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  details: {
    padding: '10px',
    backgroundColor: '#fff',
    textAlign: 'center',
  },
  title: {
    fontSize: '1rem',
    margin: '5px 0',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  year: {
    fontSize: '0.8rem',
    color: '#555',
  },
};
