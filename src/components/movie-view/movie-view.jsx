import React from 'react';
import PropTypes from 'prop-types';

import { Card, Button } from 'react-bootstrap';

import './movie-view.scss';

export class MovieView extends React.Component {

  render() {
    const { movie, onClick } = this.props;

    if (!movie) return null;

    return (
      <div className='movie-view'>
        <Card>
          <Card.Img className='movie-poster' src={movie.ImagePath} />
          <Card.Body>
            <Card.Title>{movie.title}</Card.Title>
            <Card.Text>
              <span>Description: {movie.description}</span>
            </Card.Text>
            <Card.Text>
              <span>Genre: {movie.genre}</span>
            </Card.Text>
            <Card.Text>
              <span>Director: {movie.director}{movie.bio}{movie.birth}</span>
            </Card.Text>
            <Card.Text>
              <span>Featured:{movie.featured}</span>
            </Card.Text>
            <Button className='button' onClick={() => onClick()}>
              Back
            </Button>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired
    }),
    Director: PropTypes.string.isRequired,
    Bio: PropTypes.string.isRequired,
    Birth: PropTypes.string.isRequired,
    Featured: PropTypes.bool.isRequired,
    ImagePath: PropTypes.string.isRequired
  }),
  onClick: PropTypes.func.isRequired
};
