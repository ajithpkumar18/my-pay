import { useNavigate } from "react-router-dom"
import Button from "./Button"

const User = ({ item }) => {
    const { username } = item
    const navigate = useNavigate();
    return (
        <div className='flex w-full items-center justify-between my-6'>
            <div className='flex gap-3'>
                <p className='bg-gray-300 rounded-full p-1 my-auto'>
                    U1
                </p>
                <div className='text-xl font-semibold'>
                    {username}
                </div>
            </div>
            <div>
                <Button name="Send Money" onClick={() => { navigate(`/send?id=${item._id}&username=${item.username}`) }} />
            </div>
        </div>
    )
}

export default User