"use client";
import dynamic from "next/dynamic";
import { useState, useEffect ,use} from "react";
import axios from "axios";
import FooterDefault from "@/app/home/Footer";
import DefaulHeader from "@/app/home/Header";
import MobileMenu from "@/components/header/MobileMenu";
import RelatedJobs from "@/components/job-single-pages/related-jobs/RelatedJobs";
import JobOverView from "@/components/job-single-pages/job-overview/JobOverView";
import JobSkills from "@/components/job-single-pages/shared-components/JobSkills";
import CompnayInfo from "@/components/job-single-pages/shared-components/CompanyInfo";
import JobDetailsDescriptions from "@/components/job-single-pages/shared-components/JobDetailsDescriptions";
import ApplyJobModalContent from "@/components/job-single-pages/shared-components/ApplyJobModalContent";
import Image from "next/image";

const JobSingleDynamicV1 = ({ params }) => {
 const resolvedParams = use(params);
  const [jobData, setJobData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/jobs/userjob/get-job?id=${resolvedParams.id}`);
        console.log(response.data);
        setJobData(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchJobData();
  }, [resolvedParams.id]);

  if (loading) {
    return <div className="text-center py-10">Loading job details...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">Error loading job: {error}</div>;
  }

  if (!jobData) {
    return <div className="text-center py-10">Job not found</div>;
  }

  // Construct job type array for UI

  const jobTypeArray = [{ type: jobData.jobType, styleClass: 'type-remote' }];
  
  // Convert responsibilities string to array of items
  const responsibilitiesList = jobData.keyResponsibilities
    .split('.')
    .map(item => item.trim())
    .filter(item => item.length > 0);
    const skillsandwork = jobData.skillsAndExperience
    .split('.')
    .map(item => item.trim())
    .filter(item => item.length > 0);
    const socialLinks = jobData.company?.socialLinks || [];

// You can place this component definition outside your main component
const SocialMediaLinks = ({ socialLinks }) => {
  // Helper function to get URL by platform name
  const getLinkByPlatform = (platform) => {
    const link = socialLinks.find(item => item.platform === platform);
    return link ? link.url : "#";
  };

  // Add http/https if missing from URL
  const formatUrl = (url) => {
    if (!url || url === "#") return "#";
    return url.startsWith("http") ? url : `https://${url}`;
  };
  
  return (
    <li>
      Social media:
      <div className="social-links">
        <a href={formatUrl(getLinkByPlatform("facebook"))} target="_blank" rel="noopener noreferrer">
          <i className="fab fa-facebook-f"></i>
        </a>
        <a href={formatUrl(getLinkByPlatform("twitter"))} target="_blank" rel="noopener noreferrer">
          <i className="fab fa-twitter"></i>
        </a>
        <a href={formatUrl(getLinkByPlatform("instagram"))} target="_blank" rel="noopener noreferrer">
          <i className="fab fa-instagram"></i>
        </a>
        <a href={formatUrl(getLinkByPlatform("linkedin"))} target="_blank" rel="noopener noreferrer">
          <i className="fab fa-linkedin-in"></i>
        </a>
      </div>
    </li>
  );
};
  return (
    <>
      {/* <!-- Header Span --> */}
      <span className="header-span"></span>

      <DefaulHeader />
      {/* <!--End Main Header --> */}

      <MobileMenu />
      {/* End MobileMenu */}

      {/* <!-- Job Detail Section --> */}
      <section className="job-detail-section">
        <div className="upper-box">
          <div className="auto-container">
            <div className="job-block-seven">
              <div className="inner-box">
                <div className="content">
                  <span className="company-logo">
                    <Image
                      width={100}
                      height={98}
                      src={`https://backend.rotaracthub.in/api/companies/get-image?companyId=${jobData.companyId}`}
                      className="rounded"
                      alt="company logo"
                    />
                  </span>
                  <h4>{jobData.jobRoleTitle}</h4>

                  <ul className="job-info">
                    <li>
                      <span className="icon flaticon-briefcase"></span>
                      {jobData.company.name}
                    </li>
                    {/* company info */}
                    <li>
                      <span className="icon flaticon-map-locator"></span>
                      {`${jobData.city}, ${jobData.country}`}
                    </li>
                    {/* location info */}
                    <li>
                      <span className="icon flaticon-clock-3"></span>{" "}
                      {new Date(jobData.posteddate).toLocaleDateString()}
                    </li>
                    {/* time info */}
                    <li>
                      <span className="icon flaticon-money"></span>{" "}
                      {`₹${jobData.offeredSalary}`}
                    </li>
                    {/* salary info */}
                  </ul>
                  {/* End .job-info */}

                  <ul className="job-other-info">
  {jobData.company.industry.split(',').map((val, i) => (
    <li
      key={i}
      className="btn btn-light px-3 py-1 rounded-pill"
      style={{
        backgroundColor: i === 0 ? "#b7d2f4d2" : i % 2 === 0 ? "#b7f4c2d2" : "#f0e1a8d2",
        color: i === 0 ? "#004085" : i % 2 === 0 ? "#155724" : "#856404", // Adjusted text colors
      }}
    >
      {val.trim()} {/* Trim removes extra spaces */}
    </li>
  ))}
</ul>

                  {/* End .job-other-info */}
                </div>
                {/* End .content */}

                <div className="btn-box">
                  <a
                    href="#"
                    className="theme-btn btn-style-one"
                    data-bs-toggle="modal"
                    data-bs-target="#applyJobModal"
                  >
                    Apply For Job
                  </a>
                </div>
                {/* End apply for job btn */}

                {/* <!-- Modal --> */}
                <div
                  className="modal fade"
                  id="applyJobModal"
                  tabIndex="-1"
                  aria-hidden="true"
                >
                  <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="apply-modal-content modal-content">
                      <div className="text-center">
                        <h3 className="title">Apply for this job</h3>
                        <button
                          type="button"
                          className="closed-modal"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      {/* End modal-header */}

                      <ApplyJobModalContent jobId={resolvedParams.id}/>
                      {/* End PrivateMessageBox */}
                    </div>
                    {/* End .send-private-message-wrapper */}
                  </div>
                </div>
                {/* End .modal */}
              </div>
            </div>
            {/* <!-- Job Block --> */}
          </div>
        </div>
        {/* <!-- Upper Box --> */}

        <div className="job-detail-outer">
          <div className="auto-container">
            <div className="row">
              <div className="content-column col-lg-8 col-md-12 col-sm-12">
                <div className="job-detail">
                  <h4>Job Description</h4>
                  <p>{jobData.jobDescription}</p>
                  
                  <h4>Key Responsibilities</h4>
                  <ul className="list-style-three">
                    {responsibilitiesList.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                  
                  <h4>Skills & Experience</h4>
                  <ul className="list-style-three">
                    {skillsandwork.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
                {/* End jobdetails content */}

                <div className="related-jobs">
                  <div className="title-box">
                    <h3>Related Jobs</h3>
                    <div className="text">
                      2020 jobs live - 293 added today.
                    </div>
                  </div>
                  {/* End title box */}

                  <RelatedJobs />
                </div>
                {/* <!-- Related Jobs --> */}
              </div>
              {/* End .content-column */}

              <div className="sidebar-column col-lg-4 col-md-12 col-sm-12">
                <aside className="sidebar">
                  <div className="sidebar-widget">
                    {/* <!-- Job Overview --> */}
                    <h4 className="widget-title">Job Overview</h4>
                    <div className="widget-content">
                      <ul className="job-overview">
                        <li>
                          <i className="icon icon-calendar"></i>
                          <h5>Date Posted:</h5>
                          <span>{new Date(jobData.posteddate).toLocaleDateString()}</span>
                        </li>
                        <li>
                          <i className="icon icon-expiry"></i>
                          <h5>Expiration date:</h5>
                          <span>{new Date(jobData.applicationDeadline).toLocaleDateString()}</span>
                        </li>
                        <li>
                          <i className="icon icon-location"></i>
                          <h5>Location:</h5>
                          <span>{jobData.completeAddress}</span>
                        </li>
                        <li>
                          <i className="icon icon-user-2"></i>
                          <h5>Career Level:</h5>
                          <span>{jobData.careerLevel}</span>
                        </li>
                        <li>
                          <i className="icon icon-clock"></i>
                          <h5>Experience:</h5>
                          <span>{jobData.experience}</span>
                        </li>
                        <li>
                          <i className="icon icon-rate"></i>
                          <h5>Salary:</h5>
                          <span>₹{jobData.offeredSalary}</span>
                        </li>
                        {/* <li>
                          <i className="icon icon-tag"></i>
                          <h5>Industry:</h5>
                          <span>{jobData.industry}</span>
                        </li> */}
                        <li>
                          <i className="icon icon-degree"></i>
                          <h5>Qualification:</h5>
                          <span>{jobData.qualification}</span>
                        </li>
                      </ul>
                    </div>

                    <h4 className="widget-title mt-4 ">Job Skills</h4>
                    <div className="widget-content">
                      <ul className="job-skills">
                        {jobData.skillsAndExperience.split(',').map((skill, index) => (
                          <li key={index}><a href="#">{skill.trim()}</a></li>
                        ))}
                      </ul>
                    </div>
                    {/* <!-- Job Skills --> */}
                  </div>
                  {/* End .sidebar-widget */}

                  <div className="sidebar-widget company-widget">
                    <div className="widget-content">
                      <div className="company-title">
                        <div className="company-logo">
                          <Image
                            width={54}
                            height={53}
                            src={`https://backend.rotaracthub.in/api/companies/get-image?companyId=${jobData.companyId}`}
                            className="rounded"
                            alt="resource"
                          />
                        </div>
                        <h5 className="company-name">{jobData.company.name}</h5>
                        <a href="#" className="profile-link">
                          View company profile
                        </a>
                      </div>
                      {/* End company title */}

                      <div className="company-info">
                        <ul>
                          <li>Primary industry: <span>{jobData.company.industry.split(',').slice(0,1)}</span></li>
                          <li>Company size: <span>{jobData.company.teamSize}</span></li>
                          <li>Founded in: <span>{jobData.company.establishedSince}</span></li>
                          <li>Phone: <span>{jobData.company.phone}</span></li>
                          <li>Email: <span>{jobData.company.user.emailAddress}</span></li>
                          <li>Location: <span>{`${jobData.city}, ${jobData.country}`}</span></li>

                          <ul>
                        {/* other list items... */}
                        {socialLinks.length > 0 ? 
                          <SocialMediaLinks socialLinks={socialLinks} /> :
                          <li>
                            Social media:
                            <div className="social-links">
                              <a href="#"><i className="fab fa-facebook-f"></i></a>
                              <a href="#"><i className="fab fa-twitter"></i></a>
                              <a href="#"><i className="fab fa-instagram"></i></a>
                              <a href="#"><i className="fab fa-linkedin-in"></i></a>
                            </div>
                          </li>
                        }
                      </ul>
                       
                        </ul>
                      </div>

                      <div className="btn-box">
                        <a
                          href={`mailto:${jobData.company.user.emailAddress}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="theme-btn btn-style-three"
                        >
                          Contact Employer
                        </a>
                      </div>
                      {/* End btn-box */}
                    </div>
                  </div>
                  {/* End .company-widget */}
                </aside>
                {/* End .sidebar */}
              </div>
              {/* End .sidebar-column */}
            </div>
          </div>
        </div>
        {/* <!-- job-detail-outer--> */}
      </section>
      {/* <!-- End Job Detail Section --> */}

      <FooterDefault footerStyle="alternate5" />
      {/* <!-- End Main Footer --> */}
    </>
  );
};

export default dynamic(() => Promise.resolve(JobSingleDynamicV1), {
  ssr: false,
});