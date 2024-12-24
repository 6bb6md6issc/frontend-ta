import { useState, useEffect } from "react";
import { useNavigate, Navigate, useParams } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import AccessDenied from "../components/AccessDenied";
import axios from "axios";

const EditJobPage = () => {
    const [jobData, setJobData] = useState({
        jobTitle: '',
        jobDescription: '',
        employerEmail: '',
        employerPhone: ''
    });
    const { isLoggedIn, userRole, userEmail } = useContext(AuthContext);
    const navigate = useNavigate();
    const { id } = useParams();

    if (!isLoggedIn || userRole !== 'instructor') {
        return <AccessDenied message="Only instructor who added this job can edit this page" />;
    }

    useEffect(() => {
        const fetchJobData = async () => {
            try {
                const response = await axios.get(`/jobs/${id}`, {
                    withCredentials: true
                });
                
                if (response.data.success) {
                    const job = response.data.job;
                    
                    if (job.instructorEmail !== userEmail) {
                        return <AccessDenied message="Only instructor who added this job can edit this page" />;
                    }

                    setJobData({
                        jobTitle: job.jobTitle || '',
                        jobDescription: job.jobDescription || '',
                        employerEmail: job.employerEmail || '',
                        employerPhone: job.employerPhone || ''
                    });
                }
            } catch (error) {
                console.error('Error fetching job:', error);
                navigate('/jobs');
            }
        };

        if (isLoggedIn && id) {
            fetchJobData();
        }
    }, [isLoggedIn, id, userEmail, navigate]);

    const submitForm = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.put(`/edit-job/${id}`, jobData, {
                withCredentials: true
            });
            
            if (response.data.success) {
                alert("Job updated successfully");
                navigate(`/jobs`);
            }
        } catch (error) {
            console.error('Error updating job:', error.response?.data);
            alert("Failed to update job. Please try again.");
        }
    };

    return (
        <>
            <section className="bg-indigo-50">
                <div className="container m-auto max-w-2xl py-24">
                    <div
                    className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0"
                    >
                    <form onSubmit={submitForm}>
                        <h2 className="text-3xl text-center font-semibold mb-6">Add Job</h2>


                        <div className="mb-4">
                        <label 
                        htmlFor="title" 
                        className="block text-gray-700 font-bold mb-2"
                            >Job Listing Name *</label
                        >
                        <input
                            type="text"
                            id="title"
                            name="title"
                            className="border rounded w-full py-2 px-3 mb-2"
                            placeholder="eg. Beautiful Apartment In Miami"
                            required
                            value={jobData.jobTitle}
                            onChange={(e) => setJobData({ ...jobData, jobTitle: e.target.value })}
                        />
                        </div>
                        <div className="mb-4">
                        <label
                            htmlFor="description"
                            className="block text-gray-700 font-bold mb-2"
                            >Description *</label
                        >
                        <textarea
                            id="description"
                            name="description"
                            className="border rounded w-full py-2 px-3"
                            rows="4"
                            placeholder="Add any job duties, expectations, requirements, etc"
                            value={jobData.jobDescription}
                            onChange={(e) => setJobData({ ...jobData, jobDescription: e.target.value })}
                        ></textarea>
                        </div>

                        <div className="mb-4">
                        <label
                            htmlFor="contact_email"
                            className="block text-gray-700 font-bold mb-2"
                            >Contact Email *</label
                        >
                        <input
                            type="email"
                            id="contact_email"
                            name="contact_email"
                            className="border rounded w-full py-2 px-3"
                            placeholder="Email address for applicants"
                            required
                            value={jobData.employerEmail}
                            onChange={(e) => setJobData({ ...jobData, employerEmail: e.target.value })}
                        />
                        </div>

                        <div className="mb-4">
                        <label
                            htmlFor="contact_phone"
                            className="block text-gray-700 font-bold mb-2"
                            >Contact Phone (optional)
                        </label>
                        <input
                            type="tel"
                            id="contact_phone"
                            name="contact_phone"
                            className="border rounded w-full py-2 px-3"
                            placeholder="Optional phone for applicants"
                            value={jobData.employerPhone}
                            onChange={(e) => setJobData({ ...jobData, employerPhone: e.target.value })}
                        />
                        </div>

                        <div>
                        <button
                            className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Save Changes
                        </button>
                        </div>
                    </form>
                    </div>
                </div>
            </section>
        </>
  )
}

export default EditJobPage
