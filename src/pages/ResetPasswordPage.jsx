import axios from 'axios';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ResetPasswordPage = () => {

  const navigate = useNavigate();
  const { token } = useParams();
  const resetPassword = async (e) => {
    e.preventDefault();

    try {
        const response = await axios.post(`/reset-password/${token}`, {
        password,
      });
      if (response.data.error){
        toast.error(response.data.error);
      } else{
        setPassword('');
        setPasswordConfirm('');
        toast.success('Password Reset Successfully')
      }
    } catch(error){
      console.log(error.message)
      toast.error('Reset Password Failed. Please try again.');
    }
  }

  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  return (
        <>
          <ToastContainer position="top-center" />
          <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                Reset Password
              </h2>
            </div>
    
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form onSubmit= {resetPassword} action="#" method="POST" className="space-y-6">
                <div>
                  <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                    New Password
                  </label>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      required
                      autoComplete="password"
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      value={password} 
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                <br />
                  <label htmlFor="passwordConfirm" className="block text-sm/6 font-medium text-gray-900">
                    Confirm Password
                  </label>
                  <div className="mt-2">
                    <input
                      id="passwordConfirm"
                      name="passwordConfirm"
                      type="password"
                      required
                      autoComplete="passwordConfirm"
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      value={passwordConfirm} 
                      onChange={(e) => setPasswordConfirm(e.target.value)}
                    />
                  </div>
                </div>

    
                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Reset Password
                  </button>
                </div>
              </form>

            </div>
          </div>
        </>
      )
}

export default ResetPasswordPage