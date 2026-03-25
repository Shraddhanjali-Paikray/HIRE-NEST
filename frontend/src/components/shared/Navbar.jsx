import React from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/Button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Link, useNavigate } from "react-router-dom";
import { User2, LogOut } from "lucide-react";
import { Outlet } from "react-router-dom";
import NestLogo from "@/assets/NestLogo.svg";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth); //this gets logged in user data
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      }); //send request to backend logout route
      if (res.data.success) {
        dispatch(setUser(null)); //removes user from global state
        navigate("/"); //go to home page
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="bg-[#fdfaf4] border-b border-[#e0d5c0] shadow-sm">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-6">
        {/* // shows app logo +title */}
        <div className="flex items-center gap-2">
          <img
            src={NestLogo}
            alt="Hire Nest Logo"
            className="h-10 w-auto object-contain -mt-3"
          />
          <h1 className="text-2xl font-bold font-serif tracking-wide">
            <span className="text-[#4a6741]">HIRE</span>
            <span className="text-[#2c2415]"> NEST</span>
          </h1>
        </div>

        <div className="flex items-center gap-5">
          {/* These connect to your routes in App.jsx */}
          <ul className="flex font-medium items-center gap-5">
            <li>
              <Link
                to="/"
                className="text-sm text-[#4a3f2f] hover:text-[#4a6741] transition-colors duration-150"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/jobs"
                className="text-sm text-[#4a3f2f] hover:text-[#4a6741] transition-colors duration-150"
              >
                Jobs
              </Link>
            </li>
            <li>
              <Link
                to="/browse"
                className="text-sm text-[#4a3f2f] hover:text-[#4a6741] transition-colors duration-150"
              >
                Browse
              </Link>
            </li>
          </ul>
          {/* conditional rendering. this decides what to show */}
          {
          !user ? (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button
                  variant="outline"
                  className="h-9 px-4 text-sm font-semibold border-[#d9cdb8] text-[#4a3f2f] hover:bg-[#f0ebe0] hover:border-[#4a6741] transition-colors duration-150"
                >
                  Login
                </Button>
              </Link>

              <Link to="/signup">
                <Button className="h-9 px-4 text-sm font-semibold bg-[#4a6741] hover:bg-[#3a5233] text-white transition-colors duration-150">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer ring-2 ring-[#d9cdb8] hover:ring-[#4a6741] transition-all duration-150">
                  <AvatarImage
                    src={user?.profile?.profilePhoto}
                    alt={user?.fullname}
                  />
                </Avatar>
              </PopoverTrigger>

              <PopoverContent className="w-80 bg-[#fdfaf4] border border-[#e0d5c0] rounded-xl shadow-md p-4">
                <div className="flex gap-3 items-center pb-3 border-b border-[#e0d5c0]">
                  <Avatar>
                    <AvatarImage src={user?.profile?.profilePhoto} />
                  </Avatar>

                  <div>
                    <h4 className="font-medium text-[#2c2415]">
                      {user?.fullname}
                    </h4>
                    <p className="text-sm text-[#6b5c45]">
                      {user?.profile?.bio || "Job Portal"}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col mt-3 gap-1">
                    {/* user info */}
                  {user?.role === "student" && (
                    // only student can see profile option
                    <div className="flex items-center gap-2 cursor-pointer px-2 py-1.5 rounded-lg hover:bg-[#f0ebe0] transition-colors duration-150">
                      <User2 size={16} className="text-[#4a6741]" />
                      <Button
                        variant="link"
                        className="text-sm text-[#4a3f2f] font-medium p-0 h-auto hover:no-underline"
                      >
                        <Link to="/profile">View Profile</Link>
                      </Button>
                    </div>
                  )}

                  <div
                    onClick={logoutHandler}
                    className="flex items-center gap-2 cursor-pointer px-2 py-1.5 rounded-lg hover:bg-[#f0ebe0] transition-colors duration-150"
                  >
                    <LogOut size={16} className="text-[#4a6741]" />
                    <Button
                      variant="link"
                      className="text-sm text-[#4a3f2f] font-medium p-0 h-auto hover:no-underline"
                    >
                      Logout
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
