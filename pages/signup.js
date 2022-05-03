import { useState } from "react";
import { useDispatch } from "react-redux";
import { signin } from "../store/user/actions";
import Api from "../util/Api";
import { useRouter } from "next/router";
import Link from "next/link";
export default function Signup(){
    const dispatch = useDispatch();
    const router = useRouter();
    async function submit(e){
        e.preventDefault()
        if(e.target.password.value === e.target.confirmPassword.value){
            const response = await Api.getInstance().SignUp(e.target.username.value, e.target.password.value);
            if(response && response.success){
                dispatch(signin(e.target.username.value, e.target.password.value));
                router.push('/')
            }
        }
    }

    const [validInputs, setValidInputs] = useState({
        username: false,
        password: false,
        confirmPassword: false,
    })

    function validate(e){
        if(e.target.value.length > 4){
            setValidInputs({
                ...validInputs,
                [e.target.name]: true,
            })
        } else {
            setValidInputs({
                ...validInputs,
                [e.target.name]: false,
            })
        }
    }
    return(
        <div className="flex items-center justify-center h-full w-full">
            <section className="relative z-10 bg-[white] h-full max-h-[500px] w-full max-w-[400px] signup-box p-5 flex flex-col items-center">  
                <Link href='/'>
                    <img src='/media/Google-Meet-Logo.png' className='h-[100px] object-contain mb-5 cursor-pointer'/>
                </Link> 
                <p className='text-2xl text-gray-500 cursor-default font-semibold mb-5'><span className='font-bold text-gray-700'>Google</span> Meet Clone</p>

                <form onChange={validate} className="flex flex-col items-center w-full gap-5 text-black" onSubmit={submit}>
                    <input className={`input-custom ${validInputs.username ? 'border-green-400':'border-slate-400'} focus:border-purple-400`}  type="text" name="username" placeholder="username"/>
                    <input className={`input-custom ${validInputs.password ? 'border-green-400':'border-slate-400'} focus:border-purple-400`}   type="password" name="password" placeholder="password"/>
                    <input className={`input-custom ${validInputs.confirmPassword ? 'border-green-400':'border-slate-400'} focus:border-purple-400`}   type="password" name="confirmPassword" placeholder="confirm password"/>
                    <button className={`text-white text-2xl font-semibold bg-purple-700 px-5 py-2 rounded-md`} type="submit" value="Submit">Registrar</button>
                </form>
            </section>
            <img src="/media/signup-bg.jpg" className="h-full w-full object-cover fixed z-0" />
        </div>
    )
}