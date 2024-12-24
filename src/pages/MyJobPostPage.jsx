import { useState, useEffect } from 'react';
import Posting from '../components/Posting.jsx';
import AccessDenied from '../components/AccessDenied.jsx';
import { useAuth } from '../../context/authContext.jsx';
import axios from 'axios';

const MyJobPostings = () => {
    const [postings, setPostings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { userRole } = useAuth();

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await axios.get("/my-posts");
                console.log('API Response:', response.data);
                setPostings(response.data.jobs || []);
            } catch (error) {
                console.error('Error details:', error.response?.data);
                setError(error.response?.data?.message || 'An error occurred');
                setPostings([]);
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, []);

    if (userRole !== 'instructor') {
        return <AccessDenied message="Only instructors can view their job postings" />;
    }

    return (
        <>
            <section className="bg-blue-50 px-4 py-10">
                <div className="container mx-auto max-w-4xl">
                    <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
                        My Jobs Postings
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
                                {postings.length === 0 ? (
                                    <p className="text-gray-500">No job postings found</p>
                                ) : (
                                    postings.map((posting) => (
                                        <Posting key={posting._id} posting={posting} />
                                    ))
                                )}
                            </>
                        }
                    </div>
                </div>
            </section>
        </>
    )
}

export default MyJobPostings;