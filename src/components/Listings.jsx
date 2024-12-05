import React, { useContext, useEffect, useState } from 'react';
import JobCard from './JobCard';
import Context from '../context';
import jobsData from "../data.json"; 

export default function Listings() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const jobsPerPage = 20;
  let {data,location,allJobs,setAllJobssetPageNum,pagenum} = useContext(Context)
  const loadJobs = () => {
    setLoading(true);
    const start = (page - 1) * jobsPerPage;
    const end = start + jobsPerPage;
    const newJobs = allJobs.slice(start, end);
    let arr = []
    for(let i=start;i<end && i<allJobs.length ;i++){
        arr.push(allJobs[i])
    }
    setTimeout(() => {
        setJobs((prevJobs) => [...prevJobs, ...arr]);
      setLoading(false);
    }, 1000); 
  };

  useEffect(() => {
    loadJobs(); 
  }, [page,allJobs,pagenum]);
  useEffect(()=>{
    setJobs([])
    setPage(pagenum)
  },[pagenum,allJobs])

  const handleScroll = () => {
    if ((window.innerHeight + document.documentElement.scrollTop) >= (document.documentElement.offsetHeight - 200) && !loading) {
      setPage(prev => prev + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [loading]);

  return (
    <div className="container mx-auto px-4 py-8 mb-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.length > 0 ?
          jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          )):
         !loading &&  <h1 className='text-[25px] text-center'>No More Jobs</h1>
        }
      </div>

      {loading && (
        <div className="flex justify-center items-center my-6">
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 border-solid border-gray-200 rounded-full border-t-transparent"></div>
        </div>
      )}
    </div>
  );
}
