"use client";  // This makes it a Client Component

import MyResume from "@/components/dashboard-pages/candidates-dashboard/my-resume";

export const metadata = {
  title: "Rotaract3150 || Job portal || Sri Vardhan Yeluri || SRIPTO",
  description: "Rotaract3150 || Job portal || Sri Vardhan Yeluri || SRIPTO",
};

const Index = () => {
  return <MyResume />;
};

export default Index;  // No need for `next/dynamic`
