import { useState } from "react"

export const useToggle=(isTrue?:boolean):[boolean,(val?:boolean)=>void]=>{
  const [state,setState] = useState(isTrue??false)
  const toggleState = (val?:boolean)=>{
    setState(p=>val??!p)
  }

  return [state,toggleState]
}