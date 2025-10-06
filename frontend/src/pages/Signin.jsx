import AccLink from "../components/AccLink"
import Button from "../components/Button"
import Heading from "../components/Heading"
import Input from "../components/Input"
import Subheading from "../components/Subheading"

const Signin = () => {
    return (
        <div className='h-screen w-full bg-black/50 flex items-center justify-center'>

            <div className="p-8 h-fit bg-white rounded-lg">
                <div>
                    <Heading heading={"Sign In"} />
                    <Subheading text={"Enter your credentials to access an account"} />
                </div>
                <Input value={"Email"} placeholder={"johndoe@gmail.com"} />
                <Input value={"Password"} placeholder={""} />
                <div className=" w-full flex justify-center items-center">
                    <Button name={"Sign Up"} />
                </div>
                <AccLink text={"Don't have an account?"} towards={'Signup'} />
            </div>

        </div >
    )
}

export default Signin