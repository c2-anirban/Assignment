import React from 'react';
import AuthService from '../services/Auth/AuthService';
import { useNavigate, Navigate } from 'react-router-dom';
import UserService from '../services/Auth/UserService';

const DeleteAccount = () => {
    const [isLoggedIn, setIsLoggedIn] = React.useState(AuthService.isLoggedIn());
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));
    const handleLogout = () => {
        UserService.deleteAccount(user?.id).then((res) => {
            if (res.status === 200) {
                alert("User Account Deleted")
                AuthService.logout();
                setIsLoggedIn(AuthService.isLoggedIn());
                navigate('/', { replace: true });
            }
        });
    };

    return (
        <>
            {isLoggedIn && (
                <button
                    onClick={handleLogout}
                    className="btn btn-sm btn-danger"
                >
                    Delete Account
                </button>
            )}
        </>
    );
};

export default DeleteAccount;
