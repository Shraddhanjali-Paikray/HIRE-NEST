import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";

const isResume = true;

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  // Handle both array and comma-separated string from backend
  const raw = user?.profile?.skills;
  const skills = Array.isArray(raw)
    ? raw.flatMap(s => s.split(",").map(x => x.trim())).filter(Boolean)
    : typeof raw === "string"
    ? raw.split(",").map(s => s.trim()).filter(Boolean)
    : [];

  return (
    <div className="bg-[#f5f0e8] min-h-screen">
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white border border-[#d9cdb8] rounded-2xl my-8 p-8 shadow-sm">
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-24 w-24 border-2 border-[#d9cdb8]">
              <AvatarImage src={user?.profile?.profilePhoto} alt="profile" />
            </Avatar>
            <div>
              <h1 className="font-bold text-xl text-[#2c2415] font-serif">{user?.fullname}</h1>
              <p className="text-[#6b5c45] text-sm mt-1">{user?.profile?.bio}</p>
            </div>
          </div>
          <Button
            onClick={() => setOpen(true)}
            variant="outline"
            className="border-[#d9cdb8] text-[#4a6741] hover:bg-[#f5f0e8] hover:border-[#4a6741]"
          >
            <Pen className="h-4 w-4" />
          </Button>
        </div>

        <div className="my-5 space-y-2">
          <div className="flex items-center gap-3 text-[#4a4035]">
            <Mail className="h-4 w-4 text-[#4a6741]" />
            <span className="text-sm">{user?.email}</span>
          </div>
          <div className="flex items-center gap-3 text-[#4a4035]">
            <Contact className="h-4 w-4 text-[#4a6741]" />
            <span className="text-sm">{user?.phoneNumber}</span>
          </div>
        </div>

        <div className="my-5">
          <h2 className="font-semibold text-[#2c2415] mb-2">Skills</h2>
          <div className="flex items-center gap-2 flex-wrap">
            {skills.length > 0
              ? skills.map((skill, index) => (
                  <Badge
                    key={index}
                    className="bg-[#e8e0cc] text-[#4a6741] border border-[#d4c9a8] hover:bg-[#ddd5bc]"
                  >
                    {skill}
                  </Badge>
                ))
              : <span className="text-[#9a8a6a] text-sm">NA</span>
            }
          </div>
        </div>

        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label className="text-sm font-semibold text-[#2c2415]">Resume</Label>
          {isResume ? (
            <a
              target="_blank"
              href={user?.profile?.resume}
              download={user?.profile?.resumeOriginalName}
              className="text-[#4a6741] text-sm hover:underline cursor-pointer"
            >
              {user?.profile?.resumeOriginalName}
            </a>
          ) : (
            <span className="text-[#9a8a6a] text-sm">NA</span>
          )}
        </div>
      </div>

      <div className="max-w-4xl mx-auto bg-white border border-[#d9cdb8] rounded-2xl p-8 mb-8 shadow-sm">
        <h1 className="font-bold text-lg text-[#2c2415] font-serif mb-4">Applied Jobs</h1>
        <AppliedJobTable />
      </div>

      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;