import React, { useState } from 'react';

// Define the shape of a job listing using a TypeScript interface
interface JobListing {
    id: string;
    title: string;
    company: string;
    location: string;
    description: string;
    salary: string;
}

// Mock data for the job listings
const mockJobListings: JobListing[] = [
    {
        id: 'job-1',
        title: 'Software Engineer',
        company: 'Innovatech Solutions',
        location: 'San Francisco, CA',
        description: 'We are seeking a talented software engineer to join our team. You will be responsible for developing and maintaining our core product.',
        salary: '$120,000 - $150,000',
    },
    {
        id: 'job-2',
        title: 'UX/UI Designer',
        company: 'Creative Labs Inc.',
        location: 'New York, NY',
        description: 'Join our design team to create beautiful and intuitive user interfaces for our next-generation products. Experience with Figma is a plus.',
        salary: '$90,000 - $110,000',
    },
    {
        id: 'job-3',
        title: 'Data Scientist',
        company: 'DataStream Analytics',
        location: 'Austin, TX',
        description: 'We are looking for a data scientist to analyze large datasets and provide actionable insights to drive business decisions. Strong Python and SQL skills required.',
        salary: '$130,000 - $160,000',
    },
    {
        id: 'job-4',
        title: 'Product Manager',
        company: 'Global Tech Corp',
        location: 'Seattle, WA',
        description: 'Lead the development of new features and products from conception to launch. You will work closely with engineering and design teams.',
        salary: '$140,000 - $180,000',
    },
    {
        id: 'job-5',
        title: 'Front-End Developer',
        company: 'WebSphere Innovations',
        location: 'Remote',
        description: 'Passionate about building responsive and high-performance web JobPortallications? Join our fully remote team and help us build the future of the web.',
        salary: '$110,000 - $135,000',
    },
    {
        id: 'job-6',
        title: 'DevOps Engineer',
        company: 'CloudWorks Solutions',
        location: 'Chicago, IL',
        description: 'Maintain and scale our cloud infrastructure. Experience with AWS, Docker, and Kubernetes is highly preferred.',
        salary: '$135,000 - $170,000',
    },
];

// Define the main JobPortal component
const JobPortal = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredJobs, setFilteredJobs] = useState<JobListing[]>(mockJobListings);

    // Handle search input changes
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value.toLowerCase();
        setSearchTerm(value);
        const results = mockJobListings.filter(job =>
            job.title.toLowerCase().includes(value) ||
            job.company.toLowerCase().includes(value) ||
            job.location.toLowerCase().includes(value)
        );
        setFilteredJobs(results);
    };

    return (
        <div className="p-6 md:p-10 bg-[#f7f9fc] min-h-screen font-sans">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <header className="text-center mb-8 md:mb-12">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800">Job Portal</h1>
                    <p className="mt-2 text-lg text-slate-500">Find your next career opportunity</p>
                </header>

                {/* Search Bar */}
                <div className="mb-8 relative rounded-full shadow-lg max-w-2xl mx-auto">
                    <input
                        type="text"
                        placeholder="Search for jobs by title, company, or location..."
                        className="w-full py-4 px-6 pr-16 text-lg rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                    <div className="absolute inset-y-0 right-0 pr-6 flex items-center text-slate-400">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search">
                            <circle cx="11" cy="11" r="8" />
                            <path d="m21 21-4.3-4.3" />
                        </svg>
                    </div>
                </div>

                {/* Job Listings Grid */}
                <main>
                    {filteredJobs.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredJobs.map(job => (
                                <div key={job.id} className="bg-white p-6 rounded-3xl shadow-lg border border-gray-200 transition-transform duration-200 transform hover:scale-[1.02] cursor-pointer">
                                    <h2 className="text-2xl font-bold text-slate-800 mb-2">{job.title}</h2>
                                    <p className="text-lg text-slate-600 mb-1">{job.company}</p>
                                    <p className="text-md text-slate-500 mb-4">{job.location}</p>
                                    <p className="text-sm text-slate-700 mb-4">{job.description}</p>
                                    <div className="mt-auto pt-4 border-t border-gray-200">
                                        <p className="text-sm font-semibold text-blue-600">{job.salary}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center text-slate-500 mt-10">
                            <p className="text-xl">No job listings match your search.</p>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default JobPortal;
