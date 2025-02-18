"use client";
import dynamic from "next/dynamic";
import ManageJobs from "@/components/dashboard-pages/employers-dashboard/manage-jobs";
import ManageJobsChild from "@/components/dashboard-pages/employers-dashboard/managejobschild";

// export const metadata = {
//   title: "Rotaract3150 || Job portal || Sri Vardhan Yeluri || SRIPTO",
//   description: "Rotaract3150 || Job portal || Sri Vardhan Yeluri || SRIPTO",
// };

const index = () => {
  return (
    <>
      <ManageJobsChild/>
    </>
  );
};

export default dynamic(() => Promise.resolve(index));
