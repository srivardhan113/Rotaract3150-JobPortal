"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Link from "next/link";
import Image from "next/image";
import Pagination from "@/components/job-listing-pages/components/Pagination";
const WidgetTopFilterBox = ({ selectedJob, setSelectedJob }) => {
  return (
    <div className="chosen-outer">
      <select
        className="chosen-single form-select chosen-container"
        value={selectedJob}
        onChange={(e) => setSelectedJob(e.target.value)}
      >
        <option value="">Select Jobs</option>
        <option value="Last 12 Months">Last 12 Months</option>
        <option value="Last 16 Months">Last 16 Months</option>
        <option value="Last 24 Months">Last 24 Months</option>
        <option value="Last 5 Years">Last 5 Years</option>
      </select>
    </div>
  );
};

const WidgetContentBox = () => {
  const [applicants, setApplicants] = useState([]);
  const [totals, setTotals] = useState({ total: 0, approved: 0, rejected: 0 });
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState("");
  const [messages, setMessages] = useState({}); // Store messages by candidate ID
  const [state, setState] = useState({
    page: 1,
    totalPages: 1,
  });
  const handlePageChange = (newPage) => {
    setState(prev => ({ ...prev, page: newPage }));
  };
  useEffect(() => {
    fetchApplicants();
  }, [selectedJob]);

  const fetchApplicants = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/jobs/companyjob/findapplicants`,
        {
          userId:sessionStorage.getItem("userId"),
          companyId: sessionStorage.getItem("companyId"),
          limit:4,
          page:state.page,
          period: selectedJob,
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("authToken")}`, // Example token
            "Content-Type": "application/json",
          }},
      );
  
      console.log(response.data);
      
      // Extract applicants from response
      const fetchedApplicants = response.data.applicants;
      setApplicants(fetchedApplicants);
  
      // Use `fetchedApplicants` instead of `applicants`
      // const statusCounts = fetchedApplicants.reduce(
      //   (acc, applicant) => {
      //     let status = applicant.status.toLowerCase(); // Normalize status
      
      //     if (status === "shortlisted") {
      //       acc.approved += 1; // Treat "Shortlisted" as "Approved"
      //     } else if (status === "rejected") {
      //       acc.rejected += 1;
      //     }
      
      //     acc.total += 1; // Always count total applicants
      //     return acc;
      //   },
      //   { total: 0, approved: 0, rejected: 0 }
      // );
      
      setState(prev => ({
        ...prev,
        totalPages: response.data.totalPages || 1
      }));
// Helper function to safely get count for a specific status
const getStatusCount = (statusData, statusType) => {
  const statusObj = statusData.find(item => item.status === statusType);
  return statusObj ? statusObj._count.status : 0;
};

