import {z} from "zod";

export const userSignUpSchema=z.object({
    fullname:z.string().min(1,"Fullname is required"),
    email:z.email("Invalid email address"),
    password:z.string().min(6,"Password must be atleast 6 characters"),
    contact:z.string().min(10,"contact number must be 10 digits")
});

export const userLoginSchema=z.object({
    email:z.email("Invalid email address"),
    password:z.string().min(6,"Password must be atleast 6 characters"),
});

export type SignupInputState = z.infer<typeof userSignUpSchema>;
export type LoginInputState = z.infer<typeof userLoginSchema>;