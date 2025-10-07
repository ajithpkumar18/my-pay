import Heading from '../components/Heading'
import Input from '../components/Input'
import Button from '../components/Button'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'

export const Send = () => {
    const [amount, setAmount] = useState(0)
    const [params] = useSearchParams()
    const id = params.get("id")
    const username = params.get("username")
    console.log(id, username);
    const navigate = useNavigate()

    return (
        <div className='w-screen h-screen flex items-center justify-center absolute top-0 left-0 backdrop-blur-0 bg-white/70'>
            {/* <div className='absolute top-10 right-18 text-3xl font-extrabold bg-green-400 p-2 text-white rounded-full cursor-pointer' onClick={() => setActive(e => !e)}>
                X
            </div> */}
            <div className={`w-2/6 bg-gray-100 h-fit p-5 absolute`}>

                <Heading heading={"Send Money"} className={"text-3xl my-10 bg-gray-100 text-center text-black font-semibold p-2"} />
                <div className='flex items-center justify-start gap-5 px-3 mt-10'>
                    <p className='bg-green-500 p-2 rounded-full'>A</p>
                    <Heading heading={username} className={" text-black ${size} font-semibold text-center p-2 text-2xl"} />
                </div>
                <Input value={"Amount (in Rs)"} placeholder={"Enter amount"} text_size={"text-xl"} onChange={(e) => { setAmount(e.target.value) }} />
                <Button name={"Initiate Transfer"} bgcolor={"bg-green-500"} onClick={async () => {
                    const res = await axios.post("http://localhost:3000/api/accounts/transfer", {
                        to: id,
                        amount
                    }, {
                        headers: {
                            token: localStorage.getItem("token")
                        },
                    })

                    if (res.status == 200) {
                        alert("Succesfull")
                        navigate("/dashboard")
                    } else {
                        alert("Transaction failed")
                        navigate("/dashboard")
                    }
                }} />
            </div>
        </div>
    )
}
