import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { useSelector } from 'react-redux'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import axios from 'axios'
import { JOB_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'

const inputStyle = {
    width: '100%',
    padding: '9px 12px',
    fontSize: '0.875rem',
    borderRadius: '8px',
    border: '1px solid #c8bc96',
    backgroundColor: '#f5f0e6',
    color: '#2c3e1f',
    outline: 'none',
    transition: 'border-color 0.15s ease',
    boxSizing: 'border-box',
}

const labelStyle = {
    display: 'block',
    fontSize: '0.72rem',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.07em',
    color: '#7a8c5e',
    marginBottom: '6px',
}

const fields = [
    { label: 'Title',           name: 'title',       type: 'text'   },
    { label: 'Description',     name: 'description', type: 'text'   },
    { label: 'Requirements',    name: 'requirements',type: 'text'   },
    { label: 'Salary',          name: 'salary',      type: 'text'   },
    { label: 'Location',        name: 'location',    type: 'text'   },
    { label: 'Job Type',        name: 'jobType',     type: 'text'   },
    { label: 'Experience Level',name: 'experience',  type: 'text'   },
    { label: 'No. of Positions',name: 'position',    type: 'number' },
]

const PostJob = () => {
    const [input, setInput] = useState({
        title: '', description: '', requirements: '', salary: '',
        location: '', jobType: '', experience: '', position: 0, companyId: ''
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { companies } = useSelector(store => store.company);

    const changeEventHandler = (e) => setInput({ ...input, [e.target.name]: e.target.value });

    const selectChangeHandler = (value) => {
        const selectedCompany = companies.find(c => c.name.toLowerCase() === value);
        setInput({ ...input, companyId: selectedCompany._id });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
    
            const payload = {
                ...input,
                salary: Number(input.salary.replace(/[^0-9]/g, "").slice(0, 5)),
                experienceLevel:
                    input.experience.toLowerCase().includes("fresher") ? 0 :
                    input.experience.match(/\d+/) ? Number(input.experience.match(/\d+/)[0]) : 0,
                position: Number(input.position),
                requirements: input.requirements.split(',').map(r => r.trim()),
                company: input.companyId
            };
    
            const res = await axios.post(`${JOB_API_END_POINT}/post`, payload, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });
    
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/jobs");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ backgroundColor: '#f5f0e6', minHeight: '100vh' }}>
            <Navbar />
            <div style={{ maxWidth: '760px', margin: '0 auto', padding: '2.5rem 1rem' }}>

                {/* Card */}
                <div style={{
                    backgroundColor: '#faf7f0',
                    border: '1px solid #d6cbaa',
                    borderRadius: '16px',
                    overflow: 'hidden',
                }}>

                    {/* Header strip */}
                    <div style={{
                        backgroundColor: '#eee8d8',
                        borderBottom: '1px solid #d6cbaa',
                        padding: '1.25rem 1.75rem',
                    }}>
                        <h1 style={{
                            fontFamily: 'Georgia, serif',
                            fontSize: '1.25rem',
                            fontWeight: 700,
                            color: '#2c3e1f',
                            margin: '0 0 0.2rem',
                        }}>
                            Post a New Job
                        </h1>
                        <p style={{ fontSize: '0.85rem', color: '#7a8c5e', margin: 0 }}>
                            Fill in the details below to publish a job listing
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={submitHandler} style={{ padding: '1.75rem' }}>

                        {/* 2-col grid */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            gap: '1.1rem',
                            marginBottom: '1.1rem',
                        }}>
                            {fields.map(({ label, name, type }) => (
                                <div key={name}>
                                    <label style={labelStyle}>{label}</label>
                                    <input
                                        type={type}
                                        name={name}
                                        value={input[name]}
                                        onChange={changeEventHandler}
                                        style={inputStyle}
                                        onFocus={e => e.currentTarget.style.borderColor = '#3a5a1c'}
                                        onBlur={e => e.currentTarget.style.borderColor = '#c8bc96'}
                                    />
                                </div>
                            ))}

                            {/* Company select */}
                            {companies.length > 0 && (
                                <div>
                                    <label style={labelStyle}>Company</label>
                                    <Select onValueChange={selectChangeHandler}>
                                        <SelectTrigger style={{
                                            ...inputStyle,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            cursor: 'pointer',
                                        }}>
                                            <SelectValue placeholder="Select a company" />
                                        </SelectTrigger>
                                        <SelectContent style={{
                                            backgroundColor: '#faf7f0',
                                            border: '1px solid #d6cbaa',
                                            borderRadius: '10px',
                                            padding: '4px',
                                            boxShadow: '0 4px 16px rgba(45,80,22,0.10)',
                                        }}>
                                            <SelectGroup>
                                                {companies.map((company) => (
                                                    <SelectItem
                                                        key={company._id}
                                                        value={company.name.toLowerCase()}
                                                        style={{
                                                            fontSize: '0.875rem',
                                                            color: '#2c3e1f',
                                                            padding: '8px 10px',
                                                            borderRadius: '7px',
                                                            cursor: 'pointer',
                                                        }}
                                                    >
                                                        {company.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                            )}
                        </div>

                        {/* No company warning */}
                        {companies.length === 0 && (
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '10px 14px',
                                borderRadius: '8px',
                                backgroundColor: '#fdf3e3',
                                border: '1px solid #e8c88a',
                                marginBottom: '1.1rem',
                            }}>
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                                    stroke="#8a5e1a" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10" />
                                    <line x1="12" y1="8" x2="12" y2="12" />
                                    <line x1="12" y1="16" x2="12.01" y2="16" />
                                </svg>
                                <p style={{ fontSize: '0.8rem', color: '#8a5e1a', fontWeight: 600, margin: 0 }}>
                                    Please register a company first before posting a job.
                                </p>
                            </div>
                        )}

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            style={{
                                width: '100%',
                                padding: '11px',
                                borderRadius: '8px',
                                border: 'none',
                                backgroundColor: loading ? '#c8c4b8' : '#3a5a1c',
                                color: loading ? '#7a7a6e' : '#f5f0e6',
                                fontSize: '0.9rem',
                                fontWeight: 600,
                                cursor: loading ? 'not-allowed' : 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px',
                                transition: 'background-color 0.15s ease',
                            }}
                            onMouseEnter={e => { if (!loading) e.currentTarget.style.backgroundColor = '#2c4415'; }}
                            onMouseLeave={e => { if (!loading) e.currentTarget.style.backgroundColor = '#3a5a1c'; }}
                        >
                            {loading ? (
                                <>
                                    <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} />
                                    Please wait…
                                </>
                            ) : 'Post New Job'}
                        </button>
                    </form>
                </div>
            </div>

            <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
        </div>
    );
};

export default PostJob;