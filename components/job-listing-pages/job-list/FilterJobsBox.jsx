'use client'
import Image from 'next/image';
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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const { jobList, jobSort } = useSelector((state) => state.filter);
  const { 
    keyword: searchbar, 
    location: city, 
    category: tags, 
    jobTypeSelect: jobType, 
    experienceSelect: experienceLevel, 
    salary,
    datePosted 
  } = jobList || {};
  
  const { sort, perPage } = jobSort;
  const dispatch = useDispatch();

  const clearAll = () => {
    dispatch(addKeyword(""));
    dispatch(addLocation(""));
    dispatch(addCategory(""));
    dispatch(addJobTypeSelect(""));
    dispatch(addExperienceSelect(""));
    dispatch(addDatePosted(""));
    dispatch(addSalary({ min: 0 ,max:200000000}));
    dispatch(addSort(""));
    dispatch(addPerPage({ start: 0, end: 16 }));
    setCurrentPage(1);
  };
  useEffect(() => {
    // Run clearAll when component mounts
    clearAll();

    // Optional: Run on window reload
    const handleBeforeUnload = () => {
        clearAll();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    // Cleanup listener
    return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
    };
}, []); // Empty
  // Add new useEffect for clearing filters on load/reload
 

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        
        const requestBody = {
          page: currentPage,
          limit:8,
          sortField: "applicationDeadline",
          sortOrder: sort === "des" ? "desc" : "asc",
          ...(searchbar && { searchbar }),
          ...(city && { city }),
          ...(jobType && { jobType }),
          ...(experienceLevel && { experienceLevel }),
          ...(datePosted && datePosted !== "All" && { datePosted }),
          ...(salary?.min && { minSalary: parseFloat(salary.min) }),
          ...(salary?.max && { maxSalary: parseFloat(salary.max) }),
          ...(tags && { tags })
        };

        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/jobs/userjob/filterjobs`,
          requestBody
        );
        console.log(response.data);
        if (response.data.success) {
          setJobs(response.data.data);
          setTotalPages(response.data.pagination.totalPages);
        } else {
          setError(new Error(response.data.message || 'Failed to fetch jobs'));
        }
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchJobs();
  }, [
    currentPage,
    searchbar,
    city,
    jobType,
    experienceLevel,
    datePosted,
    salary,
    tags,
    sort,
    perPage
  ]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const sortHandler = (e) => {
    dispatch(addSort(e.target.value));
  };

  const perPageHandler = (e) => {
    const value = JSON.parse(e.target.value);
    dispatch(addPerPage(value));
  };

  if (loading) return <div>Loading jobs...</div>;
  if (error) return <div>Error loading jobs: {error.message}</div>;

  const content = jobs.map((item) => (
    <div key={item.id} className="job-block col-lg-6 col-md-12 col-sm-12">
      <div className="inner-box" style={{"height":"182px"}}>
        <div className="content">
          <span className="company-logo">
          <Image
              width={50}
               height={49}
                src={`${process.env.NEXT_PUBLIC_API_URL}/api/companies/get-image?companyId=${item.companyId}`}
                alt="logo"
                className='rounded'
                />
          </span>
          {console.log(item.company.name)}
          <h4>
            <Link href={`/job-single/${item.id}`}>{item.jobRoleTitle}</Link>
          </h4>
          <ul className="job-info">
            <li>
              <span className="icon flaticon-briefcase"></span>
              {item.company.name}
            </li>
            <li>
              <span className="icon flaticon-map-locator"></span>
              {item.city}, {item.country}
            </li>
            <li>
              <span className="icon flaticon-money"></span> ${item.offeredSalary}
            </li>
            <li>
              <span className="icon flaticon-clock-3"></span> {item.posteddate.slice(0,10)}
            </li>
          </ul>
          <ul className="job-other-info">
  {item.specialisms.split(", ").map((specialism, index) => (
    <li 
      key={index} 
      className="btn btn-light  px-3 py-1 rounded-pill" 
      style={{ 
        backgroundColor: index == 0 ? "#c7dcf6d2" : index % 2 === 0 ? "#c7f7d0d2" : "#f3ecd0d2",
        color: index == 0 ? "#dc3545" : index % 2 === 0 ? "#009f1dd2" : "#caa616d2"
      }}
    >
      {specialism}
    </li>
  ))}
</ul>

        </div>
      </div>
    </div>
  ));

  return (
    <>
      <div className="ls-switcher">
        <JobSelect />
        <div className="sort-by">
          {(searchbar || city || tags || jobType || experienceLevel || datePosted || salary?.min||salary?.max|| sort || perPage.start || perPage.end) && (
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
      <Pagination 
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default FilterJobBox;