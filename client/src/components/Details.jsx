import React from 'react'
import Button from './Button'
import { Link } from 'react-router-dom'

function Details({ data={}, rows = [], module,canEdit=false,canDelete=false, onEdit, onDelete }) {
    return (
        <div className='border border-stone-300 w-full md:w-1/2 p-5 rounded shadow-sm'>
            {
                Object.keys(data||{}).length > 0 &&
                <div>
                    <div className='flex justify-between mb-5'>
                        <h2 className='font-semibold text-lg md:text-xl '>{module} Detail</h2>
                        <Link to={`/${module.toLowerCase()}`}>X</Link>
                    </div>
                    <table className='w-full'>
                        <tbody>
                            {
                                rows.map((row) => {
                                    return (
                                        <tr key={crypto.randomUUID()} className='border-b-1 border-violet-400'>
                                            <td className='py-2 font-semibold text-gray-500'>{row.header}</td>
                                            <td>{row.value(data)}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                    <div className='mt-5'>
                        {
                            canEdit && <button className='bg-green-400 py-2 px-4 text-white font-semibold mr-3 cursor-pointer' onClick={() => onEdit(data.id)}>Edit</button>
                        }
                        {
                            canDelete && <button className='bg-red-400 py-2 px-4 text-white font-semibold cursor-pointer' onClick={() => onDelete(data.id)}>Delete</button>
                        }
                    </div>
                </div>
            }
        </div>
    )
}

export default Details