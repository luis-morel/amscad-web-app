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
import "./Dashboard.css" // Styling

class Dashboard extends React.Component {

  state = {

    loggedIn: this.props.loggedIn,
    user: this.props.user,

    buildings: []

  }

  componentDidMount = () => {
    if (this.state.loggedIn)
      this.getAllData();
  }

  getAllData = () => {
    API.getAllData()
      .then((results) => {
        this.setState({ buildings: results.data });
        console.log(this.state.buildings);
      });
  };

  handleLogOut = () => {
    API.logout()
      .then(() => {
        this.props.history.push("/");
      })
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
                <h3>Building Administration - Dashboard</h3>
              </div>
              <div className="pageHeaderNavBtnContainer">
                <Link to="/users/addnewuser">
                  <button className="pageHeaderNavBtn">Add New User</button>
                </Link>
                <Link to="/buildings/addnewbldg">
                  <button className="pageHeaderNavBtn">Add New Building</button>
                </Link>
                <button className="pageHeaderNavBtn" onClick={this.handleLogOut}>Log Out</button>
              </div>

              <hr className="pageHeaderHr" />
            </div>
          </Col>

        </Row>

        <Row>

          <Col overflow="Yes" size="md" span="12">

            <div className="dashDataContainer">
              {
                this.state.buildings.map((building, i) => {
                  return (
                    <div key={building.id} className="dashBldgContainer">
                      <div className="dashBldgName">
                        <Link
                          to={{ pathname: `/buildings/floors/addnewfloor/${building.id}` }}
                        >
                          {building.name}, {building.location}
                        </Link>
                      </div>
                      {/* <hr className="dashDataHr" /> */}
                      {
                        this.state.buildings[i].Floors.length === 0 ?
                          <div className="dashFloorContainer">
                            <div className="dashFloorName">
                              <Link to={{ pathname: `/buildings/floors/addnewfloor/${building.id}` }} >
                                Click here to add floors
                        </Link>
                            </div>
                          </div>
                          :
                          this.state.buildings[i].Floors.map((floor, j) => {
                            return (
                              <div key={floor.id} className="dashFloorContainer">
                                <div className="dashFloorName">
                                  <Link
                                    to={{ pathname: `/buildings/floors/rooms/addnewroom/${building.id}/${floor.id}` }}
                                  >
                                    Floor: {floor.name}
                                  </Link>
                                </div>
                                <div className="dashRoomContainer">
                                  {
                                    this.state.buildings[i].Floors[j].Rooms.length === 0 ?
                                      <div className="dashRoomName">
                                        <Link to={{ pathname: `/buildings/floors/rooms/addnewroom/${building.id}/${floor.id}` }} >
                                          Click here to add rooms
                                  </Link>
                                      </div>
                                      :
                                      this.state.buildings[i].Floors[j].Rooms.map((room) => {
                                        return (
                                          <div key={room.id} className="dashRoomName">{room.name}</div>
                                        )
                                      })
                                  }
                                </div>
                              </div>
                            )
                          })
                      }
                    </div>
                  )
                })
              }
            </div>

          </Col>

        </Row>
      </Wrapper >

    ); // End of return()

  }; // End of render()

}; // End of Dashboard class component

export default Dashboard;