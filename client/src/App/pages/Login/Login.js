import React from "react";
import { Redirect } from "react-router-dom";
import {
  Col,
  Row,
  Wrapper
} from "../../components/BootstrapGrid";
import API from "../../utils/API";
import "./Login.css"; // Styling

class Login extends React.Component {

  state = {

    email: "",
    password: "",
    loggedIn: false

  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value })
  };

  handleLogin = event => {
    event.preventDefault();
    API.login({
      email: this.state.email,
      password: this.state.password
    })
      .then((res) => {
        this.props.setUser(res.data.user);
        this.setState({ loggedIn: true });
      });
  };

  render() {

    // Authentication redirect
    if (this.state.loggedIn) 
      return <Redirect to="/dashboard" />    

    return (

      <Wrapper>
        <Row>

          <Col size="md" span="4"></Col>

          <Col size="md" span="4">
            <div>
              <h3 id="loginFormHeader">Welcome to AMS</h3>
              <form onSubmit={this.handleLogin}>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input name="email" className="form-control" type="text" value={this.state.email} onChange={this.handleInputChange} />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input name="password" className="form-control" type="password" value={this.state.password} onChange={this.handleInputChange} />
                </div>

                <button className="loginBtn genAppBtn" type="submit">LOGIN</button>

              </form>
            </div>
          </Col>

        </Row>
      </Wrapper>

    ); // End of Return

  }; // End of render()

}; // End of Login class component

export default Login;