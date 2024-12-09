import axios from 'axios';
import getCookies from '../hooks/getCookies';

export const getCoursesWithPhoto = (callback) => {
  const lambdaUrl = "https://3l5rkxq77abaerkudlzy3av6em0znyfw.lambda-url.us-east-1.on.aws/";
  const token = getCookies("token");
  const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

  axios.get(`${API_ENDPOINT}/courses`, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  })
    .then((res) => {
      const courses = res.data;
      let processedCourses = 0;

      courses.forEach((course, index) => {
        const objectKey = course.link;
          
        axios.post(lambdaUrl, 
          { objectKey }, // Body
          {
            headers: { 'Content-Type': 'application/json' },
          }
        )
          .then((lambdaRes) => {
            // Menambahkan base64 ke thumbnail course
            console.log("lambdaRes:", lambdaRes);
            courses[index].thumbnail = lambdaRes.data.base64Data;

            // Cek jika semua course sudah diproses
            processedCourses += 1;
            if (processedCourses === courses.length) {
              callback(courses);  // Kirim array courses yang sudah diproses ke callback
            }
          })
          .catch((err) => {
            console.log("Error fetching file from S3:", err);
          });

      });
    })
    .catch((err) => {
      console.log("Error fetching courses:", err);
    });
};

export const getCourseBySlugWithPhoto = async (slug, callback) => {
  const lambdaUrl = "https://3l5rkxq77abaerkudlzy3av6em0znyfw.lambda-url.us-east-1.on.aws/";
  const token = getCookies("token");
  const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

  await axios.get(`${API_ENDPOINT}/course/${slug}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  })
    .then((res) => {
      // console.log("res:", res.data[0]);
      const course = res.data[0];
      const objectKey = course.link;

      axios.post(lambdaUrl, {
        objectKey: objectKey
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((lambdaRes) => {
          course.thumbnail = lambdaRes.data.base64Data;
          callback(course);
        })
        .catch((err) => {
          console.log("Error fetching file from S3:", err);
        });
    })
    .catch((err) => {
      console.log("Error fetching course by slug:", err);
    });
};

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
    }).catch((err) => {
      console.log("Error fetching courses:", err);
    });

}

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
