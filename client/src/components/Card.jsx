import React from 'react'
import { Link } from 'react-router-dom'

function Card({model,link}) {
  return (
    <div className='p-6 bg-white shadow border border-stone-300 rounded min-w-60'>
        <h3 className='font-semibold text-xl capitalize'>{model}</h3>
        <Link to={link} className='text-violet-700'>View Details</Link>
    </div>
  )
}

export default Card