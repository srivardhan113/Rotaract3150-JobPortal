import { useState, useEffect } from 'react';
import Link from "next/link";
import Image from "next/image";
import axios from 'axios';
import Pagination from "@/components/job-listing-pages/components/Pagination";

const Applicants = ({ companyId }) => {
  const [state, setState] = useState({
    applicants: [],
    loading: true,
    error: null,
    page: 1,
    totalPages: 1,
    searchQuery: '',
    sortBy: 'Newest'
  });

  useEffect(() => {
    const timeoutId = setTimeout(fetchApplicants, 500);
    return () => clearTimeout(timeoutId);
  }, [state.page, state.searchQuery, state.sortBy]);

  const fetchApplicants = async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/jobs/companyjob/findapplicants`,
        {
          companyId: sessionStorage.getItem("companyId"),
          userId:sessionStorage.getItem("userId"),
          page: state.page,
          limit: 6,
          status: "Shortlisted",
          search: state.searchQuery,
          sortBy: state.sortBy
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("authToken")}`, // Example token
            "Content-Type": "application/json",
          }},
      );

      const transformedApplicants = response.data.applicants.map(app => ({
        id: app.id,
        applicantId: app.applicantId,
        name: app.applicant.name,
        avatar: `https:backend.rotaracthub.in/api/users/get-user-image?userId=${app.applicantId}`,
        designation: app.job.jobRoleTitle,
        location: `${app.job.city}, ${app.job.country}`,
        hourlyRate: app.job.offeredSalary,
        tags: [app.job.jobType, app.status]
      }));

      setState(prev => ({
        ...prev,
        applicants: transformedApplicants,
        totalPages: response.data.totalPages,
        loading: false
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error.response?.data?.error || 'Failed to fetch applicants',
        loading: false
      }));
      console.error('Error fetching applicants:', error);
    }
  };

  const handlePageChange = (newPage) => {
    setState(prev => ({ ...prev, page: newPage }));
  };

  const handleSearchChange = (e) => {
    setState(prev => ({
      ...prev,
      searchQuery: e.target.value,
      page: 1
    }));
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
  const handleSortChange = (e) => {
    setState(prev => ({
      ...prev,
      sortBy: e.target.value,
      page: 1
    }));
  };

  if (state.loading) return <div>Loading...</div>;
  if (state.error) return <div>{state.error}</div>;

  return (
    <>
      <div className="widget-title">
        <h4>Shortlisted Resumes</h4>
        {/* Filter Widget */}
        <div className="chosen-outer">
          <div className="search-box-one">
            <div className="form-group">
              <span className="icon flaticon-search-1"></span>
              <input
                type="search"
                name="search-field"
                placeholder="Search"
                value={state.searchQuery}
                onChange={handleSearchChange}
              />
            </div>
          </div>

          <select 
            className="chosen-single form-select chosen-container"
            value={state.sortBy}
            onChange={handleSortChange}
          >
            <option>Newest</option>
            <option>Last 12 Months</option>
            <option>Last 16 Months</option>
            <option>Last 24 Months</option>
            <option>Last 5 year</option>
          </select>
        </div>
      </div>
      <div className="widget-content">
      <div className="row">
      {state.applicants.map((candidate) => (
        <div
          className="candidate-block-three col-lg-6 col-md-12 col-sm-12"
          key={candidate.id}
        >
          <div className="inner-box m-2" style={{ boxShadow: "0px 1px 8px rgba(0, 0, 0, 0.15)" }}>
            <div className="content">
              <figure className="image">
                <Image
                  className='rounded-full'
                  width={120}
                  height={90}
                  src={candidate.avatar}
                  alt="candidates"
                />
              </figure>
              <h4 className="name p-0">
                <Link href={`/candidates-single/${candidate.id}/${candidate.applicantId}`}>
                  {candidate.name}
                </Link>
              </h4>

              <ul className="candidate-info">
                <li className="designation">{candidate.designation}</li>
              </ul>
              
              <ul className="candidate-info">
                <li>
                  <span className="icon flaticon-map-locator"></span>{" "}
                  {candidate.location}
                </li>
                <li>
                  <span className="icon flaticon-money"></span> $
                  {candidate.hourlyRate} 
                </li>
              </ul>

              <ul className="post-tags">
                {candidate.tags.map((val, i) => (
                  <li key={i}>
                    <a href="#">{val}</a>
                  </li>
                ))}
              </ul>
              <div className="option-box m-3">
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
    


  <nav className="ls-pagination ">
    <Pagination 
      currentPage={state.page}
      totalPages={state.totalPages}
      onPageChange={handlePageChange}
    />
  </nav>
  </div>
  </div>

    </>
  );
};

export default Applicants;