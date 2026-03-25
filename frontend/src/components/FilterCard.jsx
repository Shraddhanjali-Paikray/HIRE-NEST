import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import React from "react";

const fitlerData = [
  {
    fitlerType: "Location",
    array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"],
  },
  {
    fitlerType: "Industry",
    array: ["Frontend Developer", "Backend Developer", "FullStack Developer"],
  },
  {
    fitlerType: "Salary",
    array: ["0-40k", "42-1lakh", "1lakh to 5lakh"],
  },
];

const FilterCard = () => {
  return (
    <div className="w-full bg-[#fdfaf4] border border-[#e0d5c0] p-5 rounded-xl shadow-sm">

      <h1 className="font-bold text-lg font-serif text-[#2c2415]">Filter Jobs</h1>
      <div className="border-t border-[#e0d5c0] mt-3 mb-4" />

      <RadioGroup>
        {fitlerData.map((data, index) => (
          <div key={index} className="mb-5">
            <h1 className="font-semibold text-xs text-[#4a3f2f] uppercase tracking-widest mb-3">
              {data.fitlerType}
            </h1>
            {data.array.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 my-2 group cursor-pointer">
                <RadioGroupItem
                  value={item}
                  className="border-[#d9cdb8] text-[#4a6741]"
                />
                <label className="text-sm text-[#4a3f2f] cursor-pointer group-hover:text-[#4a6741] transition-colors duration-150">
                  {item}
                </label>
              </div>
            ))}
            {index < fitlerData.length - 1 && (
              <div className="border-t border-[#e0d5c0] mt-4" />
            )}
          </div>
        ))}
      </RadioGroup>

    </div>
  );
};

export default FilterCard;