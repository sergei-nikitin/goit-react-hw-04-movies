import { React, Component } from "react";
import Axios from "axios";
import { KEY, BASE_URL } from "../variables";

export default class Reviews extends Component {
  state = {
    reviews: [],
  };

  async componentDidMount() {
    const { movieId } = this.props.match.params;

    const response = await Axios.get(
      `${BASE_URL}movie/${movieId}/reviews?api_key=${KEY}`
    );
    this.setState({ reviews: response.data.results });
  }

  render() {
    const { reviews } = this.state;
    return (
      <>
        {reviews.length === 0 && (
          <h3>We don't have any reviews for this movie.</h3>
        )}
        {reviews.map(({ content, author }) => (
          <p key={author}>{content}</p>
        ))}
      </>
    );
  }
}
