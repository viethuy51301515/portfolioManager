import React from "react";
import MenuLeft from "../menu";
import Header from "../header";
import "./layout.scss";
import StudentList from "../student/studentList";
import Student from "../student";
import Login from "../../components/login";
import MenuItem from "antd/lib/menu/MenuItem";
import Event from "../event";
import { login } from "../../action/action";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  Redirect,
} from "react-router-dom";
import { useSelector, connect } from "react-redux";
import EventList from "../event/listevent";
import Teacher from "../teacher";
const ProtectedRoute = ({ component: Component, ...rest }) => {
  const authUser = useSelector((state) => state.login);
  // var email = localStorage.getItem("email");
  return (
    <Route
      {...rest}
      render={(props) =>
        authUser.isLoggedIn === true ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};
class LayoutItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
    };
  }
  componentWillMount() {
    if (localStorage.getItem("email") != "") {
      this.props.setEmail(localStorage.getItem("email"));
    }
  }
  render() {
    return (
      <Router>
        <div className="layout">
          <MenuLeft />
          <div className="left-layout">
            <Header />
            <div className="main-layout">
              <div className="main-body">
                <Switch>
                  <ProtectedRoute exact path="/" component={Event} />
                  <Route
                    exact
                    path="/login"
                    render={(props) => <Login {...props} />}
                  />
                  <ProtectedRoute exact path="/student" component={Student} />
                  <ProtectedRoute
                    exact
                    path="/studentList"
                    component={StudentList}
                  />
                  <ProtectedRoute exact path="/editEvent" component={Event} />
                  <ProtectedRoute
                    exact
                    path="/eventList"
                    component={EventList}
                  />
                  <ProtectedRoute
                    exact
                    path="/achivement"
                    component={Teacher}
                  />
                </Switch>
              </div>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}
const mapStateToProp = (state) => {
  return {
    data: state.login,
  };
};
const mapDispatchToProps = (dipatch) => {
  return {
    setEmail: (email) => {
      dipatch(login(email));
    },
  };
};
const Layout = connect(mapStateToProp, mapDispatchToProps)(LayoutItem);
export default Layout;
