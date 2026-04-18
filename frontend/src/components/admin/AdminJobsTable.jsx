import React, { useEffect, useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, Eye, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const AdminJobsTable = () => {
    const { allAdminJobs, searchJobByText } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allAdminJobs);
    const navigate = useNavigate();

    useEffect(() => {
        const filteredJobs = allAdminJobs.filter((job) => {
            if (!searchJobByText) return true;
            return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase())
                || job?.company?.name?.toLowerCase().includes(searchJobByText.toLowerCase());
        });
        setFilterJobs(filteredJobs);
    }, [allAdminJobs, searchJobByText]);

    return (
        <div style={{ width: '100%', overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>

                {/* Header */}
                <thead>
                    <tr style={{ backgroundColor: '#eee8d8', borderBottom: '1px solid #d6cbaa' }}>
                        {['Company Name', 'Role', 'Date', 'Action'].map((col, i) => (
                            <th key={col} style={{
                                padding: '12px 20px',
                                fontSize: '0.7rem',
                                fontWeight: 700,
                                textTransform: 'uppercase',
                                letterSpacing: '0.08em',
                                color: '#4a6428',
                                textAlign: i === 3 ? 'right' : 'left',
                                whiteSpace: 'nowrap',
                            }}>
                                {col}
                            </th>
                        ))}
                    </tr>
                </thead>

                {/* Body */}
                <tbody>
                    {!filterJobs?.length ? (
                        <tr>
                            <td colSpan={4} style={{
                                padding: '2.5rem',
                                textAlign: 'center',
                                color: '#7a8c5e',
                                fontSize: '0.875rem',
                                fontStyle: 'italic',
                            }}>
                                No jobs found
                            </td>
                        </tr>
                    ) : (
                        filterJobs.map((job, idx) => (
                            <tr
                                key={job._id}
                                style={{
                                    backgroundColor: idx % 2 === 0 ? '#faf7f0' : '#f5f0e6',
                                    borderBottom: '1px solid #e8e0cc',
                                    transition: 'background-color 0.12s ease',
                                }}
                                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#eee8d8'}
                                onMouseLeave={e => e.currentTarget.style.backgroundColor = idx % 2 === 0 ? '#faf7f0' : '#f5f0e6'}
                            >
                                {/* Company Name */}
                                <td style={{ padding: '14px 20px' }}>
                                    <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#2c3e1f' }}>
                                        {job?.company?.name}
                                    </span>
                                </td>

                                {/* Role */}
                                <td style={{ padding: '14px 20px' }}>
                                    <span style={{
                                        display: 'inline-block',
                                        padding: '3px 10px',
                                        borderRadius: '999px',
                                        fontSize: '0.8rem',
                                        fontWeight: 600,
                                        backgroundColor: '#e8f0dc',
                                        color: '#3a5a1c',
                                        border: '1px solid #b5cc90',
                                    }}>
                                        {job?.title}
                                    </span>
                                </td>

                                {/* Date */}
                                <td style={{ padding: '14px 20px' }}>
                                    <span style={{ fontSize: '0.85rem', color: '#7a8c5e' }}>
                                        {job?.createdAt?.split("T")[0]}
                                    </span>
                                </td>

                                {/* Action */}
                                <td style={{ padding: '14px 20px', textAlign: 'right' }}>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <button style={{
                                                background: 'none',
                                                border: '1px solid #d6cbaa',
                                                borderRadius: '6px',
                                                padding: '5px 7px',
                                                cursor: 'pointer',
                                                color: '#4a6428',
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                transition: 'background-color 0.12s ease',
                                            }}
                                                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#eee8d8'}
                                                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                                            >
                                                <MoreHorizontal size={16} />
                                            </button>
                                        </PopoverTrigger>
                                        <PopoverContent style={{
                                            backgroundColor: '#faf7f0',
                                            border: '1px solid #d6cbaa',
                                            borderRadius: '10px',
                                            padding: '6px',
                                            boxShadow: '0 4px 16px rgba(45,80,22,0.10)',
                                            width: '140px',
                                        }}>
                                            {/* Edit */}
                                            <div
                                                onClick={() => navigate(`/admin/companies/${job._id}`)}
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '8px',
                                                    padding: '8px 10px',
                                                    borderRadius: '7px',
                                                    cursor: 'pointer',
                                                    color: '#2c3e1f',
                                                    fontSize: '0.85rem',
                                                    fontWeight: 500,
                                                    transition: 'background-color 0.12s ease',
                                                }}
                                                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#e8f0dc'}
                                                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                                            >
                                                <Edit2 size={14} color="#4a6428" />
                                                Edit
                                            </div>

                                            {/* Applicants */}
                                            <div
                                                onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '8px',
                                                    padding: '8px 10px',
                                                    borderRadius: '7px',
                                                    cursor: 'pointer',
                                                    color: '#2c3e1f',
                                                    fontSize: '0.85rem',
                                                    fontWeight: 500,
                                                    transition: 'background-color 0.12s ease',
                                                }}
                                                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#e8f0dc'}
                                                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                                            >
                                                <Eye size={14} color="#4a6428" />
                                                Applicants
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>

                {/* Caption */}
                <tfoot>
                    <tr>
                        <td colSpan={4} style={{
                            padding: '10px 20px',
                            fontSize: '0.75rem',
                            color: '#a09880',
                            textAlign: 'center',
                            borderTop: '1px solid #e8e0cc',
                            backgroundColor: '#f5f0e6',
                        }}>
                            A list of your recent posted jobs
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
};

export default AdminJobsTable;