import logo from "../assets/logo.png";
import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from 'react';
import { AuthContext } from '../../context/authContext';

const Navbar = () => {
  
  const { isLoggedIn, userRole, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout(); 
    } catch (error) {
      alert('Logout failed');
      console.error('Logout error:', error);
    }
  };


  const handleClick = (e) => {
    if (isLoggedIn) {
      navigate('/jobs');
    } else {
      e.preventDefault(); // Prevents the default navigation to /jobs
      alert('Please login to continue');
      navigate('/login');}
    };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <nav className="bg-indigo-700 border-b border-indigo-500">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div
            className="flex flex-1 items-center justify-center md:items-stretch md:justify-start"
          >

            <NavLink className="flex flex-shrink-0 items-center mr-4" to="/">
              <img
                className="h-10 w-auto"
                src={ logo }
                alt="React Jobs"
              />
              <span className="hidden md:block text-white text-2xl font-bold ml-2"
                >React Jobs</span
              >
            </NavLink>

            <div className="md:ml-auto">
              <div className="flex space-x-2">
                <NavLink
                  to="/"
                  className={({ isActive }) => isActive ? "bg-black text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2" 
                  : "text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2"}
                >
                    Home
                </NavLink>
                
                <div className="text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2">
                <button
                  onClick={handleClick}
                >
                  Jobs
                </button>
                </div>

                {userRole === 'instructor' && (
                  <NavLink
                  to="/add-job"
                  className={({ isActive }) => isActive ? "bg-black text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2" 
                  : "text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2"}
                  >
                  Add Job
                  </NavLink>
                )}

                {userRole === 'instructor' && (
                  <NavLink
                    to="/my-jobs"
                    className={({ isActive }) => isActive ? "bg-black text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2" 
                    : "text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2"}
                  >
                    My Job Postings
                  </NavLink>
                )}

                {userRole === 'student' && (
                  <NavLink
                    to="/profile"
                    className={({ isActive }) => isActive ? "bg-black text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2" 
                    : "text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2"}
                  >
                    My Profile
                  </NavLink>
                )}

                <div className="text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2">
                  {isLoggedIn ? (
                    <button
                    onClick={handleLogout}
                    >Log Out</button>
                  ) : (
                    <button
                    onClick={handleLogin}
                    >Log In</button>
                  )}

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

