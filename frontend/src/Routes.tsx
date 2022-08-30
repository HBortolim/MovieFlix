import Navbar from "components/Navbar";
import PrivateRoute from "components/PrivateRoute";
import Home from "pages/Home";
import MovieDetails from "pages/MovieDetails";
import Movies from "pages/Movies";
import { Route, Router, Switch } from "react-router-dom";
import history from "util/history";

const Routes = () => {
  return (
    <Router history={history}>
      <Navbar />
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <PrivateRoute path="/movies">
          <Route path="/movies" exact>
            <Movies />
          </Route>
          <Route path="/movies/:movieId" exact>
            <MovieDetails />
          </Route>
        </PrivateRoute>
      </Switch>
    </Router>
  );
};

export default Routes;
