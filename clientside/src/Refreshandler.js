import { useEffect } from 'react';

const Refreshandler = ({ setIsAuthenticated, setIsLoading }) => {
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Simulate async auth check
        const token = sessionStorage.getItem("token");
        if (token) {
          // maybe verify with backend here
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false); // 👈 Mark loading complete
      }
    };

    checkAuth();
  }, [setIsAuthenticated, setIsLoading]);

  return null;
};

export default Refreshandler;
