import { useState, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import AccessDenied from "../components/AccessDenied";
import axios from "axios";
const AddJobPage = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [contactEmail, setContactEmail] = useState('');
    const [contactPhone, setContactPhone] = useState('');
    const { isLoggedIn, userRole, userEmail } = useContext(AuthContext);
    const navigate = useNavigate();

    if (!isLoggedIn || userRole !== 'instructor') {
        return <AccessDenied message="Log in as an instructor to access this page" />;
    }

    const submitForm = async (e) => {
        e.preventDefault();

        const newJob = {
            instructorEmail: userEmail,
            jobTitle: title,
            jobDescription: description,
            employerEmail: contactEmail,
            employerPhone: contactPhone
        };
        
        try {
            const response = await axios.post('/add-job', newJob);
            if (response.status === 200) {
                console.log(response.data);
                alert("Job added successfully");
                navigate(`/jobs`);
            }
        } catch (error) {
            console.error('Error adding job:', error.response?.data);
            alert("Failed to add job. Please try again.");
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
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
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
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
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
                            value={contactEmail}
                            onChange={(e) => setContactEmail(e.target.value)}
                        />
                        </div>

                        <div className="mb-4">
                        <label
                            htmlFor="contact_phone"
                            className="block text-gray-700 font-bold mb-2"
                            >Contact Phone (optional)</label
                        >
                        <input
                            type="tel"
                            id="contact_phone"
                            name="contact_phone"
                            className="border rounded w-full py-2 px-3"
                            placeholder="Optional phone for applicants"
                            value={contactPhone}
                            onChange={(e) => setContactPhone(e.target.value)}
                        />
                        </div>

                        <div>
                        <button
                            className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Add Job
                        </button>
                        </div>
                    </form>
                    </div>
                </div>
            </section>
        </>
  )
}

export default AddJobPage
