import React, { useState, useEffect } from 'react';
import Link from "next/link";
import Image from "next/image";
import axios from 'axios';
import Pagination from '@/components/job-listing-pages/components/Pagination';
const JobListingsTable = ({ companyId }) => {
  const [jobs, setJobs] = useState([]);
  const [period, setPeriod] = useState('6');
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(null);
  const [state, setState] = useState({
    page: 1,
    totalPages: 1,
  });
  const handlePageChange = (newPage) => {
    setState(prev => ({ ...prev, page: newPage }));
  };
  useEffect(() => {
    fetchJobs();
  }, [companyId, period, page]);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/jobs/companyjob/findjobsandapplicants`,
         {
          userId:sessionStorage.getItem("userId"),
          companyId:sessionStorage.getItem('companyId'),
          period:period,
          page,
          limit: 10
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("authToken")}`, // Example token
            "Content-Type": "application/json",
          }},
      );
      
      setJobs(response.data.data);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to fetch jobs');
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="tabs-box">
      <div className="widget-title">
        <h4>My Job Listings</h4>

        <div className="chosen-outer">
          {/* <!--Tabs Box--> */}
          <select 
            className="chosen-single form-select"
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
          >
            <option value="Last 6 Months">Last 6 Months</option>
            <option value="Last 12 Months">Last 12 Months</option>
            <option value="Last 16 Months">Last 16 Months</option>
            <option value="Last 24 Months">Last 24 Months</option>
            <option value="Last 5 Years">Last 5 year</option>
          </select>
        </div>
      </div>
      {/* End filter top bar */}

      {/* Start table widget content */}
      <div className="widget-content">
        <div className="table-outer">
          {loading ? (
            <div className="text-center p-4">Loading...</div>
          ) : error ? (
            <div className="text-center text-red-500 p-4">{error}</div>
          ) : (
            <table className="default-table manage-job-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Applications</th>
                  <th>Created & Expired</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {jobs.map((job) => (
                  <tr key={job.id}>
                    <td>
                      {/* <!-- Job Block --> */}
                      <div className="job-block">
                        <div className="inner-box">
                          <div className="content">
                            <span className="company-logo">
                              <Image
                                width={50}
                                height={49}
                                src={`${process.env.NEXT_PUBLIC_API_URL}/api/companies/get-image?companyId=${sessionStorage.getItem('companyId')}`}
                                alt="company logo"
                              />
                            </span>
                            <Link href={`manage-jobs/${job.id}`}>
                            <h4>
                            
                                {job.jobRoleTitle}
                              
                            </h4>
                            </Link>
                            <ul className="job-info">
                              <li>
                                <span className="icon flaticon-briefcase"></span>
                                {job.company.name}
                              </li>
                              <li>
                                <span className="icon flaticon-map-locator"></span>
                                {`${job.city},${job.country}`}
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="applied">
                    <Link href={`manage-jobs/${job.id}`}>
                    
                      {job._count.ApplicationStatus}+ Applied
                   
                    </Link>
                    </td>
                    <td>
                    
                      {formatDate(job.posteddate)} <br />
                      {/* You might want to add expiry date if available in your data */}
                      {formatDate(job.applicationDeadline)}
                    </td>
                    <td className="status">Active</td>
                    <td>
                      <div className="option-box">
                        <ul className="option-list">
                        <Link href={`manage-jobs/${job.id}`}>
                          <li>
                            <button data-text="View Aplication">
                              <span className="la la-eye"></span>
                            </button>
                          </li>
                        </Link>
                          {/* <li>
                            <button data-text="Reject Aplication">
                              <span className="la la-pencil"></span>
                            </button>
                          </li> */}
                          <li>
                            <button data-text="Delete Aplication">
                              <span className="la la-trash"></span>
                            </button>
                          </li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {!loading && jobs.length === 0 && (
            <div className="text-center p-4">No jobs found</div>
          )}

<nav className="ls-pagination ">
    <Pagination 
      currentPage={state.page}
      totalPages={state.totalPages}
      onPageChange={handlePageChange}
    />
  </nav>
        </div>
      </div>
      {/* End table widget content */}
    </div>
  );
};

export default JobListingsTable;