/* eslint-disable no-useless-catch */
import axios from 'axios';
import getCookies from '../hooks/getCookies';

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

export const getModulesByCourseIdWithPhoto = async (courseId, callback) => {
  const lambdaUrl = "https://3l5rkxq77abaerkudlzy3av6em0znyfw.lambda-url.us-east-1.on.aws/";
  const token = getCookies("token");

  try {
    const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

    // Fetch all modules for the given courseId
    const res = await axios.get(`${API_ENDPOINT}/module/course/${courseId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const modules = res.data;
    let processedModules = 0;

    // Process each module and add a thumbnail
    for (let i = 0; i < modules.length; i++) {
      const module = modules[i];
      const objectKey = module.link;

      try {
        const lambdaRes = await axios.post(lambdaUrl, {
          objectKey: objectKey
        }, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        // Add the base64 data to the module's thumbnail
        modules[i].thumbnail = lambdaRes.data.base64Data;
        processedModules += 1;

        console.log("Processed modules:", processedModules);

        // If all modules are processed, call the callback
        if (processedModules === modules.length) {
          callback(modules);
        }
      } catch (err) {
        console.log("Error fetching file from S3:", err);
      }
    }

  } catch (error) {
    console.error("Error fetching modules by course ID:", error);
    throw error;
  }
};

export const addModule = async (moduleData, callback) => {
  const token = getCookies("token");
  const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;
  await axios.post(`${API_ENDPOINT}/add/module`, moduleData, {
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
  const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;
  const token = getCookies("token"); // Assuming you need an auth token

  try {
    const response = await axios.get(`${API_ENDPOINT}/module/${moduleId}/projects`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data; // Returns the projects data
  } catch (error) {
    console.error("Error fetching projects by module ID:", error);
    throw error;
  }
};
export const enrollInModule = async (userId, moduleId, checkOnly = false) => {
  const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;
  const token = getCookies("token"); // Assuming you need an auth token

  try {
    const response = await axios.post(
      `${API_ENDPOINT}/enroll`,
      { userId, moduleId, checkOnly },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include token for authorization
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error enrolling in module:", error.response?.data || error.message);
    throw error;
  }
};

export const getModuleIdBySlug = async (moduleSlug) => {
  const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;
  try {
    const response = await axios.get(`${API_ENDPOINT}/modules/${moduleSlug}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const markModuleComplete = async (userId, moduleId) => {
  const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;
  const token = getCookies("token");

  try {
    await axios.post(
      `${API_ENDPOINT}/complete-module`,
      { userId, moduleId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error marking module complete:", error.response?.data || error.message);
    throw error;
  }
};



