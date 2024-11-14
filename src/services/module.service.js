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
