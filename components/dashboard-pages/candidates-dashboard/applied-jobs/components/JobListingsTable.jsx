import React, { useState, useEffect } from 'react';
import Link from "next/link";
import Image from "next/image";
import axios from 'axios';
import Pagination from '@/components/job-listing-pages/components/Pagination';
const JobListingsTable = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [period, setPeriod] = useState('6');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalJobs, setTotalJobs] = useState(0);
  const handleDeleteApplication =async (applicationId) =>{
    try {
      const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/jobs/userjob/delete-applied-job?applicationId=${applicationId}`, {
      });
      fetchAppliedJobs();
    } catch (error) {
      console.error("Error updating application status:", error);
    }
  }
  const fetchAppliedJobs = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/jobs/userjob/get-applied-jobs`,
        {
          userId:sessionStorage.getItem("userId"),
          applicantid: sessionStorage.getItem('userId'),
          page: currentPage,
          limit: 5,
          period
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("authToken")}`, // Example token
            "Content-Type": "application/json",
          }},
      );

      // Debug log to check response
      console.log('API Response:', response.data);

      // Check if response.data exists and has the expected structure
      if (response.data && response.data.data) {
        setAppliedJobs(response.data.data);
        if (response.data.pagination) {
          setTotalPages(response.data.pagination.totalPages);
          setTotalJobs(response.data.pagination.totalJobs);
        }
      } else {
        setError('Invalid response format');
      }
    } catch (err) {
      console.error('API Error:', err);
      setError(err.response?.data?.message || 'Failed to fetch applied jobs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppliedJobs();
  }, [currentPage, period]);

  const handlePeriodChange = (e) => {
    setPeriod(e.target.value);
    setCurrentPage(1);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const getStatusClass = (status) => {
    switch (status) {
      case 'Shortlisted':
        return 'text-green-600';
      case 'UnderReview':
        return 'text-yellow-600';
      case 'Rejected':
        return 'text-red-600';
      default:
        return '';
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!appliedJobs || appliedJobs.length === 0) return <div>No applied jobs found</div>;

  return (
    <div className="tabs-box p-4">
      <div className="widget-title">
        <h4>My Applied Jobs</h4>
        
        <div className="chosen-outer">
          <select 
            className="chosen-single form-select"
            value={period}
            onChange={handlePeriodChange}
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
                <th>Date Applied</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {appliedJobs.map((item) => (
                <tr key={item.id}>
                  <td>
                    <div className="job-block">
                      <div className="inner-box">
                        <div className="content">
                          <span className="company-logo">
                            <Image
                              width={50}
                              height={49}
                              src={`${process.env.NEXT_PUBLIC_API_URL}/api/companies/get-image?companyId=${item.job.companyId}`}
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
                              {item.job.city}, {item.job.country}
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{formatDate(item.appliedAt)}</td>
                  <td className={getStatusClass(item.status)}>
                    {item.status}
                  </td>
                  <td>
                    <div className="option-box">
                      <ul className="option-list">
                        <li>
                          <Link href={`/job-single/${item.job.id}`} data-text="View Application">
                            <span className="la la-eye"></span>
                          </Link>
                        </li>
                        <li>
                            <button 
                              onClick={() => handleDeleteApplication(item.id)}
                              data-text="Withdraw Application"
                            >
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
        </div>
      </div>
      <Pagination 
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default JobListingsTable;