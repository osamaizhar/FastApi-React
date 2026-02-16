import axios from "axios";

// Create an instance of axios with the Base URL
const api = axios.create ({
    baseURL: "http://localhost:8000", // Base URL for the FastAPI backend
});


// Export the axios instance
export default api;     