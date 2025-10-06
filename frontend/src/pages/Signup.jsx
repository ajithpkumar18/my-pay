import AccLink from "../components/AccLink"
import Button from "../components/Button"
import Heading from "../components/Heading"
import Input from "../components/Input"
import Subheading from "../components/Subheading"

const Signup = () => {
    return (
        <div className='h-screen w-full bg-black/50 flex items-center justify-center'>

            <div className="p-8 h-fit bg-white rounded-lg">
                <div>
                    <Heading heading={"Sign Up"} />
                    <Subheading text={"Enter your information to create an account"} />
                </div>
                <Input value={"First Name"} placeholder={"John"} />
                <Input value={"Last Name"} placeholder={"Doe"} />
                <Input value={"Email"} placeholder={"johndoe@gmail.com"} />
                <Input value={"Password"} placeholder={""} />
                <div className=" w-full flex justify-center items-center">
                    <Button name={"Sign Up"} />
                </div>
                <AccLink text={"Already havre an account?"} towards={'Login'} />
            </div>

        </div >
    )
}

export default Signup