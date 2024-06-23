// src/App.tsx
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Signup } from './pages/Signup';
import { Signin } from './pages/Signin';
import { Blog } from './pages/Blog';
import { Blogs } from './pages/Blogs';
import { Publish } from './components/Publish';
import ProtectedRoute from './components/ProtectedRoute'; // Ensure the correct path

function App() {  
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Signup />} />
                <Route path="/signin" element={<Signin />} />
                <Route path="/blog/:id" element={<ProtectedRoute><Blog /></ProtectedRoute>} />
                <Route path="/blogs" element={<ProtectedRoute><Blogs /></ProtectedRoute>} />
                <Route path="/publish" element={<ProtectedRoute><Publish /></ProtectedRoute>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
