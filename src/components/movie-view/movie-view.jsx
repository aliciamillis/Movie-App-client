import React from 'react';
import PropTypes from 'prop-types';

import { Card, Button } from 'react-bootstrap';

import './movie-view.scss';

export class MovieView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { movie, onClick } = this.props;

    if (!movie) return null;

    return (
      <div className='movie-view'>
        <Card style={{ width: '18' }}>
          <Card.Img variant='top' src={movie.imagePath} />
          <Card.Body>
            <Card.Title>{movie.title}</Card.Title>
            <Card.Text>
              <span>Description: </span>
              <span className='value'>{movie.description}</span>
            </Card.Text>
            <Card.Text>
              <span>Genre: </span>
              <span className='value'>{movie.genre.name}</span>
            </Card.Text>
            <Card.Text>
              <span>Director: </span>
              <span className='value'>{movie.director.name}</span>
            </Card.Text>
            <Button onClick={() => onClick()} variant='primary'>
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
    Director: PropTypes.shape({
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string.isRequired
    }),
    Featured: PropTypes.bool.isRequired,
    ImagePath: PropTypes.string.isRequired
  }).isRequired,
  onClick: PropTypes.func.isRequired
};
