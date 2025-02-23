import { useState } from "react"
import { loginSchema } from "../utils/formschema";
import { AuthStore } from "../store/useAuthStore";

const Login = () => {
    const {login ,  isLoggingIn} = AuthStore();
    const formSchema = loginSchema ; 
    const[formData , setFormData]=useState({
        email : '' , 
        password : '' ,
    })

    const handleChange = (e : any)=>{
        setFormData({
            ...formData , 
            [e.target.name]:e.target.value , 
        });
    }; 


    const handleSubmit = (e : any) => {
        
        e.preventDefault() 
        try{
            
            const parsedData = formSchema.parse(formData);
            console.log(parsedData)
            login(parsedData);
        }catch(error){

        }
    }
  return (
    <main className="w-screen h-screen flex  bg-[var(--primary-dark)] justify-center items-center">
       <section className="w-[40%] h-[67%] rounded-xl bg-[var(--secondary-dark)] flex flex-col items-center">
            <div><h1 className="text-4xl text-amber-50 m-5">Login</h1></div>
            <div className="w-full h-full m-5 ">
                <form onSubmit={handleSubmit} className="w-full h-full">
                    <label  className="text-2xl text-fuchsia-50 ml-[10%]">Email</label><br/>
                    <input type="text" name="email" value={formData.email} onChange={handleChange} className="form-input" placeholder="john@email.com"/><br/>
                    <label className="text-2xl text-fuchsia-50 ml-[10%]">Password</label><br/>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} className="form-input" placeholder="......."/><br/>
                    <input type="submit" className="ml-[10%] bg-fuchsia-600 w-[15%] rounded-sm "/>
                </form>
            </div>
            {/* <div className="w-full h-full">
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label> <br />
                <input type="text" name="email" value={formData.email} onChange={handleChange} className="form-input w-[50%]"/>
                <br />
                <label htmlFor="password">Password</label><br/>
                <input type="password"  name="password" value={formData.password} onChange={handleChange} className="form-input w-[50%] space-y-4"/>
                <br />
                <button type="submit" className="">Login</button>
            </form>
            </div> */}
       </section>
       
    </main>
  )
}

export default Login