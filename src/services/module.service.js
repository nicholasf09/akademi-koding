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

export const getModuleBySlug = async (slug) => {
  try {
    const response = await axios.get(`http://localhost:3000/modules/slug/${slug}`);
    return response.data;  // Mengembalikan data module
  } catch (error) {
    console.error("Error fetching module by slug:", error);
    throw error;
  }
};
