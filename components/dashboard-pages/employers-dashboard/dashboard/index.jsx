import MobileMenu from "/components/dashboard-pages/mobileheader";
import DashboardHeader from "/components/dashboard-pages/dashboardheader";
// import LoginPopup from "../../../common/form/login/LoginPopup";
import DashboardEmployerSidebar from "../../../header/DashboardEmployerSidebar";
import { useState, useEffect } from "react";
import axios from "axios";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Link from "next/link";
import Image from "next/image";
import Pagination from "@/components/job-listing-pages/components/Pagination";
import BreadCrumb from "../../BreadCrumb";
import TopCardBlock from "./components/TopCardBlock";
// import ProfileChart from "./components/ProfileChart";
// import Notification from "./components/Notification";
import Applicants from "./components/Applicants";
import CopyrightFooter from "../../CopyrightFooter";
import MenuToggler from "../../MenuToggler";
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
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/jobs/companyjob/findapplicants`, { userId:sessionStorage.getItem("userId"),
        companyId: 1,
        limit: 6,
        period: selectedJob,
      },
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("authToken")}`, // Example token
          "Content-Type": "application/json",
        }},);
      setApplicants(response.data.applicants);
      const statusCounts = response.data.totalApplicantsByStatus.reduce(
        (acc, { status, _count }) => {
          acc[status] = _count.status;
          return acc;
        },
        { total: response.data.applicants.length, approved: 0, rejected: 0 }
      );
      setTotals(statusCounts);
      // setMessages({}); // Clear messages when fetching new applicants
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
        companyId: 1,
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
  console.log(messages);
  return (
    <div className="widget-content">
      <div className="tabs-box">
        <Tabs>
         

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
                                className="rounded-full"
                                  width={90}
                                  height={90}
                                  src={`https://backend.rotaracthub.in/api/users/get-user-image?userId=${candidate.applicantId}`}
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
                              
                        <ul className="post-tags" style={{ padding: "8px", display: "flex", gap: "8px", flexWrap: "wrap" }}>
                          {candidate.job.specialisms.split(", ").slice(0,2).map((val, i) => (
                            <li key={i}>
                              <a href="#">{val}</a>
                            </li>
                          ))}
                        </ul>
                       
                              </ul>

                              <div className="option-box m-3 mt-0">
                              <ul className="option-list">
                                
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
                                 
                              </ul>
                           </div>
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

const Index = () => {
  return (
    <div className="page-wrapper dashboard">
      <span className="header-span"></span>
      {/* <!-- Header Span for hight --> */}

      {/* <LoginPopup /> */}
      {/* End Login Popup Modal */}

      <DashboardHeader />
      {/* End Header */}

      <MobileMenu />
      {/* End MobileMenu */}

      <DashboardEmployerSidebar />
      {/* <!-- End User Sidebar Menu --> */}

      {/* <!-- Dashboard --> */}
      <section className="user-dashboard">
        <div className="dashboard-outer">
          <BreadCrumb title="Dashboard Home!" />
          {/* breadCrumb */}

          <MenuToggler />
          {/* Collapsible sidebar button */}

          <div className="row">
            <TopCardBlock />
          </div>
          {/* End .row top card block */}

          <div className="row">
            {/* <div className="col-xl-7 col-lg-12"> */}
              {/* <!-- Graph widget --> */}
              {/* <div className="graph-widget ls-widget">
               {/* <ProfileChart />
              </div> */}
              {/* End profile chart */}
            {/* </div> */}
            {/* End .col */}

            {/* <div className="col-xl-5 col-lg-12"> */}
              {/* <!-- Notification Widget --> */}
              {/* <div className="notification-widget ls-widget">
                <div className="widget-title">
                  <h4>Notifications</h4>
                </div>
                <div className="widget-content">
                  <Notification />
                </div>
              </div>
            </div> */}
            {/* End .col */}

            <div className="col-lg-12">
              {/* <!-- applicants Widget --> */}
              <div className="applicants-widget ls-widget">
                <div className="widget-title">
                  <h4>Recent Applicants</h4>
                </div>
                <div className="widget-content">
                  <div className="row">
                    {/* <!-- Candidate block three --> */}

                    <WidgetContentBox/>
                  </div>
                </div>
              </div>
            </div>
            {/* End .col */}
          </div>
          {/* End .row profile and notificatins */}
        </div>
        {/* End dashboard-outer */}
      </section>
      {/* <!-- End Dashboard --> */}

      <CopyrightFooter />
      {/* <!-- End Copyright --> */}
    </div>
    // End page-wrapper
  );
};

export default Index;
