
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const BackButton: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => navigate('/')}
      className="mb-6"
    >
      <ArrowLeft className="mr-2 h-4 w-4" />
      Back to Home
    </Button>
  );
};
