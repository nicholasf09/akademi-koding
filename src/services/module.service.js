import axios from 'axios';

export const getModules = (callback) => {
  axios.get("http://localhost:3000/modules")
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      console.log("Error fetching modules:", err);
    });
};
