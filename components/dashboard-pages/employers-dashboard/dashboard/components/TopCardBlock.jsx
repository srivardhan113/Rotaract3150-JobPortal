import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TopCardBlock = () => {
  const [stats, setStats] = useState({
    totalNoOfJobsPosted: 0,
    totalNoOfApplicants: 0,
    totalNoOfShortlistedApplicants: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Check if we're in browser environment
        if (typeof window === 'undefined') return;
        
        const companyId = sessionStorage.getItem('companyId'); // Use string 'companyId'
        if (!companyId) {
          throw new Error('Company ID not found in session storage');
        }

        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/jobs/companyjob/find-total-jobs-posted`,
          {
            params: { companyId }
          }
        );

        console.log('Full response:', response); // Log full response
        console.log('Response data:', response.data); // Log response data

        if (response.data) {
          setStats(response.data);
        } else {
          throw new Error('No data received from server');
        }
      } catch (err) {
        console.error('Error details:', err); // Log detailed error
        setError(
          err.response?.data?.message || 
          err.message || 
          'Failed to fetch stats'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const cardContent = [
    {
      id: 1,
      icon: "flaticon-briefcase",
      countNumber: stats.totalNoOfJobsPosted,
      metaName: "Posted Jobs",
      uiClass: "ui-blue",
    },
    {
      id: 2,
      icon: "la-file-invoice",
      countNumber: stats.totalNoOfApplicants,
      metaName: "Application",
      uiClass: "ui-red",
    },
    {
      id: 4,
      icon: "la-bookmark-o",
      countNumber: stats.totalNoOfShortlistedApplicants,
      metaName: "Shortlist",
      uiClass: "ui-green",
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full p-4">
        <div className="text-gray-500">Loading stats...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center w-full p-4">
        <div className="text-red-500">Error loading stats: {error}</div>
      </div>
    );
  }

  return (
    <>
      {cardContent.map((item) => (
        <div
          className="ui-block col-xl-3 col-lg-6 col-md-6 col-sm-12"
          key={item.id}
        >
          <div className={`ui-item ${item.uiClass}`}>
            <div className="left">
              <i className={`icon la ${item.icon}`}></i>
            </div>
            <div className="right">
              <h4>{item.countNumber}</h4>
              <p>{item.metaName}</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default TopCardBlock;