import React, { useContext, useState } from 'react'
import image from '../images/navbar-image.png'
import {FaBell} from 'react-icons/fa6'
import jobsData from "../data.json"; 
import Context from '../context';
import cat from '../images/cat.png'
export default function Navbar() {
    let [showSavedJobs,setShowSavedJobs] = useState(true)
    let {setAllJobs,setPageNum,isChecked,setIsChecked} = useContext(Context)
   
    function handleSavedJobs(){
        let arr = localStorage.getItem('data') || '[]'
        arr = JSON.parse(arr)
        let temp = []
        for(let i of arr){
            temp.push(i)
        }
        setAllJobs([...temp])
        setPageNum(1)
        setShowSavedJobs(false)
    }
    function loadAll(){
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
        setPageNum(1)
    }
    function handleShowAllJobs(){
        // loadAll()
        setShowSavedJobs(true)
    }
    function handleChange(e){
        if(e.target.checked){
            handleSavedJobs()
            setIsChecked(true)
        }else{
            setIsChecked(false)
            handleShowAllJobs()
        }
    }
    
  return (
    <div className='h-[80px]  w-[100vw] flex  bg-[#f2f3f4]'>
        <div className='flex w-[30%] gap-[10px] h-[100%] justify-center items-center'>
         <img src={image} className='h-[30px] w-[30px] cursor-pointer'></img>   <h1 className='font-semibold text-[27px] cursor-pointer'>Explorin Solutions</h1>
        </div>
        <div className='w-[40%]'>
            
        </div><div className='flex gap-[10px] w-[30%] justify-center items-center'>
            <div  className='w-[20px] rounded-sm '><FaBell className='cursor-pointer' size={"1.5rem"}/></div>
        <input type='checkbox' className='ml-[15px] mr-[5px] h-[25px] w-[25px] cursor-pointer border-gray-300 rounded-sm border-[0.5px]' onChange={handleChange}></input>  <div className='text-gray-400'>My Saved Jobs</div>
            <div></div>
            <div><img src={cat} className='w-[50px] h-[50px] rounded-[50%]'></img></div>
        </div>
    </div>
  )
}
