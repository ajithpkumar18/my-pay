import React from 'react'
import { Link } from 'react-router-dom'

const AccLink = ({ text, towards }) => {
    return (
        <Link to={`/${towards.toLowerCase()}`} className="text-sm flex justify-center items-center gap-1 text-black font-semibold">
            {text}
            {' '}

            <u>
                {towards}
            </u>

        </Link>
    )
}

export default AccLink