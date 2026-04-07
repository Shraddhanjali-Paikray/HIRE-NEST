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
import NestLogo from "@/assets/NestLogo.svg";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <nav style={{
      backgroundColor: '#f5f0e6',
      borderBottom: '1px solid #d6cbaa',
      boxShadow: '0 1px 6px rgba(45, 80, 22, 0.06)',
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0 1.5rem',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>

        {/* Logo + Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <img
            src={NestLogo}
            alt="Hire Nest Logo"
            style={{ height: '40px', width: 'auto', objectFit: 'contain', marginTop: '-10px' }}
          />
          <h1 style={{
            fontFamily: 'Georgia, serif',
            fontSize: '1.35rem',
            fontWeight: 700,
            letterSpacing: '0.06em',
            margin: 0,
            lineHeight: 1,
          }}>
            <span style={{ color: '#4a6428' }}>HIRE</span>
            <span style={{ color: '#2c2415' }}> NEST</span>
          </h1>
        </div>

        {/* Right side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>

          {/* Nav links */}
          <ul style={{ display: 'flex', alignItems: 'center', gap: '20px', listStyle: 'none', margin: 0, padding: 0 }}>
            {user && user.role === 'recruiter' ? (
              <>
                <NavLink to="/admin/companies">Companies</NavLink>
                <NavLink to="/admin/jobs">Jobs</NavLink>
              </>
            ) : (
              <>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/jobs">Jobs</NavLink>
                <NavLink to="/browse">Browse</NavLink>
              </>
            )}
          </ul>

          {/* Auth buttons or Avatar */}
          {!user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Link to="/login">
                <button style={{
                  height: '36px',
                  padding: '0 16px',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  border: '1px solid #d6cbaa',
                  borderRadius: '8px',
                  backgroundColor: 'transparent',
                  color: '#4a3f2f',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
                  onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#eee8d8'; e.currentTarget.style.borderColor = '#4a6428'; }}
                  onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.borderColor = '#d6cbaa'; }}
                >
                  Sign In
                </button>
              </Link>

              <Link to="/signup">
                <button style={{
                  height: '36px',
                  padding: '0 16px',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  border: '1px solid #3a5a1c',
                  borderRadius: '8px',
                  backgroundColor: '#3a5a1c',
                  color: '#f5f0e6',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
                  onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#2c4415'; }}
                  onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#3a5a1c'; }}
                >
                  Register
                </button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar style={{ cursor: 'pointer', outline: '2px solid #d6cbaa', outlineOffset: '2px', borderRadius: '50%', transition: 'outline-color 0.15s ease' }}
                  onMouseEnter={e => e.currentTarget.style.outlineColor = '#3a5a1c'}
                  onMouseLeave={e => e.currentTarget.style.outlineColor = '#d6cbaa'}
                >
                  <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname} />
                </Avatar>
              </PopoverTrigger>

              <PopoverContent style={{
                width: '280px',
                backgroundColor: '#faf7f0',
                border: '1px solid #d6cbaa',
                borderRadius: '14px',
                boxShadow: '0 4px 16px rgba(45, 80, 22, 0.1)',
                padding: '1rem',
              }}>
                {/* User info header */}
                <div style={{
                  display: 'flex',
                  gap: '12px',
                  alignItems: 'center',
                  paddingBottom: '12px',
                  borderBottom: '1px solid #d6cbaa',
                }}>
                  <Avatar>
                    <AvatarImage src={user?.profile?.profilePhoto} />
                  </Avatar>
                  <div>
                    <p style={{ margin: 0, fontWeight: 600, fontSize: '0.9rem', color: '#2c2415', fontFamily: 'Georgia, serif' }}>
                      {user?.fullname}
                    </p>
                    <p style={{ margin: 0, fontSize: '0.78rem', color: '#7a6a52' }}>
                      {user?.profile?.bio || 'Job Portal'}
                    </p>
                  </div>
                </div>

                {/* Menu items */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', marginTop: '10px' }}>
                  {user?.role === 'jobseeker' && (
                    <Link to="/profile" style={{ textDecoration: 'none' }}>
                      <div style={menuItemStyle}
                        onMouseEnter={e => e.currentTarget.style.backgroundColor = '#eee8d8'}
                        onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                      >
                        <User2 size={15} style={{ color: '#4a6428' }} />
                        <span style={{ fontSize: '0.85rem', color: '#3c3528', fontWeight: 500 }}>View Profile</span>
                      </div>
                    </Link>
                  )}

                  <div
                    onClick={logoutHandler}
                    style={menuItemStyle}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = '#eee8d8'}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <LogOut size={15} style={{ color: '#4a6428' }} />
                    <span style={{ fontSize: '0.85rem', color: '#3c3528', fontWeight: 500 }}>Logout</span>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ to, children }) => (
  <li>
    <Link
      to={to}
      style={{
        fontSize: '0.9rem',
        fontWeight: 500,
        color: '#3c3528',
        textDecoration: 'none',
        padding: '4px 2px',
        borderBottom: '2px solid transparent',
        transition: 'color 0.15s ease, border-color 0.15s ease',
      }}
      onMouseEnter={e => { e.currentTarget.style.color = '#3a5a1c'; e.currentTarget.style.borderBottomColor = '#3a5a1c'; }}
      onMouseLeave={e => { e.currentTarget.style.color = '#3c3528'; e.currentTarget.style.borderBottomColor = 'transparent'; }}
    >
      {children}
    </Link>
  </li>
);

const menuItemStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  padding: '8px 10px',
  borderRadius: '8px',
  cursor: 'pointer',
  backgroundColor: 'transparent',
  transition: 'background-color 0.15s ease',
};

export default Navbar;