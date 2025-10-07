import { useNavigate } from "react-router-dom"
import AccLink from "../components/AccLink"
import Button from "../components/Button"
import Heading from "../components/Heading"
import Input from "../components/Input"
import Subheading from "../components/Subheading"
import axios from "axios"
import { useState } from "react"

const Signin = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()
    return (
        <div className='h-screen w-full bg-black/50 flex items-center justify-center'>

            <div className="p-8 h-fit bg-white rounded-lg">
                <div>
                    <Heading heading={"Sign In"} />
                    <Subheading text={"Enter your credentials to access an account"} />
                </div>
                <Input value={"Email"} placeholder={"johndoe@gmail.com"} onChange={(e) => { setUsername(e.target.value) }} />
                <Input value={"Password"} placeholder={""} onChange={(e) => { setPassword(e.target.value) }} />
                <div className=" w-full flex justify-center items-center">
                    <Button name={"Sign In"} onClick={async () => {
                        let res = await axios.post("http://localhost:3000/api/auth/signin", {
                            username,
                            password
                        })
                        console.log(res);

                        localStorage.setItem("token", await res.data.token)
                        if (res.status == 200) navigate("/dashboard");
                    }} />
                </div>
                <AccLink text={"Don't have an account?"} towards={'Signup'} />
            </div>

        </div >
    )
}

export default Signin