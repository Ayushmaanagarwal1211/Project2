import React, { useContext, useEffect, useState } from 'react'
import './explorin.css'
import RenderImage from './RenderImage'
import Context from '../context'
export default function Explorin({name,count,images}) {
  let {error} = useContext(Context)
  let [all_images,setAllImages] = useState([...images])

  useEffect(()=>{
    if(all_images.length<4){
      setAllImages(prev=>[...prev,{error:true,ready:false}])

    }
  },[all_images])
  return (
    <div className='main'>
      <div className='image-container'>
        <div className='images'>
          {
            all_images.map((data ,index)=>
              <RenderImage  index={index} url={data.url} ready={data.ready} error={data.error}/>)
          }   
        </div>
      </div>
      <div className='middle-section'>
      <h1 >{name}</h1> 
      <h3>{count}+ Offline Centers</h3>
      </div>
   {
    error && 
     <div className='main-image'>
        <RenderImage error={true}/>
     </div>
   }     
    </div>
  )
}
