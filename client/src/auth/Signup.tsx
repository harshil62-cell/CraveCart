import { Input } from "@/components/ui/input";
import { Contact, Loader2, LockKeyhole, Mail, PhoneIcon, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { userSignUpSchema, type SignupInputState } from "@/schema/userSchema";

// type SignupInputState={
//   fullName:string;
//   email:string;
//   password:string;
//   contact:string;
// }
//no need of this as type will provided by zod itself

const Signup = () => {
    const [input,setInput]=useState<SignupInputState>({
        email:"",
        password:"",
        fullname:"",
        contact:"",
    });

    const [errors,setErrors]=useState<Partial<SignupInputState>>({});

    const changeEventHandler=(e:ChangeEvent<HTMLInputElement>)=>{
        const {name,value}=e.target;
        setInput({...input,[name]:value})
    };

    const signUpSubmitHandler=(e:FormEvent)=>{
      e.preventDefault();
      //form validation
      const result = userSignUpSchema.safeParse(input);
      if(!result.success){
        const fieldErrors=result.error.flatten().fieldErrors;
        setErrors(fieldErrors as Partial<SignupInputState>);
        return;
      }

      //signup api call
    }

    const [isLoading,setIsLoading]=useState(false);
    return(
        <>
            <div className="flex min-h-screen w-full items-center justify-center">
                <form onSubmit={signUpSubmitHandler} className="mx-4 w-full max-w-md rounded-lg border-gray-200 p-6 md:p-8 md:border">
                    <div className="mb-4">
                        <h1 className="font-bold text-2xl">Crave Cart</h1>
                    </div>
                    <div className="relative mb-4">
                        <Input name="fullname" type='text' placeholder="Full Name" className="pl-10 focus-visible:ring-0" value={input.fullname} onChange={changeEventHandler}/>
                        <User className="absolute inset-y-1 left-2 text-gray-500 pointer-events-none"></User>
                        {
                          errors && <p className="text-xs text-red-500">{errors.fullname}</p>
                        }
                    </div>
                    <div className="relative mb-4">
                        <Input name="contact" type='text' placeholder="Contact Number" className="pl-10 focus-visible:ring-0" value={input.contact} onChange={changeEventHandler}/>
                        <PhoneIcon className="absolute inset-y-1 left-2 text-gray-500 pointer-events-none"></PhoneIcon>
                        {
                          errors && <p className="text-xs text-red-500">{errors.contact}</p>
                        }
                    </div>
                    <div className="relative mb-4">
                        <Input name="email" type='email' placeholder="Email" className="pl-10 focus-visible:ring-0" value={input.email} onChange={changeEventHandler}/>
                        <Mail className="absolute inset-y-1 left-2 text-gray-500 pointer-events-none"></Mail>
                        {
                          errors && <p className="text-xs text-red-500">{errors.email}</p>
                        }
                    </div>
                    <div className="relative mb-4">
                        <Input name="password" type='password' placeholder="password" className="pl-10 focus-visible:ring-0" value={input.password} onChange={changeEventHandler}/>
                        <LockKeyhole className="pointer-events-none absolute inset-y-1 left-2 text-gray-500" />
                        {
                          errors && <p className="text-xs text-red-500">{errors.password}</p>
                        }
                    </div>

                    <div className="mb-10">
                        {
                            isLoading ? <Button disabled className="bg-button hover:bg-button-hover w-full"><Loader2 className="mr-2 h-4 w-4 animate-spin"></Loader2> please wait</Button> :
                            <Button type="submit" className="bg-button hover:bg-button-hover w-full">Signup</Button>
                        }
                    </div>

                    <Separator/>

                    <p className="text-center">Already have an account?{" "}
                        <Link to='/login' className="text-blue-500">Login</Link>
                    </p>
                </form>
            </div>
        </>
    )
}

export default Signup;