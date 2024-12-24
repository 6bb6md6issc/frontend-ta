import { useState, useEffect } from 'react';
import Application from '../components/Application.jsx';
import AccessDenied from '../components/AccessDenied.jsx';
import { useAuth } from '../../context/authContext';
import axios from 'axios';

const MyApplications = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { userRole, isLoggedIn } = useAuth();

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await axios.get("/my-applications");
                console.log('API Response:', response.data);
                setApplications(response.data.applications || []);
            } catch (error) {
                console.error('Error details:', error.response?.data);
                setError(error.response?.data?.message || 'An error occurred');
                setApplications([]);
            } finally {
                setLoading(false);
            }
        };

        // Only fetch if user is logged in and is a student
        if (isLoggedIn && userRole === 'student') {
            fetchJobs();
        }
    }, [isLoggedIn, userRole]);

    // Move the conditional check here, after all hooks
    if (!isLoggedIn || userRole !== 'student') {
        return <AccessDenied message="Only students can view their applications" />;
    }

    return (
        <section className="bg-blue-50 px-4 py-10">
            <div className="container mx-auto max-w-4xl">
                <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
                    My Applications
                </h2>
                {error && (
                    <div className="text-red-500 text-center mb-4">
                        {error}
                    </div>
                )}
                <div className="space-y-6">
                    {loading ? 
                        <h2>Loading...</h2> 
                        :
                        <>
                            {applications.length === 0 ? (
                                <p className="text-gray-500">No applications found</p>
                            ) : (
                                applications.map((application) => (
                                    <Application key={application._id} application={application} />
                                ))
                            )}
                        </>
                    }
                </div>
            </div>
        </section>
    );
}

export default MyApplications;