import React, { Component } from "react";
import { KEY, BASE_URL } from "../../variables";
import { Link, withRouter } from "react-router-dom";
import routes from "../../routes";
import styles from "./HomeView.module.css";

class HomeView extends Component {
  state = {
    movies: [],
  };

  componentDidMount() {
    return fetch(`${BASE_URL}trending/all/week?api_key=${KEY}`)
      .then((response) => response.json())
      .then((response) =>
        this.setState((prevState) => ({
          movies: [...response.results],
        }))
      );
  }

  render() {
    return (
      <>
        <h2>Trending today</h2>
        <ul>
          {this.state.movies.map((movie) => (
            <li key={movie.id}>
              <Link
                className={styles.link}
                to={{
                  pathname: `/movie/${movie.id}`,
                  state: {
                    from: `${routes.home}`,
                  },
                }}
              >
                {movie.title} {movie.name}
              </Link>
            </li>
          ))}
        </ul>
      </>
    );
  }
}

export default withRouter(HomeView);
