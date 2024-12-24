import { Route, 
  createBrowserRouter, 
  createRoutesFromElements,
  RouterProvider
} from 'react-router-dom'
import axios from 'axios';
import { AuthProvider } from '../context/authContext.jsx';
import HomePage from "./pages/HomePage";
import MainLayout from './Layouts/MainLayout';
import JobsPage from "./pages/JobsPage";
import PageNotFound from "./pages/PageNotFound";
import JobPage, { jobLoader } from "./pages/JobPage";
import AddJobPage from "./pages/AddJobPage";
import EditJobPage from './pages/EditJobPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import ProfilePage from './pages/ProfilePage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import MyJobPostings from './pages/MyJobPostPage.jsx';
import ViewProfilePage from './pages/ViewProfilePage';
import MyApplicationsPage from './pages/MyApplicationsPage';

// Add this console log to debug your API URL
console.log('Current API URL:', import.meta.env.VITE_API_URL);

const API_URL = import.meta.env.VITE_API_URL || 
  (import.meta.env.DEV ? 'http://localhost:5001/api/auth' : 'http://3.15.26.182:5001/api/auth');

// Log the final URL being used
console.log('Final API URL:', API_URL);

axios.defaults.baseURL = API_URL;
axios.defaults.withCredentials = true;

console.log('Environment:', import.meta.env.MODE);
console.log('API URL being used:', API_URL);

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />} errorElement={<div>Error loading page</div>} >
        <Route index element={<HomePage />} />
        <Route path='/jobs' element={<JobsPage />} />
        <Route 
          path='/jobs/:id' 
          element={<JobPage />} 
          loader={jobLoader}
          errorElement={<div>Error loading job</div>}
        />
        <Route path='/add-job' element={<AddJobPage />} /> 
        <Route 
          path= '/jobs/edit-job/:id' 
          element={<EditJobPage />} 
          loader={jobLoader}
          errorElement={<div>Error loading job</div>} 
        />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<SignUpPage />} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/forgotpassword' element={<ForgotPasswordPage />} />
        <Route path='/reset-password/:token' element={<ResetPasswordPage />} />
        <Route path='/my-jobs' element={<MyJobPostings />} />
        <Route path='/view-profile/:userId' element={<ViewProfilePage />} />
        <Route path='/my-applications' element={<MyApplicationsPage />} />
        <Route path= '*' element={<PageNotFound />} />
      </Route>
    )
  );

  return (
    <AuthProvider>
      <RouterProvider router={router} fallbackElement={<div>Loading...</div>} /> 
    </AuthProvider>
  );
}; 

export default App;