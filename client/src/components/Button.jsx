import React from 'react'

function Button({value='',buttonStyle,onClick}) {
  return (
    <button className={`${buttonStyle} bg-violet-700 px-3 py-2 font-semibold rounded  cursor-pointer text-white`} onClick={onClick}>{value}</button>
  )
}

export default Button