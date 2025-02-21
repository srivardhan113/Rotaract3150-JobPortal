"use client"
import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import Image from "next/image";

const JobApplied = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/jobs/userjob/get-applied-jobs`, {
          userId:sessionStorage.getItem("userId"),
          applicantid:sessionStorage.getItem("userId"),  // Change to dynamic user ID
          page: 1,
          limit: 4,
          orderBy: "desc",
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("authToken")}`, // Example token
            "Content-Type": "application/json",
          }},);

        setJobs(response.data.data || []);
      } catch (err) {
        setError("Failed to load applied jobs.");
      } finally {
        setLoading(false);
      }
    };

    fetchAppliedJobs();
  }, []);

  if (loading) return <p>Loading applied jobs...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      {jobs.map((item) => (
        <div className="job-block col-lg-6 col-md-12 col-sm-12" key={item.id}>
          <div className="inner-box">
            <div className="content">
              <span className="company-logo">
                <Image width={50} height={49} className="rounded" src={`${process.env.NEXT_PUBLIC_API_URL}/api/companies/get-image?companyId=${item.job.companyId}`} alt="Company Logo" />
              </span>
              <h4>
                <Link href={`/job-single/${item.job.id}`}>{item.job.jobRoleTitle}</Link>
              </h4>

              <ul className="job-info m-0 p-0">
                <li>
                  <span className="icon flaticon-briefcase"></span>
                  {item.job.company.name}
                </li>
                <li>
                  <span className="icon flaticon-map-locator"></span>
                  {item.job.city}, {item.job.country}
                </li>
                
                {/* <li>
                  <span className="icon flaticon-money"></span>₹{item.job.offeredSalary || "Not Disclosed"}
                </li> */}
              </ul>
              <ul className="job-info p-0 mb-2">
              <li>
                  <span className="icon flaticon-clock-3"></span> {new Date(item.appliedAt).toLocaleDateString()}
                </li>
              <li>
                  <span className="icon flaticon-money"></span>₹{item.job.offeredSalary || "Not Disclosed"}
                </li>
              </ul>

              
              <ul className="job-other-info">
              <li
                    className={`btn btn-light px-3 py-1 rounded-pill`}
                    style={{
                      backgroundColor:"#b7f4c2d2" ,
                      color:  "#155724" 
                    }}
                  >{item.job.jobType || "Not Disclosed"}</li>
                {item.job.specialisms.split(',').slice(0,2).map((val, i) => (
                  <li
                    key={i}
                    className={`btn btn-light px-3 py-1 rounded-pill`}
                    style={{
                      backgroundColor: i === 0 ? "#b7d2f4d2" : i % 2 === 0 ? "#b7f4c2d2" : "#f0e1a8d2",
                      color: i === 0 ? "#ff001e" : i % 2 === 0 ? "#155724" : "#ed9b30",
                    }}
                  >
                    {val}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default JobApplied;
