const Input = ({ value, placeholder, text_size, onChange }) => {
    return (
        <div className='flex flex-col  w-full gap-2 m-4 mx-auto'>
            <label htmlFor={value} className={`${text_size}`}>{value}</label>
            <input onChange={onChange} type="text" placeholder={placeholder} className='border border-gray-300 rounded p-2' />
        </div>
    )
}

export default Input