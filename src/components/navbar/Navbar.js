import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import "./Navbar.css";

const Navbar = ({ setInputs, searchData }) => {

  const handlepress =(event)=>{
    if(event.key === 'Enter'){
      searchData()
    }
  }
  return (
    <>
      {/* https://fakestoreapi.com/products */}
      <div className="maindiv">
        <div className="logo">
          <img
            src="https://logopond.com/logos/70a5a28358a0f80718ac4f6737f018ae.png"
            alt="crud"
          />
        </div>
        <div className="searchs">
          <input
            type="search"
            placeholder="search data"
            onChange={(e)=>setInputs(e.target.value)}
            onKeyUp={handlepress}
          />
          <AiOutlineSearch className="sercIcon" />
        </div>
      </div>
    </>
  );
};

export default Navbar;
