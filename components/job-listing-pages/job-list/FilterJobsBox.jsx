'use client'

import React, { useState, useEffect } from 'react';
import Link from "next/link";
import axios from 'axios';
import Pagination from "../components/Pagination";
import JobSelect from "../components/JobSelect";
import { useDispatch, useSelector } from "react-redux";
import {
  addCategory,
  addDatePosted,
  addExperienceSelect,
  addJobTypeSelect,
  addKeyword,
  addLocation,
  addPerPage,
  addSalary,
  addSort,
} from "../../../features/filter/filterSlice";

const FilterJobBox = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { jobList, jobSort } = useSelector((state) => state.filter);
  const { keyword, location, category, jobTypeSelect, experienceSelect, salary ,datePosted} = jobList || {};
  const [currentPage, setCurrentPage] = useState(1);
const [totalPages, setTotalPages] = useState(1); // Default 1, to be updated by the API

  const { sort, perPage } = jobSort;
  const dispatch = useDispatch();

  // Fetch jobs from API
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://backend.rotaracthub.in/api/jobs/filter/v2?page=${currentPage}`
        );
        setJobs(response.data.data);
        setTotalPages(response.data.totalPages || 1); // Update total pages if the API provides it
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };
  
    fetchJobs();
  }, [currentPage]);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
    

  // Filter functions
  const keywordFilter = (item) =>
    keyword !== "" ? item.jobRoleTitle.toLowerCase().includes(keyword.toLowerCase()) : true;

  const locationFilter = (item) =>
    location !== "" ? item.city.toLowerCase().includes(location.toLowerCase()) : true;

  const categoryFilter = (item) =>
    category !== "" ? item.industry.toLowerCase() === category.toLowerCase() : true;

  const jobTypeFilter = (item) => {
    // Normalize both values to be lowercase and replace spaces with hyphens
    const normalize = (str) =>
      str?.trim().toLowerCase().replace(/\s+/g, "-");
  
    const selectedJobType = normalize(jobTypeSelect);
    const itemJobType = normalize(item.jobType);
  
    return selectedJobType ? itemJobType === selectedJobType : true;
  };
  
  const experienceFilter = (item) => {
    console.log("Original Item Experience:", item.experience, "Selected Experience:", experienceSelect);
  
    if (experienceSelect === "") return true; // If no selection, include all items
  
    // Extract the first number from `item.experience`
    const minExperience = parseInt(item.experience.match(/\d+/)?.[0], 10);
  
    // Extract the first number from `experienceSelect`
    const selectedExperience = parseInt(experienceSelect.match(/\d+/)?.[0], 10);
  
    console.log("Min Experience:", minExperience, "Selected Experience:", selectedExperience);
  
    // Compare the two numbers
    return minExperience === selectedExperience;
  };
  

  // const salaryFilter = (item) =>
  //   (!salary?.min || item.offeredSalary >= salary.min) &&
  //   (!salary?.max || item.offeredSalary <= salary.max);

  const sortFilter = (a, b) => (sort === "des" ? b.id - a.id : a.id - b.id);

  // Handlers
  const sortHandler = (e) => {
    dispatch(addSort(e.target.value));
  };

  const perPageHandler = (e) => {
    const value = JSON.parse(e.target.value);
    dispatch(addPerPage(value));
  };

  const clearAll = () => {
    dispatch(addKeyword(""));
    dispatch(addLocation(""));
    dispatch(addCategory(""));
    dispatch(addJobTypeSelect(""));
    dispatch(addExperienceSelect(""));
    dispatch(addSalary({ min: 0, max: 20000 }));
    dispatch(addSort(""));
    dispatch(addPerPage({ start: 0, end: 16 }));
  };

  // Apply filters and sort
  let content = jobs
    .filter(keywordFilter)
    .filter(locationFilter)
    .filter(categoryFilter)
    .filter(jobTypeFilter)
    .filter(experienceFilter)
    .sort(sortFilter)
    .slice(perPage.start, perPage.end || 16)
    .map((item) => (
      <div key={item.id} className="job-block col-lg-6 col-md-12 col-sm-12">
        <div className="inner-box">
          <div className="content">
            <h4>
              <Link href={`/job-single/${item.id}`}>{item.jobRoleTitle}</Link>
            </h4>
            <ul className="job-info">
              <li>
                <span className="icon flaticon-briefcase"></span>
                {item.specialisms}
              </li>
              <li>
                <span className="icon flaticon-map-locator"></span>
                {item.city}, {item.country}
              </li>
              <li>
                <span className="icon flaticon-money"></span> ${item.offeredSalary}
              </li>
              <li>
                <span className="icon flaticon-clock-3"></span> {item.careerLevel}
              </li>
              <li className={`${item.jobType.toLowerCase().replace(' ', '-')}`}>
                {item.jobType}
              </li>
            </ul>
         
          </div>
        </div>
      </div>
    ));

  if (loading) return <div>Loading jobs...</div>;
  if (error) return <div>Error loading jobs: {error.message}</div>;

  return (
    <>
      <div className="ls-switcher">
        <JobSelect />
        <div className="sort-by">
          {(keyword || location || category || jobTypeSelect || experienceSelect || salary?.min || salary?.max || sort || perPage.start || perPage.end) && (
            <button
              onClick={clearAll}
              className="btn btn-danger text-nowrap me-2"
              style={{ minHeight: "45px", marginBottom: "15px" }}
            >
              Clear All
            </button>
          )}

          <select
            value={sort}
            className="chosen-single form-select"
            onChange={sortHandler}
          >
            <option value="">Sort by (default)</option>
            <option value="asc">Newest</option>
            <option value="des">Oldest</option>
          </select>

          <select
            className="chosen-single form-select ms-3"
            value={JSON.stringify(perPage)}
            onChange={perPageHandler}
          >
            <option value={JSON.stringify({ start: 0, end: 0 })}>All</option>
            <option value={JSON.stringify({ start: 0, end: 10 })}>10 per page</option>
            <option value={JSON.stringify({ start: 0, end: 20 })}>20 per page</option>
            <option value={JSON.stringify({ start: 0, end: 30 })}>30 per page</option>
          </select>
        </div>
      </div>
      <div className="row">{content}</div>
      <Pagination/>
    </>
  );
};

export default FilterJobBox;
