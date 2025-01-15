import React from 'react';

const ActorCard = ({ actor }) => {
  const styles = {
    poster: {
      width: '100%',
      height: 'auto',
    },
  };

  const handleImageError = (e) => {
    e.target.src = 'path/to/no-poster.png'; // Replace with the path to your "No Poster" image
  };

  return (
    <div className="actor-card">
      <img
        src={actor.profile_path}
        style={styles.poster}
        onError={handleImageError}
        alt={`${actor.name} Poster`}
      />
      <div className="actor-details">
        <h3>{actor.name}</h3>
        {/* Other actor details */}
      </div>
    </div>
  );
};

export default ActorCard;