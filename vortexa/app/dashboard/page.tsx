import DisasterDashboard from "@/components/Dashboard";
import DisasterInfo from "@/components/disasterInfo";
import React from "react";

const Page: React.FC = () => {
  return (
    <div>
      <DisasterDashboard />
      <DisasterInfo />
    </div>
  );
};

export default Page;