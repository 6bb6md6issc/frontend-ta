import { useState, useEffect } from 'react';
import JobListing from './JobListing.jsx';
import axios from 'axios';

const JobListings = ({isHome = false}) => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const apiUrl = isHome ? "/jobs?_limit=3" : "/jobs";
    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await axios.get(apiUrl);
                console.log('API Response:', response.data);
                setJobs(response.data.jobs || []);
            } catch (error) {
                console.error('Error fetching jobs:', error);
                setJobs([]);
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, [apiUrl]);


    return (
        <>
            <section className="bg-blue-50 px-4 py-10">
                <div className="container-xl lg:container m-auto">
                    <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
                        {isHome ? "Recent Jobs" : "Browse Jobs"}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {loading ? 
                            <h2>Loading...</h2> 
                            :
                            <>
                                {jobs.map((job) => ( <JobListing key={job._id} job={job} /> ))}
                            </>
                        }
                    </div>
                </div>
            </section>

        </>
  )
}

export default JobListings;