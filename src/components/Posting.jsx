import Applicant from './Applicant.jsx';
import { useNavigate } from 'react-router-dom';

const Posting = ({posting}) => {
    const applicants = posting.applicants || [];
    const navigate = useNavigate();
    
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

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 border-b border-gray-200">
                <div className="flex flex-col space-y-4">
                    <div className="flex-1">
                        <h2 className="text-2xl font-bold text-gray-900">
                            {posting.jobTitle}
                        </h2>
                        <div className="mt-2 space-y-2">
                            <div className="flex items-center text-sm text-gray-500">
                                {posting.employerEmail}
                            </div>
                            <div className="flex items-center text-sm text-gray-500">
                                Posted: {new Date(posting.datePosted).toLocaleDateString()}
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                        <button
                            type="button"
                            onClick={() => navigate(`/jobs/edit-job/${posting._id}`)}
                            className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        >
                            Edit
                        </button>

                        <button
                            type="button"
                            onClick={() => handleDelete(posting._id)}
                            className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        >
                            Delete
                        </button>
                        
                        <button
                            type="button"
                            onClick={() => navigate(`/jobs/${posting._id}`)}
                            className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        >
                            View
                        </button>
                    </div>
                </div>
            </div>

            <div className="bg-gray-50 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Applicants</h3>
                <div className="space-y-4">
                    {applicants.length > 0 ? (
                        applicants.map((applicant) => (
                            <Applicant key={applicant._id} applicant={applicant} />
                        ))
                    ) : (
                        <p className="text-gray-500">No applicants yet</p>
                    )}
                </div>
            </div>
        </div>
    )
};

export default Posting;