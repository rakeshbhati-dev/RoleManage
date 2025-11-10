import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

function ListCard({ title, data = [] }) {
    return (
        <>
            {
                title && data &&
                <div className='border border-stone-300 flex items-center justify-between p-2'>
                    <div className='flex items-center'>
                        <div className='bg-violet-200 text-2xl font-bold rounded-3xl w-10 h-10 text-center flex justify-center items-center mr-3'>{title?.charAt(0)}</div>
                        <div>
                            <h3 className='font-semibold'>{title}</h3>

                            {
                                data.map((value) => {
                                    return (
                                        <p className='text-sm text-stone-500' key={crypto.randomUUID()}>{value}</p>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <FontAwesomeIcon icon={faChevronRight} className='text-stone-500' />
                </div>
            }
        </>
    )
}

export default ListCard