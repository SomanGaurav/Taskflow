"use client"

import {z} from "zod";
import {useForm} from "react-hook-form";  
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"


type FormType = 'login' | 'signup' ; 

const AuthFormSchema = (formType : FormType) => {
    return z.object(
        {
            fullName :formType==='login'? z.string().optional() : z.optional(z.string().max(50 , "Username must be under 50 characters")),
            email : z.string().email(), 
            password : z.string().min(6 , "password must be more than 5 characters")
        }
    )
}


export const AuthForm = ({type} : {type : FormType})=> {
    const[isLoading , setIsLoading]=useState(false); 
    const[errorMessage , setErrorMessage]=useState(); 

    const formSchema = AuthFormSchema(type); 
    const form = useForm<z.infer<typeof formSchema>>({
        resolver : zodResolver(formSchema), 
        defaultValues : {
            fullName : "" , 
            email : "",
            password : "", 
        }
    })

    const onSubmit = async(values : z.infer<typeof formSchema>)=>{
        console.log(values);
    }


    return(
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full h-full flex flex-col justify-center items-center">
          {type==="signup" && <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="name" {...field} className="w-[100%]"/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />}

            <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input placeholder="email" {...field} className="w-[100%]" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
            )}
          />

            <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel className="">Password</FormLabel>
                        <FormControl>
                            <Input placeholder="password"   type="password" {...field} className="w-[100%]"/>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    )
}

