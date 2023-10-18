"use client"

export const SelectColor=(props:{active:string,set:(color:string)=>void})=>{
  const colorList = ["blue","green","pink"]
  const setColor = props.set
  const activeColor = props.active

  const ColorCircle = (props:{color:string})=>{
    return(
      <span onClick={()=>setColor(props.color)} style={{backgroundColor:props.color}} className={"block w-8 h-8 p-1 rounded-full cursor-pointer hover:outline hover:outline-gray-500 "+((activeColor===props.color)&&"outline-2 outline outline-white")}></span>
    )
  }
  return(
    <div className={("flex gap-4")}>
      {colorList.map(color=><ColorCircle key={color} color={color}/>)}
    </div>
  )
}