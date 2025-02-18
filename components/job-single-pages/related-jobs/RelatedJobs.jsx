import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';

const JobListings = () => {
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState({
    jobType: '',
    datePosted: 'All',
    experienceLevel: '',
    minSalary: '',
    maxSalary: '',
    tags: '',
    city: '',
    searchbar: '',
    page: 1,
    limit:6,
    sortField: 'applicationDeadline',
    sortOrder: 'asc'
  });

  const fetchJobs = async () => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/jobs/userjob/filterjobs`, filters);
      if (response.data.success) {
        setJobs(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [filters]);

  const formatSalary = (salary) => {
    return `₹${salary.toLocaleString()}`;
  };

  return (
    <>
      {jobs.map((item) => (
        <div className="job-block" key={item.id}>
          <div className="inner-box">
            <div className="content">
              <span className="company-logo">
                <img
                  className='rounded'
                  width={50}
                  height={49}
                  src={`https://backend.rotaracthub.in/api/companies/get-image?companyId=${item.company.id}`}
                  alt="company logo"
                />
              </span>

              <h4>
                <Link href={`/job-single/${item.id}`}>{item.jobRoleTitle}</Link>
              </h4>

              <ul className="job-info">
                <li>
                  <span className="icon flaticon-briefcase"></span>
                  {item.company.name}
                </li>
                <li>
                  <span className="icon flaticon-map-locator"></span>
                  {item.city}, {item.country}
                </li>
                <li>
                  <span className="icon flaticon-clock-3"></span>
                  {new Date(item.posteddate).toLocaleDateString()}
                </li>
                <li>
                  <span className="icon flaticon-money"></span>
                  {formatSalary(item.offeredSalary)}
                </li>
              </ul>

              <ul className="job-other-info">
                <li className="time">
                  {item.jobType}
                </li>
                {item.specialisms.split(', ').map((specialism, index) => (
                  <li key={index} className="required">
                    {specialism}
                  </li>
                ))}
              </ul>

              {/* <button className="bookmark-btn">
                <span className="flaticon-bookmark"></span>
              </button> */}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default JobListings;