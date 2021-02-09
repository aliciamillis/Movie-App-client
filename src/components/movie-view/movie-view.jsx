import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import axios from "axios";

import './movie-view.scss';

export class MovieView extends React.Component {

  constructor() {
    super();

    this.state = {};
  }

  addFavorite(movie) {
    let token = localStorage.getItem("token");
    let url =
      "https://evening-brushlands-63613.herokuapp.com/users/" +
      localStorage.getItem("user") +
      "/movies/" +
      movie._id;

    console.log(token);

    axios
      .post(url, "", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
        // window.open("/", "_self");
        window.open("/users/" + localStorage.getItem("user"), "_self");
        // alert("Added to favorites!");
      });
  }

  render() {
    const { movie, onClick } = this.props;

    if (!movie) return null;

    return (
      <div className='movie-view'>
        <Container>
          <Row>
            <Col md={6}>
              <Card>
                <Card.Img className='movie-poster' src={movie.ImagePath} />
                <Card.Body>
                  <Card.Title>{movie.Title}</Card.Title>
                  <Card.Text>
                    <span>Description:<br></br>{movie.Description}</span>
                  </Card.Text>

                  <Link to={`/genres/${movie.Genre.Name}`}>
                    <Button variant="link">Genre:</Button>
                  </Link>
                  <Card.Text>{movie.Genre.Name}</Card.Text>

                  <Link to={`/directors/${movie.Director}`}>
                    <Button variant="link">Director</Button>
                  </Link>
                  <Card.Text>{movie.Director}</Card.Text>
                  <Link to={`/`}>
                    <Button className='button' variant="link">
                      Back
                  </Button>
                  </Link>
                  <Button className='button' variant="link"
                    onClick={() => this.addFavorite(movie)}>
                    Add to Favorites
                 </Button>
                </Card.Body>
              </Card>
            </Col>

          </Row></Container>
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
};
