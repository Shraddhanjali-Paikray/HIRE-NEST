import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import axios from 'axios';

const shortlistingStatus = ["Accepted", "Rejected"];

const statusColors = {
    Accepted: { bg: '#e8f0dc', color: '#3a5a1c', border: '#b5cc90' },
    Rejected: { bg: '#fdf0ee', color: '#8a3a1c', border: '#e8b0a0' },
};

const ApplicantsTable = () => {
    const { applicants } = useSelector(store => store.application);

    const statusHandler = async (status, id) => {
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, { status });
            if (res.data.success) {
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    return (
        <div style={{ width: '100%', overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>

                {/* Header */}
                <thead>
                    <tr style={{ backgroundColor: '#eee8d8', borderBottom: '1px solid #d6cbaa' }}>
                        {['Full Name', 'Email', 'Contact', 'Resume', 'Date', 'Action'].map((col, i) => (
                            <th key={col} style={{
                                padding: '12px 18px',
                                fontSize: '0.7rem',
                                fontWeight: 700,
                                textTransform: 'uppercase',
                                letterSpacing: '0.08em',
                                color: '#4a6428',
                                textAlign: i === 5 ? 'right' : 'left',
                                whiteSpace: 'nowrap',
                            }}>
                                {col}
                            </th>
                        ))}
                    </tr>
                </thead>

                {/* Body */}
                <tbody>
                    {!applicants?.applications?.length ? (
                        <tr>
                            <td colSpan={6} style={{
                                padding: '2.5rem',
                                textAlign: 'center',
                                color: '#7a8c5e',
                                fontSize: '0.875rem',
                                fontStyle: 'italic',
                            }}>
                                No applicants yet
                            </td>
                        </tr>
                    ) : (
                        applicants.applications.map((item, idx) => (
                            <tr
                                key={item._id}
                                style={{
                                    backgroundColor: idx % 2 === 0 ? '#faf7f0' : '#f5f0e6',
                                    borderBottom: '1px solid #e8e0cc',
                                    transition: 'background-color 0.12s ease',
                                }}
                                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#eee8d8'}
                                onMouseLeave={e => e.currentTarget.style.backgroundColor = idx % 2 === 0 ? '#faf7f0' : '#f5f0e6'}
                            >
                                {/* Full Name */}
                                <td style={{ padding: '13px 18px' }}>
                                    <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#2c3e1f' }}>
                                        {item?.applicant?.fullname}
                                    </span>
                                </td>

                                {/* Email */}
                                <td style={{ padding: '13px 18px' }}>
                                    <span style={{ fontSize: '0.85rem', color: '#3c3528' }}>
                                        {item?.applicant?.email}
                                    </span>
                                </td>

                                {/* Contact */}
                                <td style={{ padding: '13px 18px' }}>
                                    <span style={{ fontSize: '0.85rem', color: '#3c3528' }}>
                                        {item?.applicant?.phoneNumber}
                                    </span>
                                </td>

                                {/* Resume */}
                                <td style={{ padding: '13px 18px' }}>
                                    {item.applicant?.profile?.resume ? (
                                        <a
                                            href={item.applicant.profile.resume}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{
                                                fontSize: '0.85rem',
                                                color: '#3a5a1c',
                                                fontWeight: 600,
                                                textDecoration: 'underline',
                                                textUnderlineOffset: '3px',
                                            }}
                                        >
                                            {item.applicant.profile.resumeOriginalName}
                                        </a>
                                    ) : (
                                        <span style={{ fontSize: '0.85rem', color: '#a09880', fontStyle: 'italic' }}>NA</span>
                                    )}
                                </td>

                                {/* Date */}
                                <td style={{ padding: '13px 18px' }}>
                                    <span style={{ fontSize: '0.85rem', color: '#7a8c5e' }}>
                                        {item?.applicant?.createdAt?.split("T")[0]}
                                    </span>
                                </td>

                                {/* Action */}
                                <td style={{ padding: '13px 18px', textAlign: 'right' }}>
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
                                            width: '130px',
                                        }}>
                                            {shortlistingStatus.map((status, index) => {
                                                const s = statusColors[status];
                                                return (
                                                    <div
                                                        key={index}
                                                        onClick={() => statusHandler(status, item?._id)}
                                                        style={{
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: '8px',
                                                            padding: '7px 10px',
                                                            borderRadius: '7px',
                                                            cursor: 'pointer',
                                                            fontSize: '0.85rem',
                                                            fontWeight: 500,
                                                            color: s.color,
                                                            transition: 'background-color 0.12s ease',
                                                        }}
                                                        onMouseEnter={e => e.currentTarget.style.backgroundColor = s.bg}
                                                        onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                                                    >
                                                        <span style={{
                                                            width: '7px', height: '7px',
                                                            borderRadius: '50%',
                                                            backgroundColor: s.color,
                                                            flexShrink: 0,
                                                        }} />
                                                        {status}
                                                    </div>
                                                );
                                            })}
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
                        <td colSpan={6} style={{
                            padding: '10px 18px',
                            fontSize: '0.75rem',
                            color: '#a09880',
                            textAlign: 'center',
                            borderTop: '1px solid #e8e0cc',
                            backgroundColor: '#f5f0e6',
                        }}>
                            A list of your recent applied users
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
};

export default ApplicantsTable;