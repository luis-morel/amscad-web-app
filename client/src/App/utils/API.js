import axios from "axios"; // Promise-based HTTP client

export default {

  // API Methods (/api)
  addNewBldg: (newBldg) => { return axios.post("/api/buildings/createnewbldg", newBldg); },
  addNewFloor: (newFloor) => { return axios.post("/api/buildings/floors/createnewfloor", newFloor); },
  addNewRoom: (newRoom) => { return axios.post("/api/buildings/floors/rooms/createnewroom", newRoom); },
  addNewUser: (newUser) => { return axios.post("/api/users/createnewuser", newUser); },
  getAllBldgs: () => { return axios.get("/api/buildings/listall"); },
  getAllData: () => { return axios.get("/api/getalldata"); },
  getFloorsInBldg: (bldgId) => { return axios.get(`/api/buildings/floors/listall/${bldgId}`); },
  getOneBldg: (bldgId) => { return axios.get(`/api/buildings/findone/${bldgId}`); },
  getOneFloor: (floorId) => { return axios.get(`/api/buildings/floors/findone/${floorId}`); },
  getRoomsInFloor: (floorId) => { return axios.get(`/api/buildings/floors/listrooms/${floorId}`); },

  // User Authentication Methods (/auth)
  getLoggedOnUser: () => { return axios.get("/auth/getUser"); },
  login: (user) => { return axios.post("/auth/login", user) },
  logout: () => { return axios.get("/auth/logout"); }

};