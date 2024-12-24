import axios from 'axios';
import { useState, useEffect } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../context/authContext';
import AccessDenied from '../components/AccessDenied';

// Add this courses data (you might want to move it to a separate file later)
const courses = [
    { id: "CS150", name: "Programming 1.5" },
    { id: "CS211", name: "Programming II" },
    { id: "CS214", name: "Data Structures" },
    { id: "CS394", name: "Machine Learning" },
    { id: "CS213", name: "Systems Programming" },
    // Add more courses as needed
];

// Course checkbox component
const CourseGrade = ({ courseId, courseName, value, onChange }) => {
    return (
        <div className="sm:col-span-3">
            <label htmlFor={courseId} className="block text-sm/6 font-medium text-gray-900">
                {courseId}: {courseName}
            </label>
            <div className="mt-2">
                <select
                    id={courseId}
                    name={courseId}
                    value={value}
                    onChange={(e) => onChange(courseId, e.target.value)}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                >
                    <option value="NA">haven't taken</option>
                    <option value="A+">A+</option>
                    <option value="A">A</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B">B</option>
                    <option value="B-">B-</option>
                    <option value="C+">C+</option>
                    <option value="C">C</option>
                    <option value="C-">C-</option>
                </select>
            </div>
        </div>
    );
};

export default function ProfilePage() {
    const { isLoggedIn, userRole, loading } = useContext(AuthContext);
    const [userData, setUserData] = useState({
        major: '',
        classStanding: '',
        gpa: '',
        courseGrades: Object.fromEntries(courses.map(course => [course.id, "NA"]))
    });

    // Add useEffect to fetch user profile data when component mounts
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await axios.get('/profile', {
                    withCredentials: true
                });
                
                if (response.data.success) {
                    const { major, classStanding, gpa, coursework } = response.data.user;
                    setUserData({
                        major: major || '',
                        classStanding: classStanding || '',
                        gpa: gpa || '',
                        courseGrades: coursework || Object.fromEntries(courses.map(course => [course.id, "NA"]))
                    });
                }
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };

        if (isLoggedIn) {
            fetchUserProfile();
        }
    }, [isLoggedIn]);

    console.log('ProfilePage render - Loading:', loading, 'IsLoggedIn:', isLoggedIn, 'Role:', userRole);

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    if (!loading && (!isLoggedIn || userRole !== 'student')) {
        return <AccessDenied message="Only students can access their profile page" />;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const formData = {
                major: e.target.major.value,
                classStanding: e.target.classStanding.value,
                gpa: parseFloat(e.target.gpa.value),
                courseGrades: {}
            };

            courses.forEach(course => {
                formData.courseGrades[course.id] = e.target[course.id].value;
            });

            const response = await axios.put('/update-profile', formData, {
                withCredentials: true,
            });

            if (response.data.success) {
                // Update local state with new values
                setUserData({
                    ...userData,
                    ...formData
                });
                alert('Profile updated successfully!');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Failed to update profile: ' + (error.response?.data?.message || error.message));
        }
    };

    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <form onSubmit={handleSubmit}>
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <br></br>
                        <h2 className="text-base/7 font-semibold text-gray-900">Profile</h2>
                    </div>

                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base/7 font-semibold text-gray-900">Information</h2>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <label htmlFor="major" className="block text-sm/6 font-medium text-gray-900">
                                    Major
                                </label>
                                <div className="mt-2">
                                    <select
                                        id="major"
                                        name="major"
                                        value={userData.major}
                                        onChange={(e) => setUserData({...userData, major: e.target.value})}
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    >
                                        <option value="">Select a Major</option>
                                        <option value="Computer Science">Computer Science</option>
                                        <option value="Computer Engineering">Computer Engineering</option>
                                        <option value="Electrical Engineering">Electrical Engineering</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="classStanding" className="block text-sm/6 font-medium text-gray-900">
                                    Class 
                                </label>
                                <div className="mt-2">
                                    <select
                                        id="classStanding"
                                        name="classStanding"
                                        value={userData.classStanding}
                                        onChange={(e) => setUserData({...userData, classStanding: e.target.value})}
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    >
                                        <option value="Freshman">Freshman</option>
                                        <option value="Sophomore">Sophomore</option>
                                        <option value="Junior">Junior</option>
                                        <option value="Senior">Senior</option>
                                    </select>
                                </div>
                            </div>

                            <div className="sm:col-span-4">
                                <label htmlFor="gpa" className="block text-sm/6 font-medium text-gray-900">
                                    GPA
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="gpa"
                                        name="gpa"
                                        type="number"
                                        value={userData.gpa}
                                        onChange={(e) => setUserData({...userData, gpa: e.target.value})}
                                        step="0.01"
                                        autoComplete="gpa"
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    />
                                </div>
                            </div>
                        </div>

                        
                    </div>
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base/7 font-semibold text-gray-900">Course History</h2>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6">
                                    {courses.map(course => (
                                        <CourseGrade
                                            key={course.id}
                                            courseId={course.id}
                                            courseName={course.name}
                                            value={userData.courseGrades[course.id]}
                                            onChange={(courseId, grade) => setUserData({
                                                ...userData,
                                                courseGrades: {
                                                    ...userData.courseGrades,
                                                    [courseId]: grade
                                                }
                                            })}
                                        />
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button type="button" className="text-sm/6 font-semibold text-gray-900">
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
}
