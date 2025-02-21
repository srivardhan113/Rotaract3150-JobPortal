"use client";
import { useEffect, useState, use } from "react";
import dynamic from "next/dynamic";
import axios from "axios";
import Image from "next/image";
import FooterDefault from "@/app/home/Footer";
import DefaulHeader from "@/app/home/Header";
import MobileMenu from "@/components/header/MobileMenu";

const CandidateSingleDynamicV1 = ({ params }) => {
  const resolvedParams = use(params);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/users/getuserprofile?id=${resolvedParams.id2}&userId=${sessionStorage.getItem("userId")}`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
            "Content-Type": "application/json",
          }
        });
        setProfile(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProfile();
  }, [resolvedParams.id2]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!profile) return <div>Profile not found</div>;

  // Convert comma-separated strings to arrays
  const skillsArray = profile.applicantProfile.skills.split(', ');
  const languagesArray = profile.applicantProfile.languages.split(', ');
  const educationLevelsArray = profile.applicantProfile.educationLevels.split(', ');

  return (
    <>
      <span className="header-span"></span>
      <DefaulHeader />
      <MobileMenu />

      <section className="candidate-detail-section">
        <div className="upper-box">
          <div className="auto-container">
            <div className="candidate-block-five">
              <div className="inner-box">
                <div className="content">
                  <figure className="image">
                    <Image
                      width={100}
                      height={100}
                      src={`https:backend.rotaracthub.in/api/users/get-user-image?userId=${resolvedParams.id2}`}
                      alt={profile.applicantProfile.fullLegalName}
                    />
                  </figure>
                  <h4 className="name">{profile.applicantProfile.fullLegalName}</h4>

                  <ul className="candidate-info">
                    <li className="designation">{profile.applicantProfile.jobTitle}</li>
                    <li>
                      <span className="icon flaticon-map-locator"></span>
                      {`${profile.applicantProfile.city}, ${profile.applicantProfile.state}, ${profile.applicantProfile.country}`}
                    </li>
                    <li>
                      <span className="icon flaticon-phone"></span>
                      {profile.applicantProfile.phoneNumber}
                    </li>
                    <li>
                      <span className="icon flaticon-mail"></span>
                      {profile.applicantProfile.emailAddress}
                    </li>
                  </ul>

                  <ul className="post-tags">
                    {skillsArray.map((skill, i) => (
                      <li key={i}>{skill}</li>
                    ))}
                  </ul>
                </div>

                <div className="btn-box">
                  <a
                    className="theme-btn btn-style-one"
                    href={`https://backend.rotaracthub.in/api/jobs//companyjob/download-cv?applicationId=${resolvedParams.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    CV Download
                  </a>
                  {/* <button className="bookmark-btn">
                    <i className="flaticon-bookmark"></i>
                  </button> */}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="candidate-detail-outer">
          <div className="auto-container">
            <div className="row">
              <div className="content-column col-lg-8 col-md-12 col-sm-12">
                <div className="job-detail">
                  <div className="description-text">
                    <h4>About Me</h4>
                    <p>{profile.applicantProfile.description}</p>
                  </div>

                  {/* Education */}
                  <div className="resume-outer theme-blue">
                    <div className="upper-title">
                      <h4>Education</h4>
                    </div>
                    {profile.education.map((edu) => (
                      <div className="resume-block" key={edu.id}>
                        <div className="inner">
                        <span className="name">{edu.institution?.charAt(0)}</span>
                          <div className="title-box">
                            <div className="info-box">
                              <h3>{edu.degree}</h3>
                              <span>{edu.institution}</span>
                            </div>
                            <div className="edit-box">
                              <span className="year">{`${edu.startYear} - ${edu.endYear}`}</span>
                            </div>
                          </div>
                          <div className="text">{edu.description}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Work Experience */}
                  <div className="resume-outer theme-yellow">
                    <div className="upper-title">
                      <h4>Work Experience</h4>
                    </div>
                    {profile.experiences.map((exp) => (
                      <div className="resume-block" key={exp.id}>
                        <div className="inner">
                        <span className="name">{exp.companyName?.charAt(0)}</span>
                          <div className="title-box">
                            <div className="info-box">
                              <h3>{exp.jobTitle}</h3>
                              <span>{exp.companyName}</span>
                            </div>
                            <div className="edit-box">
                              <span className="year">{`${exp.startYear} - ${exp.endYear}`}</span>
                            </div>
                          </div>
                          <div className="text">{exp.description}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Achievements */}
                  <div className="resume-outer theme-green">
                    <div className="upper-title">
                      <h4>Achievements</h4>
                    </div>
                    {profile.achievements.map((achievement) => (
                      <div className="resume-block" key={achievement.id}>
                        <div className="inner">
                        <span className="name">{achievement.title?.charAt(0)}</span>
                          <div className="title-box">
                            <div className="info-box">
                              <h3>{achievement.title}</h3>
                            </div>
                            <div className="edit-box">
                              <span className="year">{achievement.year}</span>
                            </div>
                          </div>
                          <div className="text">{achievement.description}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="sidebar-column col-lg-4 col-md-12 col-sm-12">
                <aside className="sidebar">
                  <div className="sidebar-widget">
                    <div className="widget-content">
                      <ul className="job-overview">
                        <li>
                          <i className="icon icon-calendar"></i>
                          <h5>Experience:</h5>
                          <span>{profile.experiences.length > 0 ? 
                            `${profile.experiences[0].startYear} - Present` : 
                            'No experience listed'}</span>
                        </li>

                        <li>
                          <i className="icon icon-expiry"></i>
                          <h5>Age Range:</h5>
                          <span>{profile.applicantProfile.ageRange}</span>
                        </li>

                        <li>
                          <i className="icon icon-rate"></i>
                          <h5>Current Salary:</h5>
                          <span>${parseFloat(profile.applicantProfile.currentSalary).toLocaleString()}</span>
                        </li>

                        <li>
                          <i className="icon icon-salary"></i>
                          <h5>Expected Salary:</h5>
                          <span>${parseFloat(profile.applicantProfile.expectedSalary).toLocaleString()}</span>
                        </li>

                        <li>
                          <i className="icon icon-language"></i>
                          <h5>Languages:</h5>
                          <span>{languagesArray.join(", ")}</span>
                        </li>

                        <li>
                          <i className="icon icon-degree"></i>
                          <h5>Education Level:</h5>
                          <span>{educationLevelsArray.join(", ")}</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="sidebar-widget social-media-widget">
                    <h4 className="widget-title">Social media</h4>
                    <div className="widget-content">
                      <div className="social-links">
                        {profile.socialLinks.map((link) => (
                          <a 
                            key={link.id} 
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`fab fa-${link.platform.toLowerCase()}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="sidebar-widget">
                    <h4 className="widget-title">Professional Skills</h4>
                    <div className="widget-content">
                      <ul className="job-skills">
                        {skillsArray.map((skill, index) => (
                          <li key={index}> <a href="#">{skill}</a></li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </aside>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FooterDefault footerStyle="alternate5" />
    </>
  );
};

export default dynamic(() => Promise.resolve(CandidateSingleDynamicV1), {
  ssr: false,
});