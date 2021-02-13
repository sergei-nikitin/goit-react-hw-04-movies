import { React, Component } from "react";
import Axios from "axios";
import { KEY, BASE_URL } from "../../variables";
import styles from "./Credits.module.css";

export default class Credits extends Component {
  state = {
    cast: [],
  };

  async componentDidMount() {
    const { movieId } = this.props.match.params;

    const response = await Axios.get(
      `${BASE_URL}movie/${movieId}/credits?api_key=${KEY}`
    );
    this.setState({ cast: response.data.cast });
  }

  render() {
    const { cast } = this.state;
    return (
      <ul className={styles.list}>
        {cast.map(({ id, name, profile_path }) => (
          <li className={styles.item} key={id}>
            <img
              className={styles.image}
              src={
                profile_path
                  ? `https://image.tmdb.org/t/p/w300${profile_path}`
                  : "http://dummyimage.com/300x400/99cccc.gif&text=No+picture"
              }
              alt={name}
            />
            {name}
          </li>
        ))}
      </ul>
    );
  }
}
