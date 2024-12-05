import React, { useState, useEffect, useContext } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import Listings from "./components/Listings";
import Footer from "./components/Footer";
import Context from "./context";
import jobsData from "./data.json";

const App = () => {
  let [data,setData] = useState("")
  let [location,setLocation] = useState("")
  let [allJobs,setAllJobs] = useState([])
  let [pagenum,setPageNum] = useState(1)
  useEffect(()=>{
    let d = [...jobsData]
    let data = localStorage.getItem('data') || '[]'
    data = JSON.parse(data)
    for(let i of data){
      for(let j of d){
        if(j.id == i.id){
          j.bookmark = true
        }
      }
    }
    setAllJobs([...d])
  },[])

  return (
    <div>
      <Context.Provider value={{data,setData,location,setLocation,allJobs,setAllJobs,pagenum,setPageNum}}>
        <Navbar/>
        <Main/>
        <Listings/>
        <Footer/>
      </Context.Provider>
    </div>
  );
};

export default App;
