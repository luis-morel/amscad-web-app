import React from "react";
import {
  Link,
  Redirect
} from "react-router-dom";
import API from "../../utils/API";
import {
  Col,
  Row,
  Wrapper
} from "../../components/BootstrapGrid";

class AddNewUser extends React.Component {

  state = {

    loggedIn: this.props.loggedIn,
    user: this.props.user,

    name: "",
    title: "",
    userImageUrl: "",
    email: "",
    password: ""

  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value })
  };

  handleLogOut = () => {
    API.logout()
      .then(() => {
        this.props.history.push("/");
      })
  };

  handleNewUser = event => {
    event.preventDefault();
    let newName = event.target.name.value;
    let newTitle = event.target.title.value;
    const newUserImageUrl = event.target.userImageUrl.value;
    const newEmail = event.target.email.value;
    const newPassword = event.target.password.value;

    // Input validation
    if (newName && newTitle && newUserImageUrl && newEmail && newPassword) {
      newName = this.props.titleCase(newName);
      newTitle = this.props.titleCase(newTitle);
      API.addNewUser({
        name: newName,
        title: newTitle,
        userImageUrl: newUserImageUrl,
        email: newEmail,
        password: newPassword
      })
        .then(() => {
          alert("New user added successfully!");
          this.setState({
            name: "",
            title: "",
            userImageUrl: "",
            email: "",
            password: ""
          });
        });
    }
    else alert("All fields required!");
  };

  render() {

    // Authentication redirect
    if (!this.state.loggedIn)
      return <Redirect to="/" />

    return (

      <Wrapper>
        <Row>

          <Col size="md" span="12">
            <div className="pageHeaderContainer">
              <div className="pageHeaderText">
                <h3>User Administration - Add New User</h3>
              </div>
              <div className="pageHeaderNavBtnContainer">
                <Link to="/dashboard">
                  <button className="pageHeaderNavBtn">Back To Dashboard</button>
                </Link>
                <button className="pageHeaderNavBtn" onClick={this.handleLogOut}>Log Out</button>
              </div>
              <hr className="pageHeaderHr" />
            </div>
          </Col>

        </Row>

        <Row>

          <Col size="md" span="4">
            <div className="genFormSettings">
              <form onSubmit={this.handleNewUser}>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input name="name" className="capitalized form-control" placeholder="Name..." onChange={this.handleInputChange} value={this.state.name} type="name" required />
                </div>
                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <input name="title" className="capitalized form-control" placeholder="Title..." onChange={this.handleInputChange} value={this.state.title} type="title" required />
                </div>
                <div className="form-group">
                  <label htmlFor="userImageUrl">Profile Image Url</label>
                  <input name="userImageUrl" className="form-control" placeholder="Profile Image Url..." onChange={this.handleInputChange} value={this.state.userImageUrl} type="userImageUrl" required />
                </div>
                <div className="form-group">
                  <label htmlFor="email">E-mail</label>
                  <input name="email" className="form-control" placeholder="Email..." onChange={this.handleInputChange} value={this.state.email} type="email" required />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input name="password" className="form-control" placeholder="Password..." onChange={this.handleInputChange} value={this.state.password} type="password" required />
                </div>
                <div>
                  <button className="genAppBtn" type="submit">ADD NEW USER</button>
                </div>
              </form>
            </div>
          </Col>

        </Row>
      </Wrapper>

    ); // End of return()

  }; // End of render()

}; // End of AddNewUser class component

export default AddNewUser;