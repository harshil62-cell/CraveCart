import { Input } from "@/components/ui/input";
import { Loader2, LockKeyhole, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { userLoginSchema, type LoginInputState } from "@/schema/userSchema";

const Login = () => {
    const [input,setInput]=useState<LoginInputState>({
        email:"",
        password:""
    });

    const [errors,setErrors]=useState<Partial<LoginInputState>>({});

    const changeEventHandler=(e:ChangeEvent<HTMLInputElement>)=>{
        const {name,value}=e.target;
        setInput({...input,[name]:value})
    };

    const loginSubmitHandler=(e:FormEvent)=>{
        e.preventDefault();
        const result = userLoginSchema.safeParse(input);
              if(!result.success){
                const fieldErrors=result.error.flatten().fieldErrors;
                setErrors(fieldErrors as Partial<LoginInputState>);
                return;
              }
    }

    const [isLoading,setIsLoading]=useState("");
    return(
        <>
            <div className="flex min-h-screen w-full items-center justify-center">
                <form onSubmit={loginSubmitHandler} className="mx-4 w-full max-w-md rounded-lg border-gray-200 p-6 md:p-8 md:border">
                    <div className="mb-4">
                        <h1 className="font-bold text-2xl">Crave Cart</h1>
                    </div>
                    <div className="relative mb-4">
                        <Input name="email" type='email' placeholder="Email" className="pl-10 focus-visible:ring-0" value={input.email} onChange={changeEventHandler}/>
                        <Mail className="absolute inset-y-1 left-2 text-gray-500 pointer-events-none"></Mail>
                        {errors && <p className="text-xs text-red-500">{errors.email}</p>}
                    </div>
                    <div className="relative mb-4">
                        <Input name="password" type='password' placeholder="password" className="pl-10 focus-visible:ring-0" value={input.password} onChange={changeEventHandler}/>
                        <LockKeyhole className="pointer-events-none absolute inset-y-1 left-2 text-gray-500" />
                        {errors && <p className="text-xs text-red-500">{errors.password}</p>}
                    </div>

                    <div className="mb-10">
                        {
                            isLoading ? <Button disabled className="bg-button hover:bg-button-hover w-full"><Loader2 className="mr-2 h-4 w-4 animate-spin"></Loader2> please wait</Button> :
                            <Button type="submit" className="bg-button hover:bg-button-hover w-full cursor-pointer">Login</Button>
                        }

                        <Link to='/forgot-password' className="hover:text-blue-500 hover:underline text-center">Forgot Password?</Link>
                    </div>

                    <Separator/>

                    <p className="text-center">Don't have an account?{" "}
                        <Link to='/signup' className="text-blue-500">Sign Up</Link>
                    </p>
                </form>
            </div>
        </>
    )
}

export default Login;