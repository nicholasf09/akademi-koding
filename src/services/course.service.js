import axios from 'axios';
import getCookies  from '../hooks/getCookies';

export const getCourses = (callback) => {
  const token = getCookies("token");
  const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;
  axios.get(`${API_ENDPOINT}/courses`, {
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
  const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;
  axios.post(`${API_ENDPOINT}/add/course`, courseData, {
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
