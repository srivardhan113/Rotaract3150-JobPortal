import { useState, useEffect,use } from "react";
import axios from "axios";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Image from "next/image";
import Link from "next/link";
import MobileMenu from "/components/dashboard-pages/mobileheader";
import DashboardHeader from "/components/dashboard-pages/dashboardheader";
import DashboardEmployerSidebar from "../../../header/DashboardEmployerSidebar";
import BreadCrumb from "../../BreadCrumb";
import CopyrightFooter from "../../CopyrightFooter";
import MenuToggler from "../../MenuToggler";
import { useParams } from "next/navigation";
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

const index = ({params}) => {
  const resolvedParams=useParams();
  const [applications, setApplications] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState("");
  const [messages, setMessages] = useState({}); 
  const [totals, setTotals] = useState({
    total: 0,
    shortlisted: 0,
    rejected: 0
  });

  useEffect(() => {
    fetchApplications();
  }, [selectedPeriod, currentPage]);

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
      fetchApplications();
    } catch (error) {
      // Set error message for specific candidate
      setMessages(prev => ({
        ...prev,
        [candidateId]: "Error updating status"
      }));
      console.error("Error updating application status:", error);
    }
  };
  const fetchApplications = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/jobs/companyjob/find-applications-based-on-job-id`,
        {
          userId: sessionStorage.getItem("userId"),
          jobId: resolvedParams.id, // Replace with actual jobId
          period: selectedPeriod,
          page: currentPage,
          limit: 6
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("authToken")}`, // Example token
            "Content-Type": "application/json",
          }},
      );

      setApplications(response.data.applications);
      setTotalPages(response.data.totalPages);
      
      const statusCounts = {
        total: response.data.totalApplications,
        shortlisted: response.data.applications.filter(app => app.status === "Shortlisted").length,
        rejected: response.data.applications.filter(app => app.status === "Rejected").length
      };
      setTotals(statusCounts);

    } catch (error) {
      console.error("Error fetching applications:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper dashboard">
      <span className="header-span"></span>

      <DashboardHeader />
      <MobileMenu />
      <DashboardEmployerSidebar />

      <section className="user-dashboard">
        <div className="dashboard-outer">
          <BreadCrumb title={`${applications[0]?.job.jobRoleTitle}`} />
          <MenuToggler />

          <div className="row">
            <div className="col-lg-12">
              <div className="ls-widget">
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
                                              width={100}
                                              height={100}
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
                                    onClick={() => handleAcceptance(application.id, true)}
                                  >
                                    <span className="la la-check"></span>
                                  </button>
                                </li>
                                <li>
                                  <button 
                                    data-text="Reject Application"
                                    onClick={() => handleAcceptance(application.id, false)}
                                  >
                                    <span className="la la-times-circle"></span>
                                  </button>
                                </li>
                                <li
                               
                                style={{ color: application.status === "Rejected" ? "red" : "green" }}
                              >
                                {application.status}
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
              </div>
            </div>
          </div>
        </div>
      </section>

      <CopyrightFooter />
    </div>
  );
};

export default index;