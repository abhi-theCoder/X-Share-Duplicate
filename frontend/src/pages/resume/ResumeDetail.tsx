import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "../../api";

interface Resume {
  id: string;
  title: string;
  name: string;
  email: string;
  summary: string;
  createdAt: string;
}

const ResumeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [resume, setResume] = useState<Resume | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const response = await axios.get<Resume>(`/api/resumes/${id}`);
        setResume(response.data);
      } catch (error) {
        console.error("Error fetching resume:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchResume();
  }, [id]);

  if (loading) return <p className="text-center py-10">Loading resume...</p>;
  if (!resume) return <p className="text-center py-10">Resume not found.</p>;

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-4">{resume.title}</h1>
      <p className="text-gray-600 mb-2">
        Created on {new Date(resume.createdAt).toLocaleDateString()}
      </p>
      <p className="text-lg font-semibold">Name: {resume.name}</p>
      <p className="text-lg">Email: {resume.email}</p>
      <p className="mt-4 text-gray-700">{resume.summary}</p>

      <div className="mt-6">
        <Link
          to={`/resume-builder?id=${resume.id}`}
          className="px-6 py-3 bg-orange-600 text-white rounded-lg shadow hover:bg-orange-700 transition"
        >
          Edit Resume
        </Link>
      </div>
    </div>
  );
};

export default ResumeDetail;
