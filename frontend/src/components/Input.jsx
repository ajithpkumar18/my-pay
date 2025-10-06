import React from 'react'

const Input = ({ value, placeholder }) => {
    return (
        <div className='flex flex-col  w-full gap-2 m-4 mx-auto'>
            <label htmlFor={value} className='font-medium'>{value}</label>
            <input type="text" placeholder={placeholder} className='border border-gray-300 rounded p-2' />
        </div>
    )
}

export default Input