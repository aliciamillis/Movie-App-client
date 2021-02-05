import React from 'react';
import PropTypes from 'prop-types';

import './director-view.scss';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

export class DirectorView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { director } = this.props;

    if (!director) return null;

    return (
      <div className="director-view">
        <Container>
          <Row>
            <Card className="director-details-card">
              <Card.Title className="director-name">{movie.Director}</Card.Title>
              <Card.Text className="director-bio director-details">{movie.Bio}</Card.Text>
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
