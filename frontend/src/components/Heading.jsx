import React from 'react'

const Heading = ({ heading, size, className }) => {
    return (
        <p className={`${className ? className : "bg-white text-black ${size} font-semibold text-center p-2"}`}>{heading}</p>
    )
}

export default Heading