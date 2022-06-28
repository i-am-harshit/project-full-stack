import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ListEmployeeComponent from "./components/ListEmployeeComponent";
//import HeaderComponent from "./components/HeaderComponent";
//import FooterComponent from "./components/FooterComponent";
import CreateEmployeeComponent from "./components/CreateEmployeeComponent";
import UpdateEmployeeComponent from "./components/UpdateEmpolyeeComponent";
import ViewEmployeeComponent from "./components/ViewEmployeeComponent";
import AuthService from "./services/auth.service";
import Login from "./components/LoginComponent";
import Register from "./components/RegisterComponent";
import EventBus from "./common/EventBus"
import PrivateRoute from "./components/PrivateRouteComponent";
//import AddEmployee from "./components/AddEmployee";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles?.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles?.includes("ROLE_ADMIN"),
      });
    }

    EventBus.on("logout", () => {
      this.logOut();
    });
  }

  componentWillUnmount() {
    EventBus.remove("logout");
  }

  logOut() {
    AuthService.logout();
    this.setState({
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    });
  }

  render() {
    const { currentUser } = this.state;

    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-primary">
        <div>
                <header>
                    <nav className="navbar navbar-expand-md navbar-dark bg-primary">
                    <div><a href="https://www.google.co.in/" className="navbar-brand">Employee Management App</a></div>
                    </nav>
                </header>
            </div>
          <div className="navbar-nav mr-auto">
            
            {/*showModeratorBoard && (
              <li className="nav-item">
                <a href={"/mod"} className="nav-link">
                  Moderator Board
                </a>
              </li>
            )*/}

            {/*showAdminBoard && (
              <li className="nav-item">
                <a href={"/admin"} className="nav-link">
                  Admin Board
                </a>
              </li>
            )*/}

            {currentUser && (
              <li className="nav-item">
                <a href={"/employees"} className="nav-link">
                  Home
                </a>
              </li>
            )}
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <a href={"/employees"} className="nav-link">
                  {currentUser.username}
                </a>
              </li>
              <li className="nav-item">
                <a href={"/login"} className="nav-link" onClick={this.logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <a href={"/login"} className="nav-link">
                  Login
                </a>
              </li>

              <li className="nav-item">
                <a href={"/register"} className="nav-link">
                  Sign Up
                </a>
              </li>
            </div>
          )}
        </nav>

        <div>
          <Router>
            <div className="container">
              <Switch>
                <Route path="/" exact component={ListEmployeeComponent}></Route>
                <Route exact path="/login" component={Login} />
                <PrivateRoute  path="/employees" component={ListEmployeeComponent} />
                
                
                <PrivateRoute
                  path="/add-employee/:id"
                  component={CreateEmployeeComponent}
                />
                <PrivateRoute
                  path="/view-employee/:id"
                  component={ViewEmployeeComponent}
                />
                
                <Route exact path="/register" component={Register} />
                 <PrivateRoute path = "/update-employee/:id" component = {UpdateEmployeeComponent}/> 
              </Switch>
            </div>
           
          </Router>
        </div>
      </div>
    );
  }
}

export default App;
