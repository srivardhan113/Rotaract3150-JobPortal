import React, { useState, useEffect } from 'react';
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import Pagination from '@/components/job-listing-pages/components/Pagination';

const JobAlertsTable = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [timeFilter, setTimeFilter] = useState("6");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Add missing pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchAppliedJobs = async (months) => {
    setLoading(true);
    setError(null);
    
    try {
      const requestBody = {
        page: currentPage,
        limit: 5,
        sortField: "appliedDate",
        sortOrder: "desc",
        period: months
      };
      
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/jobs/userjob/filterjobs`,
        requestBody
      );
      
      if (response.data.success) {
        setAppliedJobs(response.data.data || []);
        // Set total pages from response pagination data
        if (response.data.pagination) {
          setTotalPages(response.data.pagination.totalPages || 1);
        }
      } else {
        setAppliedJobs([]);
        setError("No applied jobs found for the selected time period.");
      }
    } catch (err) {
      setError("Failed to fetch applied jobs.");
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Update useEffect to depend on both timeFilter and currentPage
  useEffect(() => {
    fetchAppliedJobs(timeFilter);
  }, [timeFilter, currentPage]);

  const handleDeleteApplication = async (jobId) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/jobs/userjob/withdraw`,
        { jobId }
      );
      
      if (response.data.success) {
        setAppliedJobs(appliedJobs.filter(job => job.id !== jobId));
      } else {
        throw new Error(response.data.message || "Failed to withdraw application");
      }
    } catch (err) {
      console.error("Failed to withdraw application:", err);
    }
  };

  return (
    <div className="tabs-box">
      <div className="widget-title">
        <h4>New Jobs Posted</h4>
        
        <div className="chosen-outer">
          <select 
            className="chosen-single form-select"
            value={timeFilter}
            onChange={(e) => {
              setTimeFilter(e.target.value);
              setCurrentPage(1); // Reset to first page when filter changes
            }}
          >
            <option value="Last 6 Months">Last 6 Months</option>
            <option value="Last 12 Months">Last 12 Months</option>
            <option value="Last 24 Months">Last 24 Months</option>
            <option value="Last 5 Years">Last 5 year</option>
          </select>
        </div>
      </div>

      <div className="widget-content">
        <div className="table-outer">
          {loading && <div className="text-center py-8">Loading jobs...</div>}
          {error && <div className="text-center py-8">{error}</div>}
          
          {!loading && !error && (
            <table className="default-table manage-job-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Criteria</th>
                  <th>Created</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {appliedJobs.map((job) => (
                  <tr key={job.id}>
                    <td>
                      <div className="job-block">
                        <div className="inner-box">
                          <div className="content">
                            <span className="company-logo">
                              <Image
                                width={50}
                                height={49}
                                src={`${process.env.NEXT_PUBLIC_API_URL}/api/companies/get-image?companyId=${job.companyId}`}
                                alt="company logo"
                              />
                            </span>
                            <h4>
                              <Link href={`/job-single/${job.id}`}>
                                {job.jobRoleTitle}
                              </Link>
                            </h4>
                            <ul className="job-info">
                              <li>
                                <span className="icon flaticon-briefcase"></span>
                                {job.company.name}
                              </li>
                              <li>
                                <span className="icon flaticon-map-locator"></span>
                                {job.city}
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{job.jobType}</td>
                    <td>{new Date(job.posteddate).toLocaleDateString()}</td>
                    <td>
                      <div className="option-box">
                        <ul className="option-list">
                          <li>
                            <Link 
                              href={`/job-single/${job.id}`}
                              data-text="View Application"
                            >
                              <span className="la la-eye"></span>
                            </Link>
                          </li>
                          <li>
                            <button 
                              onClick={() => handleDeleteApplication(job.id)}
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

                {appliedJobs.length === 0 && !loading && (
                  <tr>
                    <td colSpan="4" className="text-center">
                      No applied jobs found for the selected time period.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
          
          {/* Only show pagination if we have more than one page */}
          {totalPages > 1 && (
            <Pagination 
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default JobAlertsTable;