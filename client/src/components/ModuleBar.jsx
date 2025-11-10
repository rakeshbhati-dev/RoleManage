import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'
import Button from './Button'
import Input from './Input'

function ModuleBar({ onAdd, onSearch,module,canAdd=false }) {
  return (
    <div className='px-2 md:px-5 py-2 mb-2'>
      <div className='flex items-center justify-between mb-4 md:hidden'>
        <Link to='/' className='font-semibold md:text-xl '>
          <FontAwesomeIcon icon={faChevronLeft} className='text-gray-400' />
          {module}
        </Link>
        {canAdd && <button onClick={onAdd} className='text-violet-600 font-semibold px-2'>Add</button>}
      </div>
      <div className='md:flex justify-between'>
        <div className='hidden md:block'>
          {canAdd && <Button value='Add +' onClick={onAdd}></Button>}
        </div>
         <div className='md:w-1/3'>
          <Input type='search' placeholder='Search' onChange={onSearch}></Input>
        </div>
      </div>
    </div>
  )
}

export default ModuleBar