import axios from 'axios';
import getCookies from '../hooks/getCookies';

export const getProjectDetails = (idModule, callback) => {
  const token = getCookies("token");
  const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

  axios.get(`${API_ENDPOINT}/projects/${idModule}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  })
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      console.log("Error fetching project details:", err);
    });
};
