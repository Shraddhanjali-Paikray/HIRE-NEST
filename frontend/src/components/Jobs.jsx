import React, { useMemo } from "react";
import Navbar from "./shared/Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { applyFilters } from "./filterUtils";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const getFilteredJobs = (allJobs, searchedQuery) => {
  if (!searchedQuery) return allJobs;

  // Structured filter from FilterCard
  try {
    const parsed = JSON.parse(searchedQuery);
    const selected = {};
    Object.entries(parsed).forEach(([k, v]) => { selected[k] = new Set(v); });
    return applyFilters(allJobs, selected);
  } catch (_) {}

  // Plain text — match against title, company name, location, jobType
  const words = searchedQuery.toLowerCase().trim().split(/\s+/).filter(Boolean);
  if (!words.length) return allJobs;
  return allJobs.filter(job => {
    const searchable = [
      job.title,
      job.company?.name,
      job.location,
      job.jobType,
      job.description,
    ].filter(Boolean).join(' ').toLowerCase();
    return words.every(w => searchable.includes(w));
  });
};

const Jobs = () => {
  const { allJobs, searchedQuery } = useSelector((store) => store.job);

  const filterJobs = useMemo(() => getFilteredJobs(allJobs, searchedQuery), [allJobs, searchedQuery]);

  return (
    <div className="bg-[#f5f0e8] min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto mt-6 px-6">
        <div className="flex gap-6">
          <div className="w-[280px] flex-shrink-0"><FilterCard /></div>
          {filterJobs.length <= 0 ? (
            <div className="flex-1 flex items-center justify-center h-[80vh]">
              <span className="text-[#6b5c45] text-lg font-medium font-serif">No jobs found</span>
            </div>
          ) : (
            <div className="flex-1 h-[88vh] overflow-y-auto pb-5 pr-1">
              <div className="grid grid-cols-3 gap-4">
                {filterJobs.map((job) => (
                  <motion.div key={job?._id}
                    initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }} transition={{ duration: 0.3 }}
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