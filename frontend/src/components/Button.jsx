const Button = ({ name, bgcolor, onClick }) => {
    return (
        <button type="button" onClick={onClick} class={`text-white w-full ${bgcolor ? bgcolor : "bg-gray-800 hover:bg-gray-900"} font-medium rounded-lg text-sm px-5 py-2.5 mb-2`}>{name}</button>
    )
}

export default Button