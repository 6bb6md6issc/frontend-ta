import { useNavigate } from 'react-router-dom';

const Application = ({application}) => {
    const navigate = useNavigate();
    
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 border-b border-gray-200">
                <div className="flex flex-col space-y-4">
                    <div className="flex-1">
                        <h2 className="text-2xl font-bold text-gray-900">
                            {application.jobTitle}
                        </h2>
                        <div className="mt-2 space-y-2">
                            <div className="flex items-center text-sm text-gray-500">
                                {application.employerEmail}
                            </div>
                            <div className="flex items-center text-sm text-gray-500">
                                Posted: {new Date(application.datePosted).toLocaleDateString()}
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                        <button
                            type="button"
                            onClick={() => navigate(`/jobs/${application._id}`)}
                            className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        >
                            View Job Details
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Application;