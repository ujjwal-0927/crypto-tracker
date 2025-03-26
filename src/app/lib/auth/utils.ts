export const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return token 
      ? { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      : {};
  };
  
  export const isAuthenticated = () => {
    return !!localStorage.getItem('token');
  };
  
  export const logout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };