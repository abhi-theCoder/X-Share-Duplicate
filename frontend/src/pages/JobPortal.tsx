// import React, { useState } from 'react';

// // Define the shape of a job listing using a TypeScript interface
// interface JobListing {
//     id: string;
//     title: string;
//     company: string;
//     location: string;
//     description: string;
//     salary: string;
// }

// // Mock data for the job listings
// const mockJobListings: JobListing[] = [
//     {
//         id: 'job-1',
//         title: 'Software Engineer',
//         company: 'Innovatech Solutions',
//         location: 'San Francisco, CA',
//         description: 'We are seeking a talented software engineer to join our team. You will be responsible for developing and maintaining our core product.',
//         salary: '$120,000 - $150,000',
//     },
//     {
//         id: 'job-2',
//         title: 'UX/UI Designer',
//         company: 'Creative Labs Inc.',
//         location: 'New York, NY',
//         description: 'Join our design team to create beautiful and intuitive user interfaces for our next-generation products. Experience with Figma is a plus.',
//         salary: '$90,000 - $110,000',
//     },
//     {
//         id: 'job-3',
//         title: 'Data Scientist',
//         company: 'DataStream Analytics',
//         location: 'Austin, TX',
//         description: 'We are looking for a data scientist to analyze large datasets and provide actionable insights to drive business decisions. Strong Python and SQL skills required.',
//         salary: '$130,000 - $160,000',
//     },
//     {
//         id: 'job-4',
//         title: 'Product Manager',
//         company: 'Global Tech Corp',
//         location: 'Seattle, WA',
//         description: 'Lead the development of new features and products from conception to launch. You will work closely with engineering and design teams.',
//         salary: '$140,000 - $180,000',
//     },
//     {
//         id: 'job-5',
//         title: 'Front-End Developer',
//         company: 'WebSphere Innovations',
//         location: 'Remote',
//         description: 'Passionate about building responsive and high-performance web JobPortallications? Join our fully remote team and help us build the future of the web.',
//         salary: '$110,000 - $135,000',
//     },
//     {
//         id: 'job-6',
//         title: 'DevOps Engineer',
//         company: 'CloudWorks Solutions',
//         location: 'Chicago, IL',
//         description: 'Maintain and scale our cloud infrastructure. Experience with AWS, Docker, and Kubernetes is highly preferred.',
//         salary: '$135,000 - $170,000',
//     },
// ];

// // Define the main JobPortal component
// const JobPortal = () => {
//     const [searchTerm, setSearchTerm] = useState('');
//     const [filteredJobs, setFilteredJobs] = useState<JobListing[]>(mockJobListings);

//     // Handle search input changes
//     const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
//         const value = event.target.value.toLowerCase();
//         setSearchTerm(value);
//         const results = mockJobListings.filter(job =>
//             job.title.toLowerCase().includes(value) ||
//             job.company.toLowerCase().includes(value) ||
//             job.location.toLowerCase().includes(value)
//         );
//         setFilteredJobs(results);
//     };

//     return (
//         <div className="p-6 md:p-10 bg-[#f7f9fc] min-h-screen font-sans">
//             <div className="max-w-7xl mx-auto">
//                 {/* Header Section */}
//                 <header className="text-center mb-8 md:mb-12">
//                     <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800">Job Portal</h1>
//                     <p className="mt-2 text-lg text-slate-500">Find your next career opportunity</p>
//                 </header>

//                 {/* Search Bar */}
//                 <div className="mb-8 relative rounded-full shadow-lg max-w-2xl mx-auto">
//                     <input
//                         type="text"
//                         placeholder="Search for jobs by title, company, or location..."
//                         className="w-full py-4 px-6 pr-16 text-lg rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
//                         value={searchTerm}
//                         onChange={handleSearch}
//                     />
//                     <div className="absolute inset-y-0 right-0 pr-6 flex items-center text-slate-400">
//                         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search">
//                             <circle cx="11" cy="11" r="8" />
//                             <path d="m21 21-4.3-4.3" />
//                         </svg>
//                     </div>
//                 </div>

//                 {/* Job Listings Grid */}
//                 <main>
//                     {filteredJobs.length > 0 ? (
//                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                             {filteredJobs.map(job => (
//                                 <div key={job.id} className="bg-white p-6 rounded-3xl shadow-lg border border-gray-200 transition-transform duration-200 transform hover:scale-[1.02] cursor-pointer">
//                                     <h2 className="text-2xl font-bold text-slate-800 mb-2">{job.title}</h2>
//                                     <p className="text-lg text-slate-600 mb-1">{job.company}</p>
//                                     <p className="text-md text-slate-500 mb-4">{job.location}</p>
//                                     <p className="text-sm text-slate-700 mb-4">{job.description}</p>
//                                     <div className="mt-auto pt-4 border-t border-gray-200">
//                                         <p className="text-sm font-semibold text-blue-600">{job.salary}</p>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     ) : (
//                         <div className="text-center text-slate-500 mt-10">
//                             <p className="text-xl">No job listings match your search.</p>
//                         </div>
//                     )}
//                 </main>
//             </div>
//         </div>
//     );
// };

// export default JobPortal;





// import React, { useState } from 'react';

// // --- Helper component for icons to keep the main component cleaner ---
// const IconMapPin = () => (
//     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-map-pin text-zinc-500">
//         <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
//         <circle cx="12" cy="10" r="3" />
//     </svg>
// );

// const IconBriefcase = () => (
//     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-briefcase text-zinc-500">
//         <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
//         <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
//     </svg>
// );


// // Define the shape of a job listing using a TypeScript interface
// interface JobListing {
//     id: string;
//     title: string;
//     company: string;
//     location:string;
//     description: string;
//     salary: string;
// }

// // Mock data for the job listings
// const mockJobListings: JobListing[] = [
//     {
//         id: 'job-1',
//         title: 'Software Engineer',
//         company: 'Innovatech Solutions',
//         location: 'San Francisco, CA',
//         description: 'Developing and maintaining our core product, creating scalable solutions, and collaborating with cross-functional teams to deliver high-quality software.',
//         salary: '$120,000 - $150,000',
//     },
//     {
//         id: 'job-2',
//         title: 'UX/UI Designer',
//         company: 'Creative Labs Inc.',
//         location: 'New York, NY',
//         description: 'Join our design team to create beautiful and intuitive user interfaces for our next-generation products. Experience with Figma is a plus.',
//         salary: '$90,000 - $110,000',
//     },
//     {
//         id: 'job-3',
//         title: 'Data Scientist',
//         company: 'DataStream Analytics',
//         location: 'Austin, TX',
//         description: 'Analyze large datasets and provide actionable insights to drive business decisions. Strong Python and SQL skills required.',
//         salary: '$130,000 - $160,000',
//     },
//     {
//         id: 'job-4',
//         title: 'Product Manager',
//         company: 'Global Tech Corp',
//         location: 'Seattle, WA',
//         description: 'Lead the development of new features and products from conception to launch. You will work closely with engineering and design teams.',
//         salary: '$140,000 - $180,000',
//     },
//     {
//         id: 'job-5',
//         title: 'Front-End Developer',
//         company: 'WebSphere Innovations',
//         location: 'Remote',
//         description: 'Passionate about building responsive and high-performance web applications? Join our fully remote team.',
//         salary: '$110,000 - $135,000',
//     },
//     {
//         id: 'job-6',
//         title: 'DevOps Engineer',
//         company: 'CloudWorks Solutions',
//         location: 'Chicago, IL',
//         description: 'Maintain and scale our cloud infrastructure. Experience with AWS, Docker, and Kubernetes is highly preferred.',
//         salary: '$135,000 - $170,000',
//     },
// ];

// // Define the main JobPortal component
// const JobPortal = () => {
//     const [searchTerm, setSearchTerm] = useState('');
//     const [filteredJobs, setFilteredJobs] = useState<JobListing[]>(mockJobListings);

//     // Handle search input changes
//     const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
//         const value = event.target.value.toLowerCase();
//         setSearchTerm(value);
//         const results = mockJobListings.filter(job =>
//             job.title.toLowerCase().includes(value) ||
//             job.company.toLowerCase().includes(value) ||
//             job.location.toLowerCase().includes(value)
//         );
//         setFilteredJobs(results);
//     };

//     return (
//         <div className="relative p-6 md:p-10 bg-[#d1e1e9] min-h-screen font-sans overflow-hidden">
//             {/* Background decorative shapes */}
//             <div className="absolute top-0 -left-4 w-72 h-72 bg-[#32a5d4]/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
//             <div className="absolute top-0 -right-4 w-72 h-72 bg-[#32a5d4]/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
//             <div className="absolute -bottom-8 left-20 w-72 h-72 bg-[#32a5d4]/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

//             <div className="relative max-w-7xl mx-auto z-10">
//                 {/* Header Section */}
//                 <header className="text-center mb-10 md:mb-16">
//                     <h1 className="text-4xl md:text-5xl font-extrabold text-zinc-900">
//                         Find Your Next <span className="text-[#32a5d4]">Opportunity</span>
//                     </h1>
//                     <p className="mt-3 text-lg text-zinc-600">The best jobs, all in one place.</p>
//                 </header>

//                 {/* Search Bar */}
//                 <div className="mb-12 relative max-w-2xl mx-auto">
//                     <input
//                         type="text"
//                         placeholder="Search by title, company, or location..."
//                         className="w-full py-4 px-6 pr-16 text-base bg-[#fcfcfc]/60 backdrop-blur-sm rounded-full border border-white/30 shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#32a5d4] transition-all duration-300 placeholder:text-zinc-500 text-black"
//                         value={searchTerm}
//                         onChange={handleSearch}
//                     />
//                      <div className="absolute inset-y-0 right-0 pr-6 flex items-center text-zinc-500 pointer-events-none">
//                         <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
//                     </div>
//                 </div>

//                 {/* Job Listings Grid */}
//                 <main>
//                     {filteredJobs.length > 0 ? (
//                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//                             {filteredJobs.map(job => (
//                                 // ## Advanced Glassmorphism Job Card ##
//                                 <div
//                                     key={job.id}
//                                     className="bg-[#fcfcfc]/50 backdrop-blur-xl p-6 rounded-2xl shadow-lg border border-white/20 flex flex-col transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#32a5d4]/20"
//                                 >
//                                     <div className="flex items-center gap-4 mb-5">
//                                         <div className="w-12 h-12 bg-[#32a5d4]/20 border border-white/50 rounded-xl flex-shrink-0 flex items-center justify-center text-[#32a5d4] text-xl font-bold">
//                                             {job.company.charAt(0)}
//                                         </div>
//                                         <div>
//                                             <h2 className="text-lg font-bold text-zinc-900">{job.title}</h2>
//                                             <p className="text-sm text-zinc-600">{job.company}</p>
//                                         </div>
//                                     </div>
                                    
//                                     <p className="text-sm text-zinc-700 mb-5 flex-grow line-clamp-3">
//                                         {job.description}
//                                     </p>
                                    
//                                     <div className="flex flex-wrap gap-2 text-xs text-zinc-800 my-4">
//                                         <div className="flex items-center gap-2 bg-[#d1e1e9]/50 rounded-full py-1 px-3">
//                                             <IconMapPin />
//                                             <span>{job.location}</span>
//                                         </div>
//                                         <div className="flex items-center gap-2 bg-[#d1e1e9]/50 rounded-full py-1 px-3">
//                                             <IconBriefcase />
//                                             <span>{job.salary}</span>
//                                         </div>
//                                     </div>

//                                     <div className="mt-auto flex justify-end items-center pt-4 border-t border-white/30">
//                                         <button className="bg-[#32a5d4] text-white font-bold py-2.5 px-6 rounded-lg hover:bg-black hover:shadow-lg hover:shadow-[#32a5d4]/40 transition-all duration-300 transform hover:scale-105">
//                                             Apply Now
//                                         </button>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     ) : (
//                         <div className="text-center py-16 bg-[#fcfcfc]/30 backdrop-blur-sm rounded-2xl">
//                             <h3 className="text-2xl font-semibold text-zinc-800">No jobs found</h3>
//                             <p className="text-zinc-600 mt-2">Try adjusting your search terms to find what you're looking for.</p>
//                         </div>
//                     )}
//                 </main>
//             </div>
//         </div>
//     );
// };

// export default JobPortal;





import React, { useState, useMemo } from 'react';

// --- Icon Components (for clarity) ---
const Icon = ({ path, className = "w-4 h-4" }: { path: string; className?: string; }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        {path}
    </svg>
);

const ICONS = {
    MapPin: <Icon path={<><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></>} className="w-5 h-5 text-zinc-500" />,
    Briefcase: <Icon path={<><rect width="20" height="14" x="2" y="7" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></>} className="w-5 h-5 text-zinc-500" />,
    DollarSign: <Icon path={<><line x1="12" x2="12" y1="2" y2="22" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></>} className="w-5 h-5 text-zinc-500" />,
    Star: <Icon path={<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />} className="w-4 h-4 text-amber-500 fill-current" />,
    Search: <Icon path={<><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></>} className="w-5 h-5" />,
    FilterX: <Icon path={<><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" /></>} className="w-4 h-4 mr-1" />,
};

// --- Type Definitions ---
type JobType = 'Full-time' | 'Internship';
type JobMode = 'On-site' | 'Remote' | 'Hybrid';

interface JobListing {
    id: string;
    title: string;
    company: string;
    location: string;
    type: JobType;
    mode: JobMode;
    experienceYears: number;
    salaryLPA: number;
    rating: number;
    description: string;
}

// --- Expanded Mock Data ---
const mockJobListings: JobListing[] = [
    { id: 'job-1', title: 'Software Engineer', company: 'Google', location: 'Bangalore', type: 'Full-time', mode: 'Hybrid', experienceYears: 1, salaryLPA: 20, rating: 4.8, description: 'Design, develop, test, deploy, maintain and improve software.' },
    { id: 'job-2', title: 'Product Design Intern', company: 'Microsoft', location: 'Hyderabad', type: 'Internship', mode: 'On-site', experienceYears: 0, salaryLPA: 12, rating: 4.7, description: 'Collaborate with a team of designers to create user experiences.' },
    { id: 'job-3', title: 'Senior Data Scientist', company: 'Amazon', location: 'Remote', type: 'Full-time', mode: 'Remote', experienceYears: 5, salaryLPA: 45, rating: 4.5, description: 'Utilize statistical models and machine learning algorithms.' },
    { id: 'job-4', title: 'DevOps Engineer', company: 'Netflix', location: 'Mumbai', type: 'Full-time', mode: 'On-site', experienceYears: 3, salaryLPA: 30, rating: 4.6, description: 'Build and maintain our cloud infrastructure and pipelines.' },
    { id: 'job-5', title: 'Frontend Developer', company: 'Swiggy', location: 'Bangalore', type: 'Full-time', mode: 'Hybrid', experienceYears: 2, salaryLPA: 22, rating: 4.4, description: 'Create responsive UIs using React and TypeScript.' },
    { id: 'job-6', title: 'Marketing Intern', company: 'Zomato', location: 'Gurgaon', type: 'Internship', mode: 'On-site', experienceYears: 0, salaryLPA: 8, rating: 4.3, description: 'Assist marketing team in campaigns and data analysis.' },
    { id: 'job-7', title: 'Lead Backend Engineer', company: 'Atlassian', location: 'Remote', type: 'Full-time', mode: 'Remote', experienceYears: 8, salaryLPA: 60, rating: 4.9, description: 'Lead a team of engineers to build scalable APIs.' },
    { id: 'job-8', title: 'UX/UI Designer', company: 'Cred', location: 'Bangalore', type: 'Full-time', mode: 'Hybrid', experienceYears: 3, salaryLPA: 25, rating: 4.8, description: 'Craft beautiful and user-friendly fintech interfaces.' },
];

// --- Filter State Type ---
interface Filters {
    type: JobType | 'All';
    modes: JobMode[];
    experience: number;
    minSalary: number;
}

// --- Filter Components ---
const FilterButton = ({ text, onClick, isActive }: { text: string; onClick: () => void; isActive: boolean }) => (
    <button onClick={onClick} className={`px-3 py-1 text-sm font-semibold rounded-full transition-all duration-200 ${isActive ? 'bg-[#32a5d4] text-white shadow-md' : 'bg-black/5 text-zinc-700 hover:bg-black/10'}`}>
        {text}
    </button>
);

const Checkbox = ({ label, checked, onChange }: { label: JobMode; checked: boolean; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => (
    <label className="flex items-center space-x-3 cursor-pointer">
        <input type="checkbox" name={label} checked={checked} onChange={onChange} className="h-4 w-4 rounded border-zinc-300 text-[#32a5d4] focus:ring-[#32a5d4]/50" />
        <span className="text-zinc-800 text-sm">{label}</span>
    </label>
);

// --- Filter Sidebar ---
const FilterSidebar = ({ filters, setFilters }: { filters: Filters; setFilters: React.Dispatch<React.SetStateAction<Filters>> }) => {
    const handleClearFilters = () => setFilters({ type: 'All', modes: [], experience: 0, minSalary: 0 });

    return (
        <aside className="w-full md:w-1/4 lg:w-1/5 p-5 bg-[#fcfcfc]/40 backdrop-blur-xl rounded-2xl border border-white/50 shadow-lg h-fit sticky top-6">
            <div className="flex justify-between items-center mb-5">
                <h3 className="text-lg font-bold text-zinc-900">Filters</h3>
                <button onClick={handleClearFilters} className="text-xs font-semibold text-[#32a5d4] hover:text-black flex items-center">
                    {ICONS.FilterX} Clear
                </button>
            </div>

            <div className="space-y-6">
                <div>
                    <h4 className="font-semibold text-zinc-800 mb-2 text-sm">Role Type</h4>
                    <div className="flex flex-wrap gap-2">
                        <FilterButton text="All" onClick={() => setFilters(p => ({ ...p, type: 'All' }))} isActive={filters.type === 'All'} />
                        <FilterButton text="Full-time" onClick={() => setFilters(p => ({ ...p, type: 'Full-time' }))} isActive={filters.type === 'Full-time'} />
                        <FilterButton text="Internship" onClick={() => setFilters(p => ({ ...p, type: 'Internship' }))} isActive={filters.type === 'Internship'} />
                    </div>
                </div>

                <div>
                    <h4 className="font-semibold text-zinc-800 mb-2 text-sm">Work Mode</h4>
                    <div className="space-y-2">
                        {(['On-site', 'Remote', 'Hybrid'] as JobMode[]).map(mode => (
                            <Checkbox key={mode} label={mode} checked={filters.modes.includes(mode)} onChange={(e) => {
                                const { name, checked } = e.target;
                                setFilters(p => ({ ...p, modes: checked ? [...p.modes, name as JobMode] : p.modes.filter(m => m !== name) }));
                            }} />
                        ))}
                    </div>
                </div>

                <div>
                    <label htmlFor="experience" className="block font-semibold text-zinc-800 mb-1 text-sm">Min Experience</label>
                    <select id="experience" value={filters.experience} onChange={e => setFilters(p => ({ ...p, experience: parseInt(e.target.value) }))}
                        className="w-full p-2 text-sm bg-[#fcfcfc]/80 border border-zinc-300 rounded-lg text-zinc-800 focus:ring-2 focus:ring-[#32a5d4] focus:border-[#32a5d4] outline-none transition">
                        <option value="0">Any</option>
                        <option value="1">1+ years</option>
                        <option value="3">3+ years</option>
                        <option value="5">5+ years</option>
                        <option value="7">7+ years</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="salary" className="block font-semibold text-zinc-800 mb-1 text-sm">Minimum Salary (LPA)</label>
                    <input type="range" id="salary" min="0" max="60" step="5" value={filters.minSalary}
                        onChange={e => setFilters(p => ({ ...p, minSalary: parseInt(e.target.value) }))}
                        className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="text-right text-xs font-medium text-zinc-700 mt-1">
                        {filters.minSalary > 0 ? `₹${filters.minSalary} LPA+` : 'Any Salary'}
                    </div>
                </div>
            </div>
        </aside>
    );
};

// --- Job Card (Reduced Size) ---
const JobCard = ({ job }: { job: JobListing }) => (
    <div className="bg-[#fcfcfc]/50 backdrop-blur-xl p-4 rounded-2xl border border-white/60 flex flex-col transition-all duration-300 hover:border-black/10 hover:shadow-xl hover:shadow-[#32a5d4]/20 transform hover:-translate-y-1">
        <h2 className="text-base font-bold text-zinc-900">{job.title}</h2>
        <div className="flex items-center gap-1.5 text-zinc-600 mb-3 text-sm">
            <p>{job.company}</p>
            <span className="flex items-center gap-1">{ICONS.Star}{job.rating}</span>
        </div>

        <div className="flex flex-col gap-1.5 text-xs text-zinc-700 mb-4 pb-4 border-b border-black/10">
            <span className="flex items-center gap-2">{ICONS.MapPin} {job.location} ({job.mode})</span>
            <span className="flex items-center gap-2">{ICONS.Briefcase} {job.experienceYears === 0 ? 'Fresher' : `${job.experienceYears}+ years`}</span>
            <span className="flex items-center gap-2">{ICONS.DollarSign} {job.salaryLPA} LPA</span>
        </div>

        <p className="flex-grow text-xs text-zinc-700/90 line-clamp-3 mb-3">{job.description}</p>

        <div className="mt-auto flex justify-between items-center">
            <a href="#" className="text-xs font-semibold text-[#32a5d4] hover:text-black transition">View →</a>
            <button className="bg-[#32a5d4] text-white font-semibold py-1.5 px-4 rounded-md hover:bg-black transition-all duration-300 text-xs">
                Apply
            </button>
        </div>
    </div>
);

// --- Main Job Portal ---
const JobPortal = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState<Filters>({ type: 'All', modes: [], experience: 0, minSalary: 0 });

    const filteredJobs = useMemo(() => mockJobListings.filter(job =>
        (filters.type === 'All' || job.type === filters.type) &&
        (filters.modes.length === 0 || filters.modes.includes(job.mode)) &&
        (job.experienceYears >= filters.experience) &&
        (job.salaryLPA >= filters.minSalary) &&
        (searchTerm === '' ||
            job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.location.toLowerCase().includes(searchTerm.toLowerCase()))
    ), [searchTerm, filters]);

    return (
        <div className="relative p-4 md:p-8 bg-[#d1e1e9] min-h-screen font-sans text-zinc-900 overflow-hidden">
            <div className="absolute top-0 -left-10 w-80 h-80 bg-[#32a5d4]/20 rounded-full blur-3xl opacity-70"></div>
            <div className="absolute top-10 -right-10 w-80 h-80 bg-[#32a5d4]/10 rounded-full blur-3xl opacity-70"></div>
            <div className="absolute -bottom-16 left-20 w-80 h-80 bg-[#32a5d4]/15 rounded-full blur-3xl opacity-70"></div>

            <div className="relative max-w-screen-xl mx-auto z-10">
                <header className="text-center mb-8">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-zinc-900">
                        Find Your <span className="text-[#32a5d4]">Dream Job</span>
                    </h1>
                    <p className="mt-2 text-sm text-zinc-600">Explore thousands of opportunities in one place.</p>
                </header>

                <div className="flex flex-col md:flex-row gap-6">
                    <FilterSidebar filters={filters} setFilters={setFilters} />

                    <main className="flex-1">
                        <div className="mb-6 relative">
                            <input type="text" placeholder="Search by title, company, or location..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full py-3 px-6 pr-12 text-sm bg-[#fcfcfc]/50 backdrop-blur-xl rounded-full border border-white/50 shadow-lg focus:outline-none focus:ring-2 focus:ring-[#32a5d4] transition-all duration-300"
                            />
                            <div className="absolute inset-y-0 right-0 pr-5 flex items-center text-zinc-500 pointer-events-none">
                                {ICONS.Search}
                            </div>
                        </div>

                        {filteredJobs.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                                {filteredJobs.map(job => <JobCard key={job.id} job={job} />)}
                            </div>
                        ) : (
                            <div className="text-center py-16 bg-[#fcfcfc]/40 backdrop-blur-xl rounded-2xl border border-white/50">
                                <h3 className="text-lg font-semibold text-zinc-800">No Jobs Found</h3>
                                <p className="text-zinc-600 mt-1 text-sm">Try adjusting your search or filters.</p>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default JobPortal;
