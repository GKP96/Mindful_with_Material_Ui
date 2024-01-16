import { jwtDecode } from "jwt-decode";

export const isUserLoggedIn = () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        if (decodedToken.exp * 1000 > Date.now()) {
          return true; 
        }
      } catch (error) {
        console.error(error);
      }
    }
  
    return false; 
  };
  