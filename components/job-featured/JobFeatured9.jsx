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
    { id: 2, name: "Full Time", value: "Full-time", isChecked: false },
    { id: 3, name: "Internship", value: "Internship", isChecked: false },
    { id: 4, name: "Part-time", value: "Part-time", isChecked: false },
  ]);
  const [jobFeatured, setJobFeatured] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  // Fetch jobs dynamically based on selected types
  const fetchJobs = async (selectedTypes) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `https://backend.rotaracthub.in/api/jobs/filter/v2`,
        {
          params: {
            jobType: selectedTypes.join(","),
            page: 1,
            limit: 5,
            sortField: "offeredSalary",
            sortOrder: "desc",
          },
        }
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

  // Update slider state and trigger job fetch
  const slideHandler = (id) => {
    const updatedSliders = jobSlider.map((slide) => {
      if (slide.id === id) {
        return { ...slide, isChecked: !slide.isChecked };
      }
      return slide;
    });

    setJobSlider(updatedSliders);

    const selectedTypes = updatedSliders
      .filter((slide) => slide.isChecked)
      .map((slide) => slide.value);

    dispatch(addLatestJob(selectedTypes));
    fetchJobs(selectedTypes);
  };

  // Fetch jobs on initial load (with default selections)
  useEffect(() => {
    const initialSelectedTypes = jobSlider
      .filter((slide) => slide.isChecked)
      .map((slide) => slide.value);

    fetchJobs(initialSelectedTypes);
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
                <span className="company-logo">
                  <Image
                    width={54}
                    height={53}
                    src={item.logo}
                    alt="item brand"
                  />
                </span>
                <h4>
                  <Link href={`/job-single/${item.id}`}>{item.jobRoleTitle}</Link>
                </h4>
                <ul className="job-info">
                  <li>
                    <span className="icon flaticon-briefcase"></span>
                    {item.companyId}
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
                    <span className="icon flaticon-money"></span> {item.offeredSalary}
                  </li>
                </ul>
              </div>
              <ul className="job-other-info">
                <li className="job-type">{item.jobType}</li>
              </ul>

              <a href="#" className="theme-btn btn-dark-blue">
                Apply Job
              </a>
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
