import React, { Component, Suspense, lazy } from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./components/header";
import routes from "./routes";

const HomeView = lazy(
  () => import("./views/homeView") /*webpackChunkName: 'home-view' */
);

const MovieDetailsPage = lazy(
  () =>
    import(
      "./views/movieDetailsPage"
    ) /*webpackChunkName: 'movie-details-page' */
);

const SearchMovie = lazy(
  () =>
    import("./views/searchMovies") /*webpackChunkName: 'search-mosie-page' */
);

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Suspense fallback={<h1>Loading...</h1>}>
          <Switch>
            <Route exact path={routes.home} component={HomeView} />
            <Route
              path={routes.movieDetailsPage}
              component={MovieDetailsPage}
            />
            <Route path={routes.movies} component={SearchMovie} />
            <Route component={HomeView} />
          </Switch>
        </Suspense>
      </div>
    );
  }
}

export default App;
