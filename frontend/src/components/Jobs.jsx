import React from "react";
import Navbar from "./shared/Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { useSelector } from "react-redux";

// const jobsArray = [1, 2, 3, 4, 5, 6, 7, 8];

const Jobs = () => {
  const {allJobs} = useSelector(store=>store.job);
  return (
    <div className="bg-[#f5f0e8] min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto mt-6 px-6">
        <div className="flex gap-6">

          {/* Filter sidebar */}
          <div className="w-[280px] flex-shrink-0">
            <FilterCard />
          </div>

          {/* Job cards */}
          {allJobs.length <= 0 ? (
            <div className="flex-1 flex items-center justify-center h-[80vh]">
              <span className="text-[#6b5c45] text-lg font-medium font-serif">
                No jobs found
              </span>
            </div>
          ) : (
            <div className="flex-1 h-[88vh] overflow-y-auto pb-5 pr-1">
              <div className="grid grid-cols-3 gap-4">
                {allJobs.map((job) => (
                  <div key={job?._id}>
                    <Job job={job}  />

                  </div>
                  
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Jobs;