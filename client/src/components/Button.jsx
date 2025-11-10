import React from 'react'

function Button({value='',buttonStyle,onClick}) {
  return (
    <button onClick={onClick} className={` bg-violet-700 px-3 py-2 font-semibold rounded  cursor-pointer text-white ${buttonStyle}`} >{value}</button>
  )
}

export default Button