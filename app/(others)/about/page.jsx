import dynamic from "next/dynamic";

import About from "@/components/pages-menu/about";

export const metadata = {
  title: "Rotaract3150 || Job portal || Sri Vardhan Yeluri || SRIPTO",
  description: "Rotaract3150 || Job portal || Sri Vardhan Yeluri || SRIPTO",
}



const index = () => {
  return (
    <>
      
      <About />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
