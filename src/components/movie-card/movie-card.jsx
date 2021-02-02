import React from 'react';
import PropTypes from 'prop-types';

import { Card } from 'react-bootstrap';

import './movie-card.scss';

export class MovieCard extends React.Component {
  render() {
    const { movie, onClick } = this.props;

    return (
      <Card
        onClick={() => onClick(movie)}
        border='danger'
        style={{ width: '200', height: 'auto' }}
      >
        <Card.Header>{movie.title}</Card.Header>
        <img
          className='movie-poster'
          src={movie.imagePath}
          alt='movie poster'
        />
      </Card>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired
    }),
    Director: PropTypes.shape({
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string.isRequired
    }),
    Featured: PropTypes.bool.isRequired,
    ImagePath: PropTypes.string.isRequired
  }).isRequired,
  onClick: PropTypes.func.isRequired
};