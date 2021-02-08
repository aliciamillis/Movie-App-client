import React from 'react';
import PropTypes from 'prop-types';

import './director-view.scss';
import { Row, Container, Card, ListGroup } from 'react-bootstrap';

import { Link } from "react-router-dom";

export class DirectorView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { movie } = this.props;

    if (!movie) return null;

    return (
      <div className="director-view">
        <Container>
          <Row>
            <Card className="director-details-card">
              <Card.Title className="director-name">{movie.Director}</Card.Title>
              <Link to={`/directors/${movie.Director}`}></Link>
              <Card.Text className="director-bio director-details">{movie.Bio}</Card.Text>
              <Link to={`/directors/${movie.Bio}`}></Link>
              <ListGroup variant="flush" className="card-content">
                <ListGroup.Item className="director-yob director-details">
                  <span className="label">Birth Year</span>
                  <br />
                  {movie.Birth}
                  <br />
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Row>
        </Container>
      </div>
    );
  }
}

DirectorView.propTypes = {
  movie: PropTypes.shape({
    Director: PropTypes.string.isRequired,
    Bio: PropTypes.string.isRequired,
    Birth: PropTypes.string.isRequired,
  })
};
