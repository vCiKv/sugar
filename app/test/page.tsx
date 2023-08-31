"use client"
import { useState } from "react"

const Page = ()=>{
  const [state,setState] = useState(0)
  return(
    <div className="flex min-h-screen justify-center">
      <div>
      <div 
        style={{transform:`rotate(${state}deg)`}} 
        //style={{transform:"rotate("+state+"deg)"}} 
      
        className="p-6 mt-10 w-44 h-44 rounded-full bg-orange-900"
      >
       1 <br/> 2 <br/> 3
      </div>
      <button 
        onClick={()=>setState(p=>{
          return p+15 > 360 ? 0 : p+15
        })}
        className="bg-yellow-200/30 hover:bg-yellow-200/90 p-2 rounded-md">Spin</button>
      </div>
    </div>
  )
}
export default Page
//"rotate"