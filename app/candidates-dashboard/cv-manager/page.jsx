import dynamic from "next/dynamic";
import CvManager from "@/components/dashboard-pages/candidates-dashboard/cv-manager";

export const metadata = {
  title: "Rotaract3150 || Job portal || Sri Vardhan Yeluri || SRIPTO",
  description: "Rotaract3150 || Job portal || Sri Vardhan Yeluri || SRIPTO",
};

const index = () => {
  return (
    <>
      <CvManager />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
