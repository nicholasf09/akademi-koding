import axios from 'axios';

export const getCourses = (callback) => {
  axios.get("http://localhost:3000/courses")
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      console.log("Error fetching courses:", err);
    });
};
