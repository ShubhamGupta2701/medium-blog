import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('User not logged in. Redirecting to signin page...');
            navigate('/signin');
        }
    }, [navigate]); // Only navigate should be in the dependencies array
    

    return (
        <>
            {children}
        </>
    );
};

export default ProtectedRoute;
