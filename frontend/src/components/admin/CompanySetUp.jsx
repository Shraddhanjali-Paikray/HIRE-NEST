import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { ArrowLeft, Loader2 } from 'lucide-react'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { useSelector } from 'react-redux'
import useGetCompanyById from '@/hooks/useGetCompanyById'

const inputStyle = {
    width: '100%',
    padding: '9px 12px',
    fontSize: '0.875rem',
    borderRadius: '8px',
    border: '1px solid #c8bc96',
    backgroundColor: '#faf7f0',
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

const CompanySetup = () => {
    const params = useParams();
    useGetCompanyById(params.id);
    const [input, setInput] = useState({
        name: "", description: "", website: "", location: "", file: null
    });
    const { singleCompany } = useSelector(store => store.company);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const changeEventHandler = (e) => setInput({ ...input, [e.target.name]: e.target.value });
    const changeFileHandler = (e) => setInput({ ...input, file: e.target.files?.[0] });

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", input.name);
        formData.append("description", input.description);
        formData.append("website", input.website);
        formData.append("location", input.location);
        if (input.file) formData.append("file", input.file);
        try {
            setLoading(true);
            const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/companies");
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        setInput({
            name: singleCompany.name || "",
            description: singleCompany.description || "",
            website: singleCompany.website || "",
            location: singleCompany.location || "",
            file: singleCompany.file || null
        });
    }, [singleCompany]);

    return (
        <div style={{ backgroundColor: '#f5f0e6', minHeight: '100vh' }}>
            <Navbar />
            <div style={{ maxWidth: '640px', margin: '0 auto', padding: '2.5rem 1rem' }}>

                {/* Card */}
                <div style={{
                    backgroundColor: '#faf7f0',
                    border: '1px solid #d6cbaa',
                    borderRadius: '16px',
                    overflow: 'hidden',
                }}>

                    {/* Card header */}
                    <div style={{
                        backgroundColor: '#eee8d8',
                        borderBottom: '1px solid #d6cbaa',
                        padding: '1.25rem 1.75rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '14px',
                    }}>
                        <button
                            type="button"
                            onClick={() => navigate("/admin/companies")}
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '6px',
                                padding: '7px 14px',
                                fontSize: '0.8rem',
                                fontWeight: 600,
                                color: '#4a6428',
                                backgroundColor: 'transparent',
                                border: '1px solid #b5cc90',
                                borderRadius: '7px',
                                cursor: 'pointer',
                                transition: 'background-color 0.12s ease',
                            }}
                            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#e8f0dc'}
                            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                        >
                            <ArrowLeft size={14} />
                            Back
                        </button>
                        <h1 style={{
                            fontFamily: 'Georgia, serif',
                            fontSize: '1.2rem',
                            fontWeight: 700,
                            color: '#2c3e1f',
                            margin: 0,
                        }}>
                            Company Setup
                        </h1>
                    </div>

                    {/* Form body */}
                    <form onSubmit={submitHandler} style={{ padding: '1.75rem' }}>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            gap: '1.1rem',
                            marginBottom: '1.1rem',
                        }}>
                            {[
                                { label: 'Company Name', name: 'name', type: 'text' },
                                { label: 'Description', name: 'description', type: 'text' },
                                { label: 'Website', name: 'website', type: 'text' },
                                { label: 'Location', name: 'location', type: 'text' },
                            ].map(({ label, name, type }) => (
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

                            {/* Logo upload — full width */}
                            <div style={{ gridColumn: '1 / -1' }}>
                                <label style={labelStyle}>Logo</label>
                                <label style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    padding: '9px 12px',
                                    borderRadius: '8px',
                                    border: '1px dashed #b5cc90',
                                    backgroundColor: '#f5f0e6',
                                    cursor: 'pointer',
                                    fontSize: '0.85rem',
                                    color: '#4a6428',
                                    transition: 'border-color 0.15s ease, background-color 0.15s ease',
                                }}
                                    onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#eee8d8'; e.currentTarget.style.borderColor = '#3a5a1c'; }}
                                    onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#f5f0e6'; e.currentTarget.style.borderColor = '#b5cc90'; }}
                                >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                                        stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                        <polyline points="17 8 12 3 7 8" />
                                        <line x1="12" y1="3" x2="12" y2="15" />
                                    </svg>
                                    {input.file ? input.file.name : 'Choose an image…'}
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={changeFileHandler}
                                        style={{ display: 'none' }}
                                    />
                                </label>
                            </div>
                        </div>

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
                                marginTop: '0.25rem',
                            }}
                            onMouseEnter={e => { if (!loading) e.currentTarget.style.backgroundColor = '#2c4415'; }}
                            onMouseLeave={e => { if (!loading) e.currentTarget.style.backgroundColor = '#3a5a1c'; }}
                        >
                            {loading ? (
                                <>
                                    <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} />
                                    Please wait…
                                </>
                            ) : 'Update Company'}
                        </button>
                    </form>
                </div>
            </div>

            <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
        </div>
    );
}

export default CompanySetup;