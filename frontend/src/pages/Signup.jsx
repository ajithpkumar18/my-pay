import { useState } from "react"
import AccLink from "../components/AccLink"
import Button from "../components/Button"
import Heading from "../components/Heading"
import Input from "../components/Input"
import Subheading from "../components/Subheading"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const Signup = () => {
    const navigate = useNavigate()
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    return (
        <div className='h-screen w-full bg-black/50 flex items-center justify-center'>

            <div className="p-8 h-fit bg-white rounded-lg">
                <div>
                    <Heading heading={"Sign Up"} />
                    <Subheading text={"Enter your information to create an account"} />
                </div>
                <Input value={"First Name"} placeholder={"John"} onChange={(e) => { setFirstName(e.target.value) }} />
                <Input value={"Last Name"} placeholder={"Doe"} onChange={(e) => { setLastName(e.target.value) }} />
                <Input value={"Email"} placeholder={"johndoe@gmail.com"} onChange={(e) => { setUsername(e.target.value) }} />
                <Input value={"Password"} placeholder={""} onChange={(e) => { setPassword(e.target.value) }} />
                <div className=" w-full flex justify-center items-center">
                    <Button name={"Sign Up"} onClick={async () => {
                        let res = await axios.post("http://localhost:3000/api/auth/signup", {
                            username,
                            firstName,
                            lastName,
                            password
                        })

                        if (await res.status == 200) navigate("/signin");
                    }} />
                </div>
                <AccLink text={"Already havre an account?"} towards={'Login'} />
            </div>

        </div >
    )
}

export default Signup