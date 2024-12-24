import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../context/authContext';
import { Navigate } from 'react-router-dom';
import AccessDenied from '../components/AccessDenied';

// Reuse the courses data
const courses = [
    { id: "CS150", name: "Programming 1.5" },
    { id: "CS211", name: "Programming II" },
    { id: "CS214", name: "Data Structures" },
    { id: "CS394", name: "Machine Learning" },
    { id: "CS213", name: "Systems Programming" },
];

// Read-only course grade display component
const CourseGradeDisplay = ({ courseId, courseName, grade }) => {
    return (
        <div className="sm:col-span-3">
            <div className="text-sm/6 font-medium text-gray-900">
                {courseId}: {courseName}
            </div>
            <div className="mt-2">
                <div className="block w-full rounded-md bg-gray-50 px-3 py-1.5 text-base text-gray-900">
                    {grade}
                </div>
            </div>
        </div>
    );
};

export default function ViewProfilePage() {
    const { isLoggedIn, userRole, userEmail, loading } = useContext(AuthContext);
    const { userId } = useParams(); // Get userId from URL parameter
    const [userData, setUserData] = useState({
        major: '',
        classStanding: '',
        gpa: '',
        courseGrades: Object.fromEntries(courses.map(course => [course.id, "NA"]))
    });

    // Add check for access permission
    const hasAccess = userRole === 'instructor' || userId === userEmail;

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await axios.get(`/profile/${userId}`, {
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
    }, [isLoggedIn, userId]);

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    if (!loading && !isLoggedIn) {
        return <Navigate to="/login" replace />;
    }

    // Add access control check
    if (!hasAccess) {
        return <AccessDenied message="You do not have permission to view this profile" />;
    }

    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                    <br></br>
                    <h2 className="text-base/7 font-semibold text-gray-900">Student Profile</h2>
                </div>

                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base/7 font-semibold text-gray-900">Information</h2>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                            <div className="text-sm/6 font-medium text-gray-900">Major</div>
                            <div className="mt-2">
                                <div className="block w-full rounded-md bg-gray-50 px-3 py-1.5 text-base text-gray-900">
                                    {userData.major}
                                </div>
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <div className="text-sm/6 font-medium text-gray-900">Class Standing</div>
                            <div className="mt-2">
                                <div className="block w-full rounded-md bg-gray-50 px-3 py-1.5 text-base text-gray-900">
                                    {userData.classStanding}
                                </div>
                            </div>
                        </div>

                        <div className="sm:col-span-4">
                            <div className="text-sm/6 font-medium text-gray-900">GPA</div>
                            <div className="mt-2">
                                <div className="block w-full rounded-md bg-gray-50 px-3 py-1.5 text-base text-gray-900">
                                    {userData.gpa}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base/7 font-semibold text-gray-900">Course History</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6">
                        {courses.map(course => (
                            <CourseGradeDisplay
                                key={course.id}
                                courseId={course.id}
                                courseName={course.name}
                                grade={userData.courseGrades[course.id]}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}