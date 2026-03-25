import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel'
import { Button } from '@/components/ui/button'

const category = [
    "Frontend Developer",
    "Backend Developer",
    "Mern Stack Developer",
    "Full Stack Developer",
    "Graphic Designer",
    "Data Science"
]

const CategoryCarousel = () => {
    return (
        <div className="bg-[#f5f0e8] py-10">
            <Carousel className="w-full max-w-2xl mx-auto">
                <CarouselContent>
                    {category.map((cat, index) => (
                        <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                            <Button
                                variant="outline"
                                className="rounded-full w-full text-sm font-medium border-[#d9cdb8] text-[#4a3f2f] bg-[#fdfaf4] hover:bg-[#4a6741] hover:text-white hover:border-[#4a6741] transition-all duration-200"
                            >
                                {cat}
                            </Button>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="border-[#d9cdb8] text-[#4a3f2f] hover:bg-[#f0ebe0]" />
                <CarouselNext className="border-[#d9cdb8] text-[#4a3f2f] hover:bg-[#f0ebe0]" />
            </Carousel>
        </div>
    )
}

export default CategoryCarousel