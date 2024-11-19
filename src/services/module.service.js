import axios from 'axios';
import getCookies  from '../hooks/getCookies';

export const getModules = (callback) => {
  const token = getCookies("token");
  const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;
  axios.get(`${API_ENDPOINT}/modules`, {
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
    const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;
    const response = await axios.get(`${API_ENDPOINT}/module/course/${courseId}`, {
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
    const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;
    const response = await axios.get(`${API_ENDPOINT}/modules/slug/${slug}`, {
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
  const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;
  axios.post(`${API_ENDPOINT}/add/module`, moduleData, {
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

  const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

  axios.post(`${API_ENDPOINT}/update/module`, dataToSend, {
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

export const getProjectsByModuleId = async (moduleId) => {
  try {
    const response = await axios.get(`http://localhost:3000/module/${moduleId}/projects`);
    return response.data; // Returns the projects data
  } catch (error) {
    console.error("Error fetching projects by module ID:", error);
    throw error;
  }
};



