import axios from "axios";
const api = axios.create({
  header: {
    "Content-Type": "application/json",
  },
});

/// Achivement

export async function getAchivement() {
  try {
    const achivements = await api.get("/api/achivement");
    console.log(achivements.data);
    return achivements.data;
  } catch (error) {
    return console.log(error.response.data);
  }
}

export async function saveAchivement(achivement) {
  try {
    const result = await api.put(
      `/api/achivement/${achivement.id}`,
      achivement
    );
  } catch (error) {
    return console.log(error.response.data);
  }
}

export async function addAchivement(achivement) {
  try {
    const result = await api.post("/api/achivement", achivement);
  } catch (error) {
    return console.log(error.response.data);
  }
}

export async function deleletAchivement(id) {
  try {
    const result = await api.delete(`/api/achivement/${id}`);
  } catch (error) {
    return console.log(error.response.data);
  }
}

////////
