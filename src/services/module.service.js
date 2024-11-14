import axios from 'axios';
import getCookies  from '../hooks/getCookies';

export const getModules = (callback) => {
  const token = getCookies("token");

  axios.get("http://localhost:3000/modules", {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  })
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      console.log("Error fetching modules:", err);
    });
};

export const getModuleByCourseId = async (courseId) => {
  const token = getCookies("token");
  try {
    const response = await axios.get(`http://localhost:3000/module/course/${courseId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });

    return response.data; 
  } catch (error) {
    console.error("Error fetching module by course id:", error);
    throw error;
  }
};

export const getModuleBySlug = async (slug) => {
  const token = getCookies("token");
  try {
    const response = await axios.get(`http://localhost:3000/modules/slug/${slug}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    return response.data;  // Mengembalikan data module
  } catch (error) {
    console.error("Error fetching module by slug:", error);
    throw error;
  }
};


export const addModule = (moduleData, callback) => {
  const token = getCookies("token");
  axios.post("http://localhost:3000/add/module", moduleData, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  })
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      console.log("Error adding module:", err);
    });
};

export const updateModule = (moduleData, courseId, callback) => {
  const token = getCookies("token");

  const dataToSend = {
    ...moduleData,
    courseId, 
  };

  axios.post("http://localhost:3000/update/module", dataToSend, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  })
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      console.log("Error editing module:", err);
    });
};
