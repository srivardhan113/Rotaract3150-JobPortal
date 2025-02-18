"use client"
import { useState, useEffect } from "react";
import axios from "axios";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Image from "next/image";
import Link from "next/link";

const PeriodFilterBox = ({ selectedPeriod, setSelectedPeriod }) => {
  return (
    <div className="chosen-outer">
      <select
        className="chosen-single form-select chosen-container"
        value={selectedPeriod}
        onChange={(e) => setSelectedPeriod(e.target.value)}
      >
        <option value="">Select Period</option>
        <option value="Last 12 Months">Last 12 Months</option>
        <option value="Last 16 Months">Last 16 Months</option>
        <option value="Last 24 Months">Last 24 Months</option>
        <option value="Last 5 Years">Last 5 Years</option>
      </select>
    </div>
  );
};

const JobApplicationsWidget = ({ jobId }) => {
  const [applications, setApplications] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState("");
  const [totals, setTotals] = useState({
    total: 0,
    shortlisted: 0,
    rejected: 0
  });

  useEffect(() => {
    fetchApplications();
  }, [selectedPeriod, currentPage, jobId]);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://backend.rotaracthub.in/api/companyjob/find-applications-based-on-job-id",
        {
          jobId: jobId,
          period: selectedPeriod,
          page: currentPage,
          limit: 6
        }
      );

      setApplications(response.data.applications);
      setTotalPages(response.data.totalPages);
      
      // Calculate totals
      const statusCounts = {
        total: response.data.totalApplications,
        shortlisted: response.data.applications.filter(app => app.status === "shortlisted").length,
        rejected: response.data.applications.filter(app => app.status === "rejected").length
      };
      setTotals(statusCounts);

    } catch (error) {
      console.error("Error fetching applications:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="widget-content">
      <div className="tabs-box">
        <Tabs>
          <div className="aplicants-upper-bar">
            <h6>{applications[0]?.job.jobRoleTitle || "Job Applications"}</h6>
            <PeriodFilterBox 
              selectedPeriod={selectedPeriod} 
              setSelectedPeriod={setSelectedPeriod}
            />
            <TabList className="aplicantion-status tab-buttons clearfix">
              <Tab className="tab-btn totals">Total(s): {totals.total}</Tab>
              <Tab className="tab-btn approved">Shortlisted: {totals.shortlisted}</Tab>
              <Tab className="tab-btn rejected">Rejected(s): {totals.rejected}</Tab>
            </TabList>
          </div>

          <div className="tabs-content">
            {loading ? (
              <p>Loading applications...</p>
            ) : (
              ["total", "shortlisted", "rejected"].map((status, index) => (
                <TabPanel key={index}>
                  <div className="row">
                    {applications
                      .filter(app => status === "total" || app.status === status)
                      .map((application) => (
                        <div
                          className="candidate-block-three col-lg-6 col-md-12 col-sm-12"
                          key={application.id}
                        >
                          <div className="inner-box" style={{ boxShadow: "0px 1px 8px rgba(0, 0, 0, 0.15)" }}>
                            <div className="content">
                              <figure className="image">
                                <Image
                                  className="rounded-full object-cover"
                                  width={90}
                                  height={90}
                                  src={`https://backend.rotaracthub.in/api/users/get-user-image?userId=${application.applicantId}`}
                                  alt="applicant"
                                />
                              </figure>
                              <h4 className="name">
                                <Link href={`/candidates-single/${application.id}/${application.applicantId}`}>
                                  {application.applicant.name}
                                </Link>
                              </h4>
                              
                              <ul className="candidate-info">
                                <li className="designation">
                                  {application.job.jobRoleTitle}
                                </li>
                                <li>
                                  <span className="icon flaticon-map-locator"></span>
                                  {application.job.city}, {application.job.country}
                                </li>
                              </ul>
                              
                              <ul className="candidate-info">
                                <li>
                                  <span className="icon flaticon-briefcase"></span>
                                  {application.job.jobType}
                                </li>
                                <li>
                                  <span className="icon flaticon-clock"></span>
                                  Applied: {new Date(application.appliedAt).toLocaleDateString()}
                                </li>
                              </ul>
                            </div>

                            <div className="option-box">
                              <ul className="option-list">
                                <li>
                                  <button 
                                    data-text="Approve Application" 
                                    onClick={() => handleAcceptance(candidate.id, true)}
                                  >
                                    <span className="la la-check"></span>
                                  </button>
                                </li>
                                <li>
                                  <button 
                                    data-text="Reject Application"
                                    onClick={() => handleAcceptance(candidate.id, false)}
                                  >
                                    <span className="la la-times-circle"></span>
                                  </button>
                                </li>
                                <li
                               
                                style={{ color: candidate.status === "Rejected" ? "red" : "green" }}
                              >
                                {candidate.status}
                              </li>

                              
                              </ul>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </TabPanel>
              ))
            )}
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default JobApplicationsWidget;