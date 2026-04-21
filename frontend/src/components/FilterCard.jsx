import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";

const filterData = [
  {
    filterType: "Location",
    name: "location",
    array: [
      { label: "Delhi NCR", value: "delhi" },
      { label: "Bangalore", value: "bangalore" },
      { label: "Hyderabad", value: "hyderabad" },
      { label: "Pune", value: "pune" },
      { label: "Mumbai", value: "mumbai" },
      { label: "Chennai", value: "chennai" },
      { label: "Remote", value: "remote" },
    ],
  },
  {
    filterType: "Industry",
    name: "industry",
    array: [
      { label: "Frontend Developer", value: "Frontend Developer" },
      { label: "Backend Developer",  value: "Backend Developer"  },
      { label: "FullStack Developer", value: "FullStack Developer" },
      { label: "Data Science",       value: "Data Science"       },
      { label: "UI/UX Designer",     value: "UI/UX Designer"     },
      { label: "DevOps Engineer",    value: "DevOps Engineer"    },
      { label: "Mobile Developer",   value: "Mobile Developer"   },
    ],
  },
  {
    filterType: "Job Type",
    name: "jobType",
    array: [
      { label: "Full-Time",   value: "full" },
      { label: "Part-Time",   value: "part" },
      { label: "Internship",  value: "internship" },
      { label: "Freelance",   value: "freelance"  },
      { label: "Contract",    value: "contract"   },
    ],
  },
  {
    filterType: "Experience",
    name: "experience",
    array: [
      { label: "Fresher (0–1 yr)",  value: "fresher"  },
      { label: "Junior (1–3 yrs)",  value: "junior"   },
      { label: "Mid (3–5 yrs)",     value: "mid"      },
      { label: "Senior (5+ yrs)",   value: "senior"   },
    ],
  },
];

const FilterCard = () => {
  // { location: Set, industry: Set, jobType: Set, experience: Set }
  const [selected, setSelected] = useState({});
  const dispatch = useDispatch();

  const toggle = (name, value) => {
    setSelected(prev => {
      const current = new Set(prev[name] || []);
      if (current.has(value)) current.delete(value);
      else current.add(value);
      return { ...prev, [name]: current };
    });
  };

  const clearAll = () => setSelected({});

  const hasAny = Object.values(selected).some(s => s.size > 0);

  useEffect(() => {
    // Combine all selected values into one search string joined by spaces
    const allValues = Object.values(selected)
      .flatMap(s => [...s])
      .join(" ");
    dispatch(setSearchedQuery(allValues));
  }, [selected]);

  return (
    <div style={{
      width: '100%',
      backgroundColor: '#fdfaf4',
      border: '1px solid #e0d5c0',
      borderRadius: '14px',
      padding: '1.25rem',
      boxShadow: '0 1px 4px rgba(74,103,65,0.07)',
    }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
        <h2 style={{
          fontFamily: 'Georgia, serif',
          fontSize: '1rem',
          fontWeight: 700,
          color: '#2c2415',
          margin: 0,
        }}>
          Filter Jobs
        </h2>
        {hasAny && (
          <button
            onClick={clearAll}
            style={{
              fontSize: '0.75rem',
              fontWeight: 600,
              color: '#e53e3e',
              background: 'none',
              border: '1px solid #fca5a5',
              borderRadius: '6px',
              padding: '2px 10px',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#fff5f5'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            Clear all
          </button>
        )}
      </div>

      <div style={{ borderTop: '1px solid #e0d5c0', marginBottom: '1rem' }} />

      {/* Filter groups */}
      {filterData.map((group) => (
        <div key={group.name} style={{ marginBottom: '1.25rem' }}>
          <p style={{
            fontSize: '0.78rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: '#4a6428',
            margin: '0 0 0.5rem',
          }}>
            {group.filterType}
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {group.array.map((item) => {
              const isChecked = selected[group.name]?.has(item.value) || false;
              return (
                <label
                  key={item.value}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    cursor: 'pointer',
                    padding: '4px 6px',
                    borderRadius: '6px',
                    transition: 'background-color 0.12s ease',
                    backgroundColor: isChecked ? '#eef5e8' : 'transparent',
                  }}
                  onMouseEnter={e => { if (!isChecked) e.currentTarget.style.backgroundColor = '#f5f0e6'; }}
                  onMouseLeave={e => { if (!isChecked) e.currentTarget.style.backgroundColor = 'transparent'; }}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggle(group.name, item.value)}
                    style={{
                      width: '15px',
                      height: '15px',
                      accentColor: '#4a6741',
                      cursor: 'pointer',
                      flexShrink: 0,
                    }}
                  />
                  <span style={{
                    fontSize: '0.85rem',
                    color: isChecked ? '#2c3e1f' : '#4a3f2f',
                    fontWeight: isChecked ? 600 : 400,
                  }}>
                    {item.label}
                  </span>
                </label>
              );
            })}
          </div>
          <div style={{ borderTop: '1px solid #e0d5c0', marginTop: '0.75rem' }} />
        </div>
      ))}
    </div>
  );
};

export default FilterCard;