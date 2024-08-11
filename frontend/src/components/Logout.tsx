import { useNavigate } from 'react-router-dom';

export const Logout = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/signin');
    };

    return (
        <button
            onClick={handleLogout}
            className="p-2 mx-4 border-black border-2 rounded-full font-extrabold"
        >
            Logout
        </button>
    );
};

export default Logout;
