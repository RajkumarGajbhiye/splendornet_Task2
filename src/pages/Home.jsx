import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css"
const Home = () => {
  const [isOnline, setIsOnline] = useState(true);
  const navigate = useNavigate(); 

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("user"));
    if (!data) {
     navigate("/login")
    }
  }, []);

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <img className="imageStyle"
        src={
          isOnline
            ? "https://sendgrid.com/wp-content/uploads/2019/06/iStock-1127167754-2340x1000.jpg"
            : "no-internet.jpg"
        }
        alt="Welcome_image"
      />
      {!isOnline && <div>No internet connection</div>}
    </div>
  );
};

export default Home;
