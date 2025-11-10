import React from 'react'
import Button from '../../src/components/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faPen, faTrash } from '@fortawesome/free-solid-svg-icons'

function Table({data=[],column=[],canEdit=false,canDelete=false,onEdit,onDelete,onNavigate}) {
    if(data.length==0){
        return <p>No data found</p>
    }
  return (
    <table className='w-[100%] text-center'>
        <thead>
            <tr className='bg-gray-200 border border-stone-400'>
                {column.map((col)=>{
                    return(
                        <th key={col.title} className='py-2 text-black'>{col.title}</th>
                    )
                })}
                <th className='py-2 text-black '>Action</th>
            </tr>
        </thead>
        <tbody>
            {
                data.map((row)=>{
                    return(
                        <tr key={row.id} className='border border-stone-300' >
                            {
                                column.map((col)=>{
                                    return (
                                        <td key={`${row.id}-${col.title}`} className='py-2'>{col.value?col.value(row):'-'}</td>
                                    )
                                })
                            }
                            <td>
                                {canEdit && <FontAwesomeIcon icon={faPen} className='cursor-pointer' onClick={()=>onEdit(row.id)}/>}
                                {canDelete && <FontAwesomeIcon icon={faTrash} className='mx-4 cursor-pointer' onClick={()=>onDelete(row.id)}/>}
                                <FontAwesomeIcon icon={faEye} onClick={()=>onNavigate(row.id)}/>
                            </td>
                        </tr>
                    )
                })
            }
        </tbody>
    </table>
  )
}

export default Table