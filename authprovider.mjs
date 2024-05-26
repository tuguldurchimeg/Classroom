// AuthProvider.js

// Function to set user data in localStorage
export const setUserInLocalStorage = (userData) => {
  localStorage.setItem("userData", JSON.stringify(userData));
};

// Function to get user data from localStorage
export const getUserFromLocalStorage = () => {
  const userData = localStorage.getItem("userData");
  return userData ? JSON.parse(userData) : null;
};

// Function to clear user data from localStorage
export const clearUserFromLocalStorage = () => {
  localStorage.removeItem("userData");
};

// Function to authenticate user
export const authenticateUser = async (email, password) => {
  try {
    const response = await fetch(`http://localhost:3000/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    if (!response.ok) {
      // If response status is not OK (200-299), throw an error
      throw new Error(
        "Failed to authenticate. Server returned " +
          response.status +
          " " +
          response.statusText
      );
    }

    const res = await response.json();
    if (res && res.user) {
      setUserInLocalStorage(res.user); // Store user data in localStorage
      return res.user;
    } else {
      throw new Error("Empty or invalid response from server");
    }
  } catch (error) {
    console.error("Error during authentication:", error);
    throw error;
  }
};

// Function to log out user
export const logoutUser = () => {
  clearUserFromLocalStorage(); // Clear user data from localStorage
  // Additional logout logic if needed
};
