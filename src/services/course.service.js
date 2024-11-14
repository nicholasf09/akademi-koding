import axios from 'axios';
import getCookies  from '../hooks/getCookies';

export const getCourses = (callback) => {
  const token = getCookies("token");
  
  axios.get("http://localhost:3000/courses", {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  })
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      console.log("Error fetching courses:", err);
    });
};

export const addCourse = (courseData, callback) => {
  const token = getCookies("token");
  axios.post("http://localhost:3000/add/course", courseData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  })
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      console.log("Error adding course:", err);
    });
};
