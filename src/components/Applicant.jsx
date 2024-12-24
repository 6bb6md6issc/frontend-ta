import { useNavigate } from 'react-router-dom';

const Applicant = ({applicant}) => {
  const navigate = useNavigate();

  return (
    <li className="flex justify-between gap-x-6 py-5 border-t border-gray-200">
        <div className="flex min-w-0 gap-x-4">
        <div className="min-w-0 flex-auto">
            <p className="text-sm/6 font-semibold text-gray-900">{applicant.name}</p>
            <p className="mt-1 truncate text-xs/5 text-gray-500">{applicant.email}</p>
        </div>
        </div>
        <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
        <div className="mt-1 flex items-center gap-x-1.5">
            <button
              onClick={() => navigate(`/view-profile/${applicant._id}`)}
              className="rounded-md bg-indigo-600 px-3 py-1 text-sm font-semibold text-white hover:bg-indigo-500"
            >
              View Profile
            </button>
        </div>
        </div>
    </li>
  )
}

export default Applicant