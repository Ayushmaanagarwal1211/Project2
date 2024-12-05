import React, { useContext, useRef, useState } from 'react'
import { FaBookmark,FaLocationDot } from 'react-icons/fa6'
import Context from '../context'
import google from '../images/google.png'
import jobsData from "../data.json"; 

export default function JobCard({ job }) {
    let [isBookmarked,setisBookMarked] = useState(job.bookmark)
    let {setAllJobs,allJobs,isChecked,setPageNum} = useContext(Context)
    function loadFilter(){
        let arr = localStorage.getItem('data') || '[]'
        arr = JSON.parse(arr)
        let temp = []
        for(let i of arr){
            temp.push(i)
        }
        setAllJobs([...temp])
        setPageNum(1)
    }


    function addBookMark(){
        let data = localStorage.getItem('data') || '[]'
        data = JSON.parse(data)
        let isAlready = false
        for(let i of data){
            if(i.id == job.id){
                isAlready = true
            }
        }
        if(isAlready){
            removeBookMark()
        }else{
            let curr = localStorage.getItem('data') || '[]'
            job.bookmark = true
            curr = JSON.parse(curr)
            console.log(job)
            curr.push({...job})
            curr = JSON.stringify(curr)
            localStorage.setItem("data",curr)
            setisBookMarked(true)
           console.log(curr,'data')
        }
    }
    function removeBookMark(){
        setisBookMarked(false)
        let data = localStorage.getItem('data') || '[]'
        data = JSON.parse(data)
        console.log(data)
        data = data.filter((d)=>d.id !== job.id)
        localStorage.setItem('data',JSON.stringify([...data]))
        if(isChecked){
            loadFilter()
        }
        
    }

  return (
    <div className="flex hover:scale-[0.95] transition-all duration-300 bg-gradient-to-r hover:from-yellow-100 hover:to-yellow-200  max-w-[400px] items-center pt-4 pb-4 pl-[10px] pr-[10px] border rounded-lg shadow-sm hover:shadow-md ">


    <div className="flex w-[80%] ">
        <div>

      <h3 className="text-lg font-semibold text-gray-800">{job.title}</h3>
      {job.remote && (
      <span className="text-xs text-[#0BA02C] font-bold bg-[#E7F6EA] px-2 py-1 rounded-lg mr-4">
        REMOTE
      </span>
    )}
      <span className="text-sm text-gray-500">
        Salary: <span className="font-medium">{job.salary}</span>
      </span>
     
      <div className="flex w-[100%] mt-[9px]  h-[70px] items-center  ">   <img
      src={google}
      alt={`${job.company} logo`}
      className="w-12 h-12 rounded-full mr-4 relative top-[4px]"
    />
     <p className="text-sm text-gray-500">
        <span className='font-semibold  text-[20px] text-black '>
          {job.company}
            </span> <br></br><FaLocationDot className='inline' color='gray'/> {job.location}
      </p></div>
    </div>
        </div>
    <div className='w-[20%]  flex h-[100%] items-end justify-center'>

    <button className="text-gray-500 hover:text-gray-800   " onClick={addBookMark}>
  {!isBookmarked ?     <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5 3v16l7-4 7 4V3H5z"
        />
      </svg> : <FaBookmark size={"2rem"}/>}
    </button>
       </div> 
  </div>
  )
}
