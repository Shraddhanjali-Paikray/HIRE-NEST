import { Badge } from "./ui/Badge";
import React, { useEffect } from "react";
import { Button } from "./ui/Button";
import Navbar from "./shared/Navbar";
import { useParams } from "react-router-dom";
import { setSingleJob } from "@/redux/jobSlice";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constant";
import { useDispatch, useSelector } from "react-redux";

const JobDescription = () => {
  const isApplied = true;
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });
        console.log(res)
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  return (
    <div className="bg-[#f5f0e8] min-h-screen">
      <Navbar />
      <div className="max-w-4xl mx-auto my-10 px-6 flex flex-col gap-4">
        {/* Header card */}
        <div className="bg-[#fdfaf4] border border-[#e0d5c0] rounded-2xl p-8 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="font-bold text-2xl font-serif text-[#2c2415]">
                {singleJob?.title}
              </h1>
              <div className="flex items-center gap-2 mt-4 flex-wrap">
                <Badge className="text-[#4a6741] bg-[#eaf2e4] border-0 font-semibold text-xs">
                  {singleJob?.position} Positions
                </Badge>
                <Badge className="text-[#8a4a20] bg-[#f5ece3] border-0 font-semibold text-xs">
                  {singleJob?.jobType}
                </Badge>
                <Badge className="text-[#2c2415] bg-[#e8e0cc] border-0 font-semibold text-xs">
                  {singleJob?.salary} LPA
                </Badge>
              </div>
            </div>
            <Button
              disabled={isApplied}
              className={`rounded-lg font-semibold text-sm h-10 px-5 transition-colors duration-150 ${
                isApplied
                  ? "bg-[#9a8a6a] cursor-not-allowed text-white"
                  : "bg-[#4a6741] hover:bg-[#3a5233] text-white"
              }`}
            >
              {isApplied ? "Already Applied" : "Apply Now"}
            </Button>
          </div>
        </div>

        {/* Details card */}
        <div className="bg-[#fdfaf4] border border-[#e0d5c0] rounded-2xl p-8 shadow-sm">
          <h1 className="font-bold text-lg font-serif text-[#2c2415] pb-4 border-b border-[#e0d5c0]">
            {singleJob?.description}
          </h1>
          <div className="mt-5 flex flex-col gap-3">
            {[
              { label: "Role", value: singleJob?.title },
              { label: "Location", value: singleJob?.location },
              { label: "Description", value: singleJob?.description },
              {
                label: "Experience",
                value: `${singleJob?.experienceLevel} yrs`,
              },
              { label: "Salary", value: `${singleJob?.salary} LPA` },
              {
                label: "Total Applicants",
                value: singleJob?.applications?.length || 0,
              },
              {
                label: "Posted Date",
                value: new Date(singleJob?.createdAt).toLocaleDateString(),
              },
            ].map((item, index) => (
              <div key={index} className="flex gap-2 text-sm">
                <span className="font-semibold text-[#2c2415] min-w-[150px]">
                  {item.label}:
                </span>
                <span className="text-[#6b5c45]">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDescription;
