import { useParams, useLoaderData, useNavigate } from "react-router-dom"
import { Link } from "react-router-dom";
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useAuth } from '../../context/authContext'; 
import AccessDenied from '../components/AccessDenied';

const JobPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [jobData, setJobData] = useState(null);
  const job = useLoaderData();
  const { id } = useParams();
  const navigate = useNavigate();
  const { userEmail, userRole, isLoggedIn } = useAuth();
  const [hasApplied, setHasApplied] = useState(false);
  
  useEffect(() => {
    if (job) {
      setJobData(job);
      const checkIfApplied = async () => {
        try {
          const response = await axios.get(`/jobs/${id}/check-application`);
          setHasApplied(response.data.hasApplied);
        } catch (error) {
          console.error('Error checking application status:', error);
        }
      };
      checkIfApplied();
      setIsLoading(false);
    }
  }, [job, id]);

  const handleDelete = async (jobId) => {
    const confirm = window.confirm("Are you sure to delete this job?");
    if (!confirm) return;
    
    try {
      const response = await axios.delete(`/delete-job/${jobId}`);
      if (response.data.success) {
        alert('Job deleted successfully');
        navigate("/jobs");
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Error deleting job');
    }
  };

  const handleApply = async () => {
    try {
      const response = await axios.post(`/jobs/${id}/apply`);
      if (response.data.success) {
        setHasApplied(true);
        alert('Successfully applied for job!');
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Error applying for job');
    }
  };

  if (!isLoggedIn) {
    return <AccessDenied message="Please log in to view job details" />;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!jobData) {
    return <div>Job not found</div>;
  }

  console.log('Job Data:', jobData);

  return(
    <>
      <section>
        <div className="container m-auto py-6 px-6">
          <Link
            to="/jobs"
            className="text-indigo-500 hover:text-indigo-600 flex items-center"
          >
            Back to Job Listings
          </Link>
        </div>
      </section>

      <section className="bg-indigo-50">
        <div className="container m-auto py-10 px-6">
          <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
            <main>
              <div className="bg-white p-6 rounded-lg shadow-md text-center md:text-left">
                <h1 className="text-3xl font-bold mb-4">
                  {jobData.jobTitle}
                </h1>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <h3 className="text-indigo-800 text-lg font-bold mb-6">
                  Job Description
                </h3>
                <p className="mb-4">
                  {jobData.jobDescription}
                </p>
              </div>
            </main>

            <aside>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-6">Contact Information</h3>
                <hr className="my-4" />
                <h3 className="text-xl">Contact Email:</h3>
                <p className="my-2 bg-indigo-100 p-2 font-bold">
                  {jobData.employerEmail}
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <h3 className="text-xl font-bold mb-6">Manage Job</h3>
                {userRole === 'instructor' && userEmail === jobData.employerEmail ? (
                  <Link
                    to={`/jobs/edit-job/${jobData._id}`}
                    className="bg-indigo-500 hover:bg-indigo-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
                  >
                    Edit Job
                  </Link>
                ) : (
                  <button 
                    onClick={() => alert("Only instructor posting this job can edit page")}
                    className="bg-indigo-500 hover:bg-indigo-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
                  >
                    Edit Job
                  </button>
                )}
                <button 
                  onClick={() => handleDelete(jobData._id)}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
                >
                  Delete Job
                </button>

                <button 
                  onClick={handleApply}
                  disabled={hasApplied}
                  className={`${
                    hasApplied 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-indigo-500 hover:bg-indigo-600'
                  } text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block`}
                >
                  {hasApplied ? 'Applied' : 'Apply for Job'}
                </button>

              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
};

const jobLoader = async ({ params }) => {
  try {
      const response = await axios.get(`/jobs/${params.id}`);
      return response.data.job;
  } catch (error) {
      console.error('Error loading job:', error);
      throw error;
  }
};


export { JobPage as default, jobLoader};