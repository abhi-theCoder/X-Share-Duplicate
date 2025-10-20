import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../api";

interface Resume {
  id: string;
  title: string;
  createdAt: string;
}

const ResumeList: React.FC = () => {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const response = await axios.get<Resume[]>("/api/resumes");
        setResumes(response.data);
      } catch (error) {
        console.error("Error fetching resumes:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchResumes();
  }, []);

  if (loading) {
    return <p className="text-center py-10">Loading resumes...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Your Resumes</h1>
      <div className="space-y-4">
        {resumes.map((resume) => (
          <div
            key={resume.id}
            className="p-4 border rounded-xl shadow-sm bg-white hover:shadow-md transition"
          >
            <h2 className="text-xl font-semibold">{resume.title}</h2>
            <p className="text-gray-500 text-sm">
              Created: {new Date(resume.createdAt).toLocaleDateString()}
            </p>
            <div className="mt-2 flex gap-4">
              <Link
                to={`/resume/${resume.id}`}
                className="text-green-600 font-medium hover:underline"
              >
                View
              </Link>
              <Link
                to={`/resume-builder?id=${resume.id}`}
                className="text-orange-600 font-medium hover:underline"
              >
                Edit
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6">
        <Link
          to="/resume-builder"
          className="px-6 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
        >
          Create New Resume
        </Link>
      </div>
    </div>
  );
};

export default ResumeList;
