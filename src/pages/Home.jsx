import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css"
const Home = () => {
  const [isOnline, setIsOnline] = useState(window.navigator.onLine);
  const navigate = useNavigate(); 

  useEffect(() => {
    const handleOnlineStatusChange = () => {
      setIsOnline(window.navigator.onLine);
    };

    window.addEventListener('online', handleOnlineStatusChange);
    window.addEventListener('offline', handleOnlineStatusChange);


    return () => {
      window.removeEventListener('online', handleOnlineStatusChange);
      window.removeEventListener('offline', handleOnlineStatusChange)
    };
  }, []);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("user"));
    if (!data) {
     navigate("/")
    }
  }, []);

  return (
    <div>
    {isOnline ? (
      <div>
        
        <img  className="imageStyle" src="https://sendgrid.com/wp-content/uploads/2019/06/iStock-1127167754-2340x1000.jpg" alt="Welcome" />
      </div>
    ) : (
      <div>
        <h1>No Internet Connection</h1>
        <img src="https://sendgrid.com/wp-content/uploads/2019/06/iStock-1127167754-2340x1000.jpg" alt="No Internet" />
      </div>
    )}
  </div>
  );
};

export default Home;

