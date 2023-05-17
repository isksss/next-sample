// pages/login.tsx
import React from "react";
import LoginForm from "@/components/loginform"; // Adjust this import path according to your project structure

const LoginPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <LoginForm />
    </div>
  );
};

export default LoginPage;
