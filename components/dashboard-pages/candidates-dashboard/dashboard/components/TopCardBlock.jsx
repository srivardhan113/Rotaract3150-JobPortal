'use client'
import { useEffect, useState } from 'react';
import axios from 'axios';

const TopCardBlock = () => {
  const [data, setData] = useState({
    totalappliedjobs: 0,
    totalJobs: 0,
    totalshortedlistedjobs: 0
  });

  useEffect(() => {
    const fetchJobCounts = async () => {
      try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/jobs/userjob/gettotaljobscount`, {
          userId: sessionStorage.getItem('userId') // Replace this with dynamic userId when integrating with authentication
        });
        setData(response.data);
      } catch (error) {
        console.error('Error fetching job counts:', error);
      }
    };

    fetchJobCounts();
  }, []);

  const cardContent = [
    {
      id: 1,
      icon: "flaticon-briefcase",
      countNumber: data.totalappliedjobs,
      metaName: "Applied Jobs",
      uiClass: "ui-blue",
    },
    {
      id: 2,
      icon: "la-file-invoice",
      countNumber: data.totalJobs,
      metaName: "Job Alerts",
      uiClass: "ui-red",
    },
    {
      id: 4,
      icon: "la-bookmark-o",
      countNumber: data.totalshortedlistedjobs,
      metaName: "Shortlist",
      uiClass: "ui-green",
    },
  ];

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
