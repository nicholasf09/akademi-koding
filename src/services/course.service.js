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

export const addCourse = (courseData, callback) => {
  axios.post("http://localhost:3000/add/course", courseData, {
    headers: {
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
