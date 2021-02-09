import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import { setMovies } from '../../actions/actions';

import MoviesList from '../movies-list/movies-list';
import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';


import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';

import './main-view.scss';

import { Container, Row, Col, Nav, Navbar, Button, Form } from 'react-bootstrap';

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
        this.props.setMovies(response.data);
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

  logOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("id");
    this.setState({
      user: null,
    });
  }

  render() {

    let { movies, visibilityFilter } = this.props;
    let { user } = this.state;

    return (
      <Router>
        <div className="main-view">
          <Navbar expand="lg" className="navbar" sticky="top">
            <Navbar.Brand>
              <h1 className="app-name">Movie App</h1>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
              <Link to={`/register`}>
                <Button className="link-button">Register</Button>
              </Link>
              <Link to={`/`}>
                <Button className="link-button">Movies</Button>
              </Link>
              <Link to={`/users/${user}`}>
                <Button className="link-button">Profile</Button>
              </Link>
              <Link to={`/`}>
                <Button className="link-button" onClick={() => this.logOut()}> Logout</Button>
              </Link>
              <Form inline>
                <VisibilityFilterInput variant="outline-light" visibilityFilter={visibilityFilter} />
              </Form>
            </Navbar.Collapse>
          </Navbar>

          <Route
            exact
            path="/"
            render={() => {
              if (!user) return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;
              return <Row><MovieList movies={movies} />
              </Row>
            }}
          />
          <Route
            exact
            path="/register/"
            render={() => {
              if (!user) return <RegistrationView onRegister={(register) => this.onRegister(register)} />;
              return <Row>{movies.map((m) => <MovieCard key={m._id} movie={m} />)}
              </Row>
            }}
          />

          <Route path="/movies/:movieID" render={({ match }) => <MovieView movie={movies.find((m) => m._id === match.params.movieID)} />} />

          <Route
            exact
            path="/genres/:name"
            render={({ match }) => {
              if (!movies) return <div className="main-view" />;
              return <GenreView movie={movies.find((m) => m.Genre.Name === match.params.name)} />;
            }}
          />

          <Route
            exact
            path="/directors/:director"
            render={({ match }) => {
              if (!movies) return <div className="main-view" />;
              return <DirectorView movie={movies.find((m) => m.Director === match.params.director)} />;
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

          <Route
            path="/users/:username"
            render={() => (
              <ProfileView movies={movies} logOutFunc={() => this.logOut()} />
            )}
          />
        </div>
      </Router>
    );
  }
}

let mapStateToProps = state => {
  return { movies: state.movies }
}

export default connect(mapStateToProps, { setMovies })(MainView);
