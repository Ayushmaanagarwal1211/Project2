import React, { useContext, useEffect, useRef, useState } from 'react'
import './renderimage.css'
import Context from '../context'
export default function RenderImage({url,ready,error,index}) {
    let {setError} = useContext(Context)
    let [error_img,setError_img] = useState(false)
    let [showError,setShowError] = useState(false)
    let [counts,setCounts] = useState(0)
    let ref = useRef(null)
    if(!ready){
        setError(true)
    }
    function handleError(){
        if(counts<3){
            setError_img(true)
            setTimeout(()=>{
                setCounts(value=>value+1)
                setError_img(false)
            },5000)
        }else{
            setShowError(true)
        }
    }
  return (
    <div style={{width:"38px",height:"38px"}} >
        {
         (!ready && !error) ? <img ></img>:   (!ready || showError) ? <img   ref={ref} style={{width:"38px",height:"38px",position:"relative",bottom:`${index>1?"10px":"0px"}`}} title={`Retry Count : ${counts} Error`} src="https://e7.pngegg.com/pngimages/10/205/png-clipart-computer-icons-error-information-error-angle-triangle-thumbnail.png"></img>
            :  error_img ?  <div class="loader"></div>
            :
                <img onError={handleError} style={{position:"relative",bottom:`${index>1?"10px":"0px"}`}} ref={ref} id={`img-${index}`}  title="user" src={url+ (index==1 ? 'sds':"")}></img>
            
                
        }
       
    </div>
  )
}
