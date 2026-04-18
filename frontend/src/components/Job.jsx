import { Bookmark, BookmarkCheck, Clock } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import React from "react";
import logo from "../assets/NestLogo.svg";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleBookmark, toggleSaveForLater } from "@/redux/Savedjobsslice";
import { toast } from "sonner";

const Job = ({ job }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { bookmarked, savedForLater } = useSelector((store) => store.savedJobs);

  const isBookmarked = bookmarked.some((j) => j._id === job?._id);
  const isSavedForLater = savedForLater.some((j) => j._id === job?._id);

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
  };

  const handleBookmark = () => {
    dispatch(toggleBookmark(job));
    toast.success(isBookmarked ? "Bookmark removed" : "Job bookmarked!");
  };

  const handleSaveForLater = () => {
    dispatch(toggleSaveForLater(job));
    toast.success(isSavedForLater ? "Removed from saved" : "Saved for later!");
  };

  return (
    <div className="p-5 rounded-xl shadow-sm bg-[#fdfaf4] border border-[#e0d5c0] hover:shadow-md hover:border-[#c8b878] transition-all duration-200">

      {/* Top row */}
      <div className="flex items-center justify-between">
        <p className="text-xs text-[#9a8a6a]">
          {daysAgoFunction(job?.createdAt) === 0
            ? "Today"
            : `${daysAgoFunction(job?.createdAt)} days ago`}
        </p>
        <button
          onClick={handleBookmark}
          title={isBookmarked ? "Remove bookmark" : "Bookmark this job"}
          className="rounded-full p-1.5 hover:bg-[#f0ebe0] transition-colors duration-150"
        >
          {isBookmarked
            ? <BookmarkCheck size={16} className="text-[#4a6741]" />
            : <Bookmark size={16} className="text-[#4a3f2f]" />}
        </button>
      </div>

      {/* Company */}
      <div className="flex items-center gap-3 my-3">
        <Avatar className="w-10 h-10 border border-[#e0d5c0]">
          <AvatarImage src={job?.company?.logo} />
        </Avatar>
        <div>
          <h1 className="font-semibold text-[#2c2415] text-base">{job?.company?.name}</h1>
          <p className="text-xs text-[#9a8a6a]">{job?.location}</p>
        </div>
      </div>

      {/* Job title + description */}
      <div>
        <h1 className="font-bold text-[#2c2415] text-base my-1 font-serif">{job?.title}</h1>
        <p className="text-sm text-[#6b5c45] leading-relaxed line-clamp-3">
          {job?.description}
        </p>
      </div>

      {/* Badges */}
      <div className="flex items-center gap-2 mt-4 flex-wrap">
        <Badge className="text-[#4a6741] bg-[#eaf2e4] border-0 font-semibold text-xs">
          {job?.position} Position
        </Badge>
        <Badge className="text-[#8a4a20] bg-[#f5ece3] border-0 font-semibold text-xs">
          {job?.jobType}
        </Badge>
        <Badge className="text-[#2c2415] bg-[#e8e0cc] border-0 font-semibold text-xs">
          {job?.salary} LPA
        </Badge>
      </div>

      {/* Buttons */}
      <div className="flex items-center gap-3 mt-4">
        <Button
          onClick={() => navigate(`/description/${job?._id}`)}
          variant="outline"
          className="h-9 px-4 text-sm font-semibold border-[#d9cdb8] text-[#4a3f2f] hover:bg-[#f0ebe0] hover:border-[#4a6741] transition-colors duration-150"
        >
          Details
        </Button>
        <Button
          onClick={handleSaveForLater}
          className={`h-9 px-4 text-sm font-semibold transition-colors duration-150 flex items-center gap-1.5 ${
            isSavedForLater
              ? "bg-[#3a5233] hover:bg-[#2c3e27] text-white"
              : "bg-[#4a6741] hover:bg-[#3a5233] text-white"
          }`}
        >
          <Clock size={13} />
          {isSavedForLater ? "Saved ✓" : "Save For Later"}
        </Button>
      </div>

    </div>
  );
};

export default Job;