import React from 'react';
import AuthService from '../services/Auth/AuthService';
import { useNavigate, Navigate } from 'react-router-dom';

const EditProfileButton = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(AuthService.isLoggedIn());
  const navigate = useNavigate();

  const handleEdit = (event) => {
    navigate('/editProfile', { replace: true });
  };

  return (
    <>
      {isLoggedIn && (
        <button
          onClick={handleEdit}
          className="btn btn-sm btn-outline-primary"
        >
          Edit Profile
        </button>
      )}
    </>
  );
};

export default EditProfileButton;
