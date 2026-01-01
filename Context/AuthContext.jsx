import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const signIn = async (username, password) => {
        // Perform actual login logic (API calls, store token in SecureStore, etc.)
        try {
            const response = await api.post('/api/user/login', {
                username,
                password
            });

            // Check if response is successful
            if (response && response.data && response.data.token) {
                // Store token securely
                await AsyncStorage.setItem('token', response.data.token);

                Alert.alert(`Successfully logged in as ${username}`);

            } else {
                // Handle invalid response
                console.error('Invalid response:', response);
                Alert.alert('Error', 'Invalid response from server');
            }
        } catch (error) {
            console.error('Error logging in:', error);
            if (error.response) {
                // Server responded with an error status code
                Alert.alert('Error', error.response.data.message || 'Failed to login. Please try again later.');
            } else if (error.request) {
                // The request was made but no response was received
                Alert.alert('Error', 'Network Error. Please check your internet connection.');
            } else {
                // Something else happened
                Alert.alert('Error', 'An unexpected error occurred. Please try again later.');
            }
        }
        setIsLoggedIn(token);
    };

  const signOut = async () => {
    // Perform actual logout logic (clear token from SecureStore, etc.)
    setIsLoggedIn(null);
  };

  return (
    <AuthContext.Provider value={{ userToken: isLoggedIn, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);