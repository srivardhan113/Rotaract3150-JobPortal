'use client';

import Link from "next/link";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addLatestJob } from "../../features/job/jobSlice";
import axios from "axios";
import Image from "next/image";

const JobFeatured = () => {
  const { latestJob } = useSelector((state) => state.job);
  const [jobSlider, setJobSlider] = useState([
    { id: 1, name: "Freelancer", value: "Freelancer", isChecked: false },
    { id: 2, name: "Full-Time", value: "Full Time", isChecked: false },
    { id: 3, name: "Internship", value: "Internship", isChecked: false },
    { id: 4, name: "Part-time", value: "Part Time", isChecked: false },
  ]);
  const [jobFeatured, setJobFeatured] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  // Fetch jobs based on selected type
  const fetchJobs = async (selectedType) => {
    setLoading(true);
    setError(null);

    try {
      const requestBody = {
        jobType: selectedType,
        page: 1,
        limit: 5,
        sortField: "offeredSalary",
        sortOrder: "desc",
      };
      
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/jobs/userjob/filterjobs`,
        requestBody
      );

      if (response.data.success && response.data.data.length > 0) {
        setJobFeatured(response.data.data);
      } else {
        setJobFeatured([]);
        setError("No jobs found matching your criteria.");
      }
    } catch (err) {
      setError("Failed to fetch jobs.");
    } finally {
      setLoading(false);
    }
  };

  // Handle job type selection
  const slideHandler = (id) => {
    const updatedSliders = jobSlider.map((slide) => ({
      ...slide,
      isChecked: slide.id === id ? !slide.isChecked : false
    }));

    setJobSlider(updatedSliders);

    // Find the selected type, if any
    const selectedSlide = updatedSliders.find(slide => slide.isChecked);
    const selectedType = selectedSlide ? selectedSlide.value : '';

    dispatch(addLatestJob(selectedType ? [selectedType] : []));
    fetchJobs(selectedType);
  };

  // Fetch jobs on initial load
  useEffect(() => {
    fetchJobs(''); // Initial fetch with no type filter
  }, []);

  return (
    <>
      <div className="mb-50">
        <ul className="switchbox -horizontal">
          {jobSlider?.map((slide) => (
            <li key={slide.id}>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={slide.isChecked}
                  onChange={() => slideHandler(slide.id)}
                />
                <span className="slider round"></span>
                <span className="title">{slide.name}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>

      {loading && <p>Loading jobs...</p>}
      {error && <p>{error}</p>}

      {jobFeatured.length > 0 ? (
        jobFeatured.slice(0, 6).map((item) => (
          <div className="job-block-five" key={item.id}>
            <div className="inner-box">
              <div className="content">
                <span className="company-logo rounded">
                  <Image
                    width={50}
                    height={49}
                    src={`https://backend.rotaracthub.in/api/companies/get-image?companyId=${item.companyId}`}
                    alt="logo"
                    className="rounded"
                  />
                </span>
                <h4>
                  <Link href={`/job-single/${item.id}`}>
                    {item.jobRoleTitle}
                  </Link>
                </h4>
                <ul className="job-info">
                  <li>
                    <span className="icon flaticon-briefcase"></span>
                    {item.company.name}
                  </li>
                  <li>
                    <span className="icon flaticon-map-locator"></span>
                    {item.city}
                  </li>
                  <li>
                    <span className="icon flaticon-clock-3"></span>
                    {item.applicationDeadline.slice(0, 10)}
                  </li>
                  <li>
                    <span className="icon flaticon-money"></span> ₹
                    {item.offeredSalary}
                  </li>
                </ul>
              </div>
              <ul className="job-other-info">
                <li className="btn btn-light text-danger px-3 py-1 rounded-pill" style={{backgroundColor:"#b7d2f4d2"}}>{item.jobType}</li>
              </ul>

              <Link href={`/job-single/${item.id}`} className="theme-btn btn-dark-blue">
                Apply Job
              </Link>
            </div>
          </div>
        ))
      ) : (
        !loading && <p>No jobs found for the selected filters.</p>
      )}
    </>
  );
};

export default JobFeatured;