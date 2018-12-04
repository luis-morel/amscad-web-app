import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from "react-router-dom";
import API from "./utils/API";
import { NavBar } from "./components";
import {
  AddNewBldg,
  AddNewFloor,
  AddNewRoom,
  AddNewUser,
  Dashboard,
  Login
} from "./pages"
import "./App.css";

class App extends React.Component {

  state = {

    loading: "initial",
    loggedIn: false,
    user: null,

    buildings: []

  }

  componentDidMount() {
    // Maintaining user session
    this.setState({ loading: "true" });
    API.getLoggedOnUser()
      .then(res => {
        if (res.data.user) {
          this.setState({
            loading: "false",
            loggedIn: true,
            user: res.data.user
          });
        }
        else {
          this.setState({
            loading: "false",
            loggedIn: false,
            user: null
          });
        };
      });
  };

  setUser = (user) => {
    this.setState({
      user,
      loggedIn: true
    });
  };

  titleCase = (str) => {
    return str.toLowerCase()
      .split(' ')
      .map(function (word) {
        return word.replace(word[0], word[0].toUpperCase());
      })
      .join(' ');
  }

  render() {

    // Prevents rendering until user info is retrieved
    if (this.state.loading === 'initial') {
      return <h2>Intializing...</h2>;
    }

    // Prevents rendering until user info is retrieved
    if (this.state.loading === 'true') {
      return <h2>Loading...</h2>;
    }

    return (

      <Router>

        <div>
          <NavBar />
          <Switch>
            <Route
              exact path="/"
              render={() =>
                <Login
                  loggedIn={this.state.loggedIn}
                  user={this.state.user}
                  setUser={this.setUser}
                />}
            />
            <Route
              exact path="/buildings/addnewbldg"
              render={({ history }) =>
                <AddNewBldg
                  loggedIn={this.state.loggedIn}
                  user={this.state.user}
                  history={history}
                  titleCase={this.titleCase}
                />}
            />
            <Route
              exact path="/buildings/floors/addnewfloor/:bldgId"
              render={({ history, match }) =>
                <AddNewFloor
                  loggedIn={this.state.loggedIn}
                  user={this.state.user}
                  history={history}
                  params={match.params}
                  titleCase={this.titleCase}
                />}
            />
            <Route
              exact path="/buildings/floors/rooms/addnewroom/:bldgId/:floorId"
              render={({ history, match }) =>
                <AddNewRoom
                  loggedIn={this.state.loggedIn}
                  user={this.state.user}
                  history={history}
                  params={match.params}
                  titleCase={this.titleCase}
                />}
            />
            <Route
              exact path="/dashboard"
              render={({ history }) =>
                <Dashboard
                  loggedIn={this.state.loggedIn}
                  user={this.state.user}
                  history={history}
                />}
            />
            <Route
              exact path="/users/addnewuser"
              render={({ history }) =>
                <AddNewUser
                  loggedIn={this.state.loggedIn}
                  user={this.state.user}
                  history={history}
                  titleCase={this.titleCase}
                />}
            />
            {/* All non-matching routes are redirected to dashboard */}
            <Route
              render={() =>
                <Redirect to="/dashboard" />
              }
            />
          </Switch>
        </div>

      </Router>

    ); // End of return()

  }; // End of render()

}; // End of App class component

export default App;