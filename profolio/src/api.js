import { inforStore } from "./firebase";
import axios from "axios";
const config = {
  header: {
    "Content-Type": "application/json",
  },
};
export const setUser = async () => {
  try {
    const res = await axios.get("/api/infor", {}, config);
    return res.data[0];
  } catch (error) {
    console.log(error.response.data);
  }
};
export const getSkill = async () => {
  try {
    const res = await axios.get("/api/skill", {}, config);
    return res.data;
  } catch (error) {
    console.log(error.response.data);
  }
};
export const getExperience = async () => {
  try {
    const res = await axios.get("/api/experience", {}, config);
    return res.data;
  } catch (error) {
    console.log(error.response.data);
  }
  // return inforStore.child('experience').once('value').then(function(snapshot) {
  //     return snapshot? snapshot.val() : [];
  // }).then(result => result);
};
export const getAchivement = async () => {
  try {
    const res = await axios.get("/api/achivement", {}, config);
    return res.data;
  } catch (error) {
    console.log(error.response.data);
  }
};
export const getPortfolio = async () => {
  try {
    const res = await axios.get("/api/portfolio", {}, config);
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error.response.data);
  }
};
