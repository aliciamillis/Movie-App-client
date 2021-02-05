import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import { LoginView } from '../login-view/login-view';
import { RegisterView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

import './main-view.scss';

import { Container, Row, Col, Nav, Navbar } from 'react-bootstrap';

export class MainView extends React.Component {

  constructor() {
    super();

    this.state = {
      movies: [],
      selectedMovie: null,
      user: null,
      register: true
    };

    this.onMovieClick = this.onMovieClick.bind(this)
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }


  /*When a movie is clicked, this function is invoked and updates the state of the `selectedMovie` *property to that movie*/
  onMovieClick(movie) {
    this.setState({
      selectedMovie: movie
    });
  }


  /*using tokens and authentication to login*/
  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null,
    });
  }

  /* new method to get movies from token auth*/
  getMovies(token) {
    axios.get('https://evening-brushlands-63613.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        // Assign the result to the state
        this.setState({
          movies: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  /* when user registers*/
  onRegister(register) {
    this.setState({
      register,
    });
  }

  /* When back button click selectedMovie will set on it's initial state*/
  setInititalState() {
    this.setState({
      selectedMovie: null,
    });
  }

  render() {
    const { movies, selectedMovie, user, register } = this.state;

    // Before the movies have been loaded
    if (!movies) return <div className="main-view" />;
    const pathMovies = `/`;
    const pathProfile = `/users/${user}`;

    return (
      <Router>
        <div className="main-view">
          <Navbar expand="lg" className="navbar" sticky="top">
            <Navbar.Brand as={Link} to="/" className="navbar-brand">
              <h1 className="app-name">Movie Appx</h1>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
              <Nav.Link as={Link} to={pathMovies} className="link-text">
                Movies
							</Nav.Link>
              <Nav.Link as={Link} to={pathProfile} className="link-text">
                Profile
							</Nav.Link>
              <Nav.Link onClick={() => this.onLoggedOut()} as={Link} to={pathMovies} className="link-text">
                Log Out
							</Nav.Link>
            </Navbar.Collapse>
          </Navbar>

          <Route
            exact
            path="/"
            render={() => {
              if (!user) return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;
              return movies.map((m) => <MovieCard key={m._id} movie={m} />);
            }}
          />
          <Route path="/register" render={() => <RegistrationView />} />
          <Route path="/movies/:movieID" render={({ match }) => <MovieView movie={movies.find((m) => m._id === match.params.movieID)} />} />
          <Route
            exact
            path="/genres/:name"
            render={({ match }) => {
              if (!movies) return <div className="main-view" />;
              return <GenreView genre={movies.find((m) => m.Genre.Name === match.params.name).Genre} />;
            }}
          />

          <Route
            exact
            path="/directors"
            render={({ match }) => {
              if (!movies) return <div className="main-view" />;
              return <DirectorView director={movies.find((m) => m.Director === match.params.director).Director} />;
            }}
          />

          <Route
            exact
            path="/users/:username"
            render={() => {
              if (!user) return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;
              if (movies.length === 0) return;
              return <ProfileView movies={movies} />;
            }}
          />
        </div>
      </Router>
    );
  }
}
MainView.propTypes = {
  movie: PropTypes.arrayOf({
    _id: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
    }),
    Director: PropTypes.string.isRequired,
    Name: PropTypes.string.isRequired,
    Bio: PropTypes.string.isRequired,
    Birth: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Featured: PropTypes.bool,
  }),
  user: PropTypes.string,
};