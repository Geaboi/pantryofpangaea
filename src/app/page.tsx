"use client";
import Image from "next/image";
import { useState } from "react";


const handleSubmit = (e) => {
  e.preventDefault(); // Prevents the form from refreshing the page
  console.log("Form submitted");
};

export default function Home() {
  return (
    <div className="grid grid-cols-9 grid-rows-6 gap-12	">
      <div className="col-span-7 row-span-2 col-start-2 row-start-5 flex flex-col items-center space-y-8">
        <div className="TItle">
            <h1 className="lg:text-2xl">Pantry of Pangea</h1>
          </div>
        <div className="">
          <form onSubmit={handleSubmit}>
            <input type="search" placeholder="Search Recipes" />
            <button type="submit" className="md:rounded border-black md:border">Search</button>
          </form>
      </div>
      
    </div>
    <div className="col-span-2 col-start-8 row-start-1 space-x-6 flex items-center">
      <button>Login</button>
      <button>SignUp</button>
    </div>
    <div className="col-span-2 row-start-13">
      <p>Footer |CopyRight| EULA| About US</p>
    </div>
    </div>
    
    
  );
}
