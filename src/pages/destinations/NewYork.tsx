
import { DestinationReviews } from "@/components/reviews/DestinationReviews";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { DESTINATION_IMAGES } from "@/constants/destinations";

const NewYork = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Redirect handling to ensure consistent URL structure
  useEffect(() => {
    // If accessed via /destinations/newyork, redirect to /destinations/new-york
    if (location.pathname === "/destinations/newyork") {
      navigate("/destinations/new-york", { replace: true });
    }
  }, [location.pathname, navigate]);


  return (
      <DestinationReviews destinationId="new-york" />
  );
};

export default NewYork;
