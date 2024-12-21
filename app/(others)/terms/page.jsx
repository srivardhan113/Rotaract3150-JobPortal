import dynamic from "next/dynamic";

import Terms from "@/components/pages-menu/terms";

export const metadata = {
  title: "Rotaract3150 || Job portal || Sri Vardhan Yeluri || SRIPTO",
  description: "Rotaract3150 || Job portal || Sri Vardhan Yeluri || SRIPTO",
  
}



const index = () => {
  return (
    <>
      
      <Terms />
    </>
  );
};

export default dynamic(() => Promise.resolve(index));
