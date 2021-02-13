import { React, Component } from "react";
import styles from "./SearchMovie.module.css";
import { KEY, BASE_URL } from "../../variables";
import { Link } from "react-router-dom";
import routes from "../../routes";

class SearchMovie extends Component {
  state = {
    value: "",
    movies: [],
  };

  componentDidMount() {
    const movies = localStorage.getItem("movies");
    const parsedMovies = JSON.parse(movies);
    if (parsedMovies) {
      this.setState({ movies: parsedMovies });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const prevMovies = prevState.movies;
    const nextMovies = this.state.movies;

    if (nextMovies !== prevMovies) {
      localStorage.setItem("movies", JSON.stringify(this.state.movies));
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { value } = this.state;

    if (value !== "") {
      fetch(`${BASE_URL}search/movie/?api_key=${KEY}&query=${value}`)
        .then((response) => response.json())
        .then((response) =>
          this.setState((prevState) => ({
            movies: [...response.results],
          }))
        );
    }
  };

  handleChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Search movies"
            value={this.state.value}
            onChange={this.handleChange}
            name="value"
          ></input>
          <button className={styles.btnSubmit} type="submit">
            search
          </button>
        </form>

        {this.state.movies.length > 0 && (
          <ul>
            {this.state.movies.map((movie) => (
              <li key={movie.id}>
                <Link
                  className={styles.link}
                  to={{
                    pathname: `/movie/${movie.id}`,
                    state: {
                      from: `${routes.movies}`,
                    },
                  }}
                >
                  {movie.title}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </>
    );
  }
}

export default SearchMovie;
