import React, { useState, useEffect } from 'react';
import Link from "next/link";
import Image from "next/image";
import axios from 'axios';

const JobFavouriteTable = () => {
  const [jobsData, setJobsData] = useState({
    data: [],
    pagination: {
      currentPage: 1,
      totalPages: 1,
      totalJobs: 0
    }
  });
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  const [timeFilter, setTimeFilter] = useState('6');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const userId = sessionStorage.getItem('userId');
    if (!userId) {
      setError('User not logged in');
      setIsLoading(false);
      return;
    }

    const fetchJobs = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/jobs/userjob/get-short-listed-jobs`,
          {
            applicantid: userId,
            period: timeFilter,
            page: currentPage,
            limit: 4
          }
        );
        
        if (response.data.data) {
          setJobsData({
            data: response.data.data,
            pagination: response.data.pagination
          });
        }
      } catch (err) {
        console.error('Error fetching jobs:', err);
        setError(err.response?.data?.message || 'Failed to fetch jobs. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, [timeFilter, currentPage]);

  if (isLoading) {
    return <div className="tabs-box">Loading...</div>;
  }

  if (error) {
    return <div className="tabs-box text-red-500">{error}</div>;
  }

  return (
    <div className="tabs-box">
      <div className="widget-title">
        <h4>My Shortlisted Jobs</h4>

        <div className="chosen-outer">
          <select 
            className="chosen-single form-select"
            value={timeFilter}
            onChange={(e) => {
              setTimeFilter(e.target.value);
              setCurrentPage(1); // Reset to first page when filter changes
            }}
          >
            <option value="6">Last 6 Months</option>
            <option value="12">Last 12 Months</option>
            <option value="16">Last 16 Months</option>
            <option value="24">Last 24 Months</option>
            <option value="60">Last 5 year</option>
          </select>
        </div>
      </div>

      <div className="widget-content">
        <div className="table-outer">
          <table className="default-table manage-job-table">
            <thead>
              <tr>
                <th>Job Title</th>
                <th>Applied Date</th>
                <th>Company</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {jobsData.data.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-4">
                    No shortlisted jobs found
                  </td>
                </tr>
              ) : (
                jobsData.data.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div className="job-block">
                        <div className="inner-box">
                          <div className="content">
                            <span className='company-logo'>
                            <Image
                                width={50}
                                height={49}
                                src={`https://backend.rotaracthub.in/api/companies/get-image?companyId=${item.job.companyId}`}
                                alt="company logo"
                              />
                            </span>
                         
                            <h4>
                              <Link href={`/job-single/${item.job.id}`}>
                                {item.job.jobRoleTitle}
                              </Link>
                            </h4>
                            <ul className="job-info">
                          <li>
                                <span className="icon flaticon-briefcase"></span>
                                {item.job.company.name}
                              </li>
                            <li>
                              <span className="icon flaticon-map-locator"></span>
                              {item.job.company.city}, {item.job.company.country}
                            </li>
                          </ul>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{formatDate(item.appliedAt)}</td>
                    <td>{item.job.companyId}</td>
                    <td className="status">Shortlisted</td>
                    <td>
                      <div className="option-box">
                        <ul className="option-list">
                          <li>
                            <Link href={`/job-single/${item.job.id}`}>
                              <button data-text="View Job">
                                <span className="la la-eye"></span>
                              </button>
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {jobsData.pagination.totalPages > 1 && (
          <div className="pagination-box">
            <nav className="ls-pagination">
              <ul>
                {currentPage > 1 && (
                  <li>
                    <button 
                      onClick={() => setCurrentPage(prev => prev - 1)}
                      className="prev"
                    >
                      <span className="la la-arrow-left"></span>
                    </button>
                  </li>
                )}

                {Array.from({ length: jobsData.pagination.totalPages }, (_, i) => i + 1).map(page => (
                  <li key={page}>
                    <button
                      onClick={() => setCurrentPage(page)}
                      className={currentPage === page ? 'current-page' : ''}
                    >
                      {page}
                    </button>
                  </li>
                ))}

                {currentPage < jobsData.pagination.totalPages && (
                  <li>
                    <button 
                      onClick={() => setCurrentPage(prev => prev + 1)}
                      className="next"
                    >
                      <span className="la la-arrow-right"></span>
                    </button>
                  </li>
                )}
              </ul>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobFavouriteTable;