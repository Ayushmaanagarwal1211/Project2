import React, { useContext, useEffect, useRef } from 'react'
import {FaMagnifyingGlass,FaLocationDot,FaCrosshairs} from 'react-icons/fa6'
import Context from '../context'
import jobsData from "../data.json"; 

export default function Main() {
    let {data,setData,location,setLocation,allJobs,setAllJobs,pagenum,setPageNum} = useContext(Context)
    let input = useRef()    
    let locationRef = useRef()
    
    function handleInputChange(e){
        if(e.target.name == 'title'){
            setData(e.target.value)
        }else{
            setLocation(e.target.value)
        }
    }
    function handleClick(){
        let jobs = [...jobsData]
        console.log(jobs,'sddsdsd')
            jobs =  jobs.filter((curr_data) => {
            const title = data.length === 0 || curr_data.title.toLowerCase().startsWith(data.toLowerCase());
            const locations = location.length === 0 || curr_data.location.toLowerCase().startsWith(location.toLowerCase());
            return title && locations;  
          });    
          setAllJobs(prev=>[...jobs])
          setPageNum(1)

        }
        useEffect(()=>{
            function handle(e){
                if (e.key === 'Enter') {
                    handleClick();
                }
            }
            window.document.addEventListener('keydown',handle);
            return ()=>{
                window.document.removeEventListener('keydown',handle);
                
            }
        })
        function inputFocus(){
            input.current.focus()
        }
        function handleLocationFocus(){
            locationRef.current.focus()
        }
  return ( 
    <div className='w-[65vw] max-xl:w-[80vw] max-md:w-[80vw] max-lg:w-[80vw] mx-auto px-4 py-8'>
        <div className="flex h-[70px] items-center gap-[15px] border-gray-200 border-[1px] pl-3 pr-3 ">
            <div onClick={inputFocus} className= 'flex gap-3 pt-3 pb-3  border-r-[1px] border-r-gray-200  items-center h-[100%] w-[45%]'><FaMagnifyingGlass color='#F37021'/><input ref={input} name='title' onChange={handleInputChange} placeholder='Search by: Job tittle, Position, Keyword...'  className='focus:outline-none w-[300px]'></input></div>
            <div onClick={handleLocationFocus} className='flex gap-3 pt-3 pb-3  items-center h-[100%] w-[45%] '><FaLocationDot color='#F37021'/><input name='location' className='focus:outline-none' ref={locationRef} onChange={handleInputChange} placeholder='City, state or country'></input></div>
            <div className='flex gap-3 pt-3 pb-3  items-center h-[100%] w-[5%]'><FaCrosshairs size={'1.5rem'} className='font-light'/></div>
            <button className='bg-[#F37021] font-bold h-[40px] text-white rounded-md cursor-pointer w-[100px]' onClick={handleClick}>Find Job</button>
        </div>
    </div>
  )
}
