import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

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
    axios.get('https://evening-brushlands-63613.herokuapp.com/movies')
      .then(response => {
        console.log("response.data", response.data)
        this.setState({
          movies: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }


  /*When a movie is clicked, this function is invoked and updates the state of the `selectedMovie` *property to that movie*/
  onMovieClick(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/
  onLoggedIn(user) {
    this.setState({
      user
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

    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

    if (!register)
      return (
        <RegisterView onRegister={(register) => this.onRegister(register)} />
      );

    // Before the movies have been loaded
    if (!movies) return <div className="main-view" />;

    return (
      <div className='main-view'>
        <header>
          <Navbar
            collapseOnSelect
            expand='lg'
            bg='dark'
            variant='dark'
            fixed='top'
          >
            <Navbar.Brand href='#home'></Navbar.Brand>
            <Navbar.Toggle aria-controls='responsive-navbar-nav' />
            <Navbar.Collapse id='responsive-navbar-nav'>
              <Nav className='mr-auto'>
                <Nav.Link href='#movies'>Movies</Nav.Link>
                <Nav.Link href='#genre'>Genre</Nav.Link>
                <Nav.Link href='#director'>Director</Nav.Link>
                <Nav.Link href='#login'>Logout</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </header>
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
