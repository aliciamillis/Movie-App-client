import React from 'react';
import PropTypes from 'prop-types';

import './genre-view.scss';
import { Container, Card, Button } from 'react-bootstrap';

import { Link } from "react-router-dom";

export class GenreView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { movie } = this.props;

    if (!movie) return null;

    return (
      <div className="genre-view">
        <Container>
          <Card className="genre-details-card">
            <Card.Body>
              <Card.Title className="genre-name">{movie.Genre.Name}</Card.Title>
              <Card.Text className="genre-description">{movie.Genre.Description}</Card.Text>
              <Link to={`/movies/${movie._id}`}>
                <Button className='button' variant="link">
                  Back
                </Button>
              </Link>
            </Card.Body>
          </Card>
        </Container>
      </div>
    );
  }
}

GenreView.propTypes = {
  genre: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
  }),
};
