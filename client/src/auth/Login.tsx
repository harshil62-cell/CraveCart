import { Input } from "@/components/ui/input";
import { Loader2, LockKeyhole, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, type ChangeEvent } from "react";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";

interface LoginInputState{
    email:string;
    password:string;
}

const Login = () => {
    const [input,setInput]=useState<LoginInputState>({
        email:"",
        password:""
    });

    const changeEventHandler=(e:ChangeEvent<HTMLInputElement>)=>{
        const {name,value}=e.target;
        setInput({...input,[name]:value})
    };

    const loginSubmitHandler=()=>{

    }

    const [isLoading,setIsLoading]=useState(true);
    return(
        <>
            <div className="flex min-h-screen w-full items-center justify-center">
                <form className="mx-4 w-full max-w-md rounded-lg border-gray-200 p-6 md:p-8 md:border">
                    <div className="mb-4">
                        <h1 className="font-bold text-2xl">Eat It</h1>
                    </div>
                    <div className="relative mb-4">
                        <Input name="email" type='email' placeholder="Email" className="pl-10 focus-visible:ring-0" value={input.email} onChange={changeEventHandler}/>
                        <Mail className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none"></Mail>
                    </div>
                    <div className="relative mb-4">
                        <Input name="password" type='password' placeholder="password" className="pl-10 focus-visible:ring-0" value={input.password} onChange={changeEventHandler}/>
                        <LockKeyhole className="pointer-events-none absolute inset-y-2 left-2 text-gray-500" />
                    </div>

                    <div className="mb-10">
                        {
                            isLoading ? <Button disabled className="bg-button hover:bg-button-hover w-full"><Loader2 className="mr-2 h-4 w-4 animate-spin"></Loader2> please wait</Button> :
                            <Button type="submit" className="bg-button hover:bg-button-hover w-full">Login</Button>
                        }
                    </div>

                    <Separator/>

                    <p>Don't have an account?{" "}
                        <Link to='/signup' className="text-blue-500">Sign Up</Link>
                    </p>
                </form>
            </div>
        </>
    )
}

export default Login;