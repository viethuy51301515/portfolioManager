import axios from "axios";
const api = axios.create({
  header: {
    "Content-Type": "application/json",
  },
});

export async function getAchivement() {
  try {
    const achivements = await api.get("/api/achivement");
    console.log(achivements.data);
    return achivements.data;
  } catch (error) {
    return console.log(error.response.data);
  }
}
