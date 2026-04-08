import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

// const jobsArray = [1, 2, 3, 4, 5, 6, 7, 8];

const Jobs = () => {
  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);
  useEffect(() => {
    if (searchedQuery) {
      const filteredJobs = allJobs.filter((job) => {
        return (
          job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.location.toLowerCase().includes(searchedQuery.toLowerCase())
        );
      });
      setFilterJobs(filteredJobs);
    } else {
      setFilterJobs(allJobs);
    }
  }, [allJobs, searchedQuery]);
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
          {filterJobs.length <= 0 ? (
            <div className="flex-1 flex items-center justify-center h-[80vh]">
              <span className="text-[#6b5c45] text-lg font-medium font-serif">
                No jobs found
              </span>
            </div>
          ) : (
            <div className="flex-1 h-[88vh] overflow-y-auto pb-5 pr-1">
              <div className="grid grid-cols-3 gap-4">
                {filterJobs.map((job) => (
                  <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                    key={job?._id}
                  >
                    <Job job={job} />
                  </motion.div>
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
