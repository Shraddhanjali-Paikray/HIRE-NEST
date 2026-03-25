import React from 'react'
import { Badge } from './ui/badge'

const LatestJobCards = ({job}) => {
    return (
        <div className='p-5 rounded-xl shadow-sm bg-[#fdfaf4] border border-[#e0d5c0] cursor-pointer hover:shadow-md hover:border-[#c8b878] transition-all duration-200'>
            <div>
                <h1 className='font-semibold text-[#2c2415] text-base'>{job?.company?.name}</h1>
                <p className='text-xs text-[#9a8a6a]'>India</p>
            </div>
            <div>
                <h1 className='font-bold text-[#2c2415] font-serif text-base my-2'>{job?.title}</h1>
                <p className='text-sm text-[#6b5c45] leading-relaxed line-clamp-2'>
                    {job?.description}
                </p>
            </div>
            <div className='flex items-center gap-2 mt-4 flex-wrap'>
                <Badge className='text-[#4a6741] bg-[#eaf2e4] border-0 font-semibold text-xs'>{job?.position} Positions</Badge>
                <Badge className='text-[#8a4a20] bg-[#f5ece3] border-0 font-semibold text-xs'>{job?.jobType}</Badge>
                <Badge className='text-[#2c2415] bg-[#e8e0cc] border-0 font-semibold text-xs'>{job?.salary}LPA</Badge>
            </div>
        </div>
    )
}

export default LatestJobCards