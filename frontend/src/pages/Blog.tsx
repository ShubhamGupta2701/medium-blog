import { useParams } from "react-router-dom";
import { useBlog } from "../hooks";
import { UniqueBlog } from "../components/UniqueBlog";
import { Appbar } from "../components/Appbar";
import { Spinner } from "../components/Spinner";
import { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { UpdateBlog } from "../components/UpdateBlog";

export const Blog = () => {
    const { id } = useParams();
    const { loading, blog } = useBlog({ id: id || "" });
    const [currentUserId, setCurrentUserId] = useState("");
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const response = await axios.post(`${BACKEND_URL}/api/v1/user/me`, {
                    headers: {
                        Authorization: localStorage.getItem('token')
                    }
                });
                console.log('Current User:', response.data);
                setCurrentUserId(response.data.id);
            } catch (error) {
                console.error("Error fetching current user", error);
            }
        };

        fetchCurrentUser();
    }, []);

    useEffect(() => {
        if (blog) {
            console.log('Blog:', blog);
        }
    }, [blog, currentUserId]);

    if (loading) {
        return (
            <div className="font-serif">
                <Appbar />
                <div className="h-screen flex flex-col justify-center">
                    <div className="flex justify-center">
                        <Spinner />
                    </div>
                </div>
            </div>
        );
    }

    if (isEditing) {
        return <UpdateBlog blog={blog} />;
    }

    return (
        <div className="font-serif">
            <UniqueBlog blog={blog} />
            {blog.authorId === currentUserId && (
                <button
                    onClick={() => setIsEditing(true)}
                    className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200"
                >
                    Edit
                </button>
            )}
        </div>
    );
};
