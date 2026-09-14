import { useState } from "react";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import { Button } from "./ui/button";
import heroimg from "@/assets/hero_img.jpg";

const HeroSection = () => {
  const [searchText,setSearchText] = useState<string>("");
  return (
    <div className="flex flex-col md:flex-row max-w-7xl mx-auto md:p-10 rounded-lg items-center justify-center m-4 gap-20">
      <div className="flex flex-col gap-10 md:w-[40%]">
        <div className="flex flex-col gap-5">
          <h1 className="font-bold md:font-extrabold md:text-5xl text-4xl">
            Order Food anytime & anywhere
          </h1>
          <p className="text-gray-500">
            Hey! Our Delicios food is waiting for you, we are always near to
            you.
          </p>
        </div>
        <div className="relative flex items-center gap-2">
            <Input className="pl-10 shadow-lg" type='text' value={searchText} onChange={(e)=>{setSearchText(e.target.value)}}/>
            <Search className="absolute inset-y-2 left-2 text-gray-500"/>
            <Button className='bg-button hover:bg-button-hover'>Search</Button>
        </div>
      </div>
      <div className="">
        <img src={heroimg} alt="" className="object-cover w-full max-h-125 max-w-[90%] rounded-2xl" />
      </div>
    </div>
  );
};

export default HeroSection;
