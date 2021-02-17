import React, { Component } from "react";
import Axios from "axios";
import { KEY, BASE_URL } from "../../variables";
import { Link, Route } from "react-router-dom";
import Credits from "../../components/credits";
import Reviews from "../../components/Reviews";
import routes from "../../routes";
import styles from "./MovieDetailsPage.module.css";

export default class MovieDetailsPage extends Component {
  state = {
    title: "",
    poster_path: "",
    overview: "",
    release_date: "",
    genres: [],
    id: null,
  };

  async componentDidMount() {
    const { movieId } = this.props.match.params;

    const response = await Axios.get(
      `${BASE_URL}movie/${movieId}?api_key=${KEY}`
    );
    this.setState({
      ...response.data,
    });
  }

  handleGoBack = () => {
    const { location, history } = this.props;

    if (location.state && location.state.from) {
      return history.push(routes.home);
    }
  };

  render() {
    const { title, poster_path, overview, release_date, genres } = this.state;
    return (
      <div className={styles.moviePage}>
        <div className={styles.fotoAndInfo}>
          <div className={styles.btnAndFoto}>
            <button type="button" onClick={this.handleGoBack}>
              Go back
            </button>

            <img
              className={styles.image}
              src={
                this.state.poster_path
                  ? `https://image.tmdb.org/t/p/w300${poster_path}`
                  : "http://dummyimage.com/300x400/99cccc.gif&text=No+picture"
              }
              alt={title}
            />
          </div>
          <div className={styles.mainInfo}>
            <h3 className={styles.title}>{`${title} (${release_date.slice(
              0,
              4
            )})`}</h3>
            <p className={styles.overview}>{overview}</p>
            <p className={styles.title}>Genres</p>
            <ul className={styles.list}>
              {genres.length > 0 &&
                genres.map(({ id, name }) => (
                  <li className={styles.item} key={id}>
                    {name}
                  </li>
                ))}
            </ul>
          </div>
        </div>

        <ul className={styles.list}>
          <li key="Cast">
            <Link
              className={styles.link}
              to={{
                pathname: `/movie/${this.state.id}/credits`,
                state: {
                  from: `/movie/${this.state.id}`,
                },
              }}
            >
              Cast
            </Link>
          </li>
          <li key="Reviews">
            <Link
              className={styles.link}
              to={{
                pathname: `/movie/${this.state.id}/reviews`,
                state: {
                  from: `/movie/${this.state.id}`,
                },
              }}
            >
              Reviews
            </Link>
          </li>
        </ul>

        <Route exact path="/movie/:movieId/credits" component={Credits} />
        <Route exact path="/movie/:movieId/reviews" component={Reviews} />
      </div>
    );
  }
}
