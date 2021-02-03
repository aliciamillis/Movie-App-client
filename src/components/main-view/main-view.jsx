import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import { LoginView } from '../login-view/login-view';
import { RegisterView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

import './main-view.scss';

import { Container, Row, Col } from 'react-bootstrap';

export class MainView extends React.Component {

  constructor() {
    super();

    this.state = {
      movies: [],
      selectedMovie: null,
      user: null,
      register: null
    };
  }

  componentDidMount() {
    axios.get('https://evening-brushlands-63613.herokuapp.com/movies')
      .then(response => {
        this.setState({
          movies: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  onMovieClick(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  onLoggedIn(user) {
    this.setState({
      user
    });
  }

  onRegister(register) {
    this.setState({
      register,
    });
  }

  setInititalState() {
    this.setState({
      selectedMovie: null,
    });
  }

  render() {
    const { movies, selectedMovie, user, register } = this.state;

    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

    if (!register)
      return (
        <RegisterView onRegister={(register) => this.onRegister(register)} />
      );

    // Before the movies have been loaded
    if (!movies) return <div className="main-view" />;

    return (
      <div className='main-view'>
        <div className='main-body text-center'>
          {selectedMovie ? (
            <MovieView
              movie={selectedMovie}
              onClick={() => this.setInititalState()}
            />
          ) : (
              <Container>
                <Row>
                  {movies.map((movie) => (
                    <Col xs={12} md={3} key={movie._id}>
                      <MovieCard
                        key={movie._id}
                        movie={movie}
                        onClick={(movie) => this.onMovieClick(movie)}
                      />
                    </Col>
                  ))}
                </Row>
              </Container>
            )}
        </div>
      </div>
    );
  }
}
MainView.propTypes = {
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
  }),
  onClick: PropTypes.func.isRequired
};