// Main function to process the response data
const processApplicationCounts = (responseData) => {
  const { totalApplications, totalApplicantsByStatus } = responseData.data;
  
  // Convert the array-like object to a proper array
  const statusArray = Object.keys(totalApplicantsByStatus).map(key => ({
    status: totalApplicantsByStatus[key].status,
    _count: totalApplicantsByStatus[key]._count
  }));

  // Get counts for specific statuses
  const shortlistedCount = getStatusCount(statusArray, "Shortlisted");
  const rejectedCount = getStatusCount(statusArray, "Rejected");

  // Set the totals object
  const totals = {
    total: totalApplications,
    approved: shortlistedCount,
    rejected: rejectedCount
  };

  return totals;
};const totals = processApplicationCounts(response);
setTotals(totals);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching applicants:", error);
    } finally {
      setLoading(false);
    }
  };
  const handledelete= async (applicationId) =>{
    try {
      const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/jobs/userjob/delete-applied-job?applicationId=${applicationId}`, {
      });
      fetchApplicants();
    } catch (error) {
      console.error("Error updating application status:", error);
    }
  }

  const handleAcceptance = async (candidateId, acceptance) => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/jobs/companyjob/acceptationOfApplicant`, {
        companyId: sessionStorage.getItem('companyId'),
        applicationId: candidateId,
        acceptance: acceptance
      });
      
      // Update message for specific candidate
      setMessages(prev => ({
        ...prev,
        [candidateId]: response.data.message
      }));

      // Refresh the applicants list after updating status
      fetchApplicants();
    } catch (error) {
      // Set error message for specific candidate
      setMessages(prev => ({
        ...prev,
        [candidateId]: "Error updating status"
      }));
      console.error("Error updating application status:", error);
    }
  };
  useEffect(() => {
    fetchApplicants();
  }, [selectedJob, state.page]); // Add state.page dependency
  console.log(messages);
  return (
    <div className="widget-content">
      <div className="tabs-box">
        <Tabs>
          <div className="aplicants-upper-bar">
            <h6>Senior Product Designer</h6>
            <WidgetTopFilterBox selectedJob={selectedJob} setSelectedJob={setSelectedJob} />
            <TabList className="aplicantion-status tab-buttons clearfix">
              <Tab className="tab-btn totals"> Total(s): {totals.total}</Tab>
              <Tab className="tab-btn approved"> Approved: {totals.approved || 0}</Tab>
              <Tab className="tab-btn rejected"> Rejected(s): {totals.rejected || 0}</Tab>
            </TabList>
          </div>

          <div className="tabs-content">
            {loading ? (
              <p>Loading applicants...</p>
            ) : (
              ["total", "approved", "rejected"].map((status, index) => (
                <TabPanel key={index}>
                  <div className="row">
                    {applicants
                      .filter((app) => status === "total" || app.status === status)
                      .map((candidate) => (
                        <div
                          className="candidate-block-three col-lg-6 col-md-12 col-sm-12"
                          key={candidate.id}
                        >
                          <div className="inner-box" style={{ boxShadow: "0px 1px 8px rgba(0, 0, 0, 0.15)" }}>
                            <div className="content">
                              <figure className="image ">
                                <Image
                                className="object-cover"
                                  width={100}
                                  height={100}
                                  src={`${process.env.NEXT_PUBLIC_API_URL}/api/users/get-user-image?userId=${candidate.applicantId}`}
                                  alt="candidates"
                                />
                              </figure>
                              <h4 className="name">
                                <Link href={`/candidates-single/${candidate.id}/${candidate.applicantId}`}>
                                  {candidate.applicant.name}
                                </Link>
                              </h4>
                             
                              <ul className="candidate-info">
                                <li className="designation">
                                  {candidate.job.jobRoleTitle}
                                </li>
                                {/* <li>
                                  <span className="icon flaticon-map-locator"></span>{" "}
                                  {candidate.job.city}, {candidate.job.country}
                                </li> */}
                                  {/* <li>
                            <span className="icon flaticon-money"></span> $
                            {candidate.job.offeredSalary}
                          </li> */}
                              </ul>
                              <ul className="candidate-info">
                              <li>
                                  <span className="icon flaticon-map-locator"></span>{" "}
                                  {candidate.job.city}, {candidate.job.country}
                                </li>
                              <li>
                            <span className="icon flaticon-money"></span> $
                            {candidate.job.offeredSalary}
                          </li>
                              </ul>
                        {/* <ul className="post-tags" style={{ padding: "8px", display: "flex", gap: "8px", flexWrap: "wrap" }}>
                          {candidate.job.specialisms.split(", ").map((val, i) => (
                            <li key={i}>
                              <a href="#">{val}</a>
                            </li>
                          ))}
                        </ul> */}

                            
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
                                
                                <Link href={`/candidates-single/${candidate.id}/${candidate.applicantId}`}>
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
                                    <button data-text="Delete Aplication" onClick={() => handledelete(candidate.id)}>
                                      <span className="la la-trash"></span>
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
                  <nav className="ls-pagination ">
    <Pagination 
      currentPage={state.page}
      totalPages={state.totalPages}
      onPageChange={handlePageChange}
    />
  </nav>
                </TabPanel>
              ))
            )}
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default WidgetContentBox;