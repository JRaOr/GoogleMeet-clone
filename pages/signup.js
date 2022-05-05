import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { showToast, signin } from "../store/user/actions";
import Api from "../util/Api";
import { useRouter } from "next/router";
import Link from "next/link";
export default function Signup(){
    const dispatch = useDispatch();
    const router = useRouter();
    const initialState = {
        fields : [
            {
                name: 'username',
                label: 'Usuario',
                type: 'text',
                placeholder: 'Usuario',
            },
            {
                name: 'password',
                label: 'Contraseña',
                type: 'password',
                placeholder: 'Contraseña',
            },
            {
                name: 'confirmPassword',
                label: 'Confirmar contraseña',
                type: 'password',
                placeholder: 'Confirmar contraseña',
            }
        ],
        values : {
            username: { value: '', valid: false, error: '' },
            password: { value: '', valid: false, error: '' },
            confirmPassword: { value: '', valid: false, error: '' },
        }
    }
    const [values, setValues] = useState(initialState.values);

    async function submit(e){
        e.preventDefault()
        if(e.target.password.value === e.target.confirmPassword.value){
            const response = await Api.getInstance().SignUp(e.target.username.value, e.target.password.value);
            if(response && response.success){
                dispatch(signin(e.target.username.value, e.target.password.value));
                dispatch(showToast({
                    message: 'Usuario creado correctamente',
                    type: 'success',
                    icon: '💯',
                    position: 'bottom-right',
                }))
                setTimeout(()=>{
                    router.push('/')
                }, 1000)
            }
        }
    }

    async function checkUserExists(value){
        const response = await Api.getInstance().checkUserAvailable(value);
        if(response && response.success){
            if(!response.data.available){
                values.username.error = response.data.message;
                values.username.valid = false;
            }
        }
        setValues({...values});
    }

    function validate(e){
        e.persist()
        const { name, value } = e.target;
        let error = '';
        switch(name){
            case 'username':
                value != '' && checkUserExists(value)
                if(value.length < 5){
                    error = 'El nombre de usuario debe tener al menos 5 caracteres';
                }
                break;
            case 'password':
                if(value.length < 5){
                    error = 'La contraseña debe tener al menos 5 caracteres';
                }
                break;
            case 'confirmPassword':
                if(value !== values.password.value){
                    error = 'Las contraseñas no coinciden';
                }
                break;
            default:
                break;
            }

        values[name].value = value;
        values[name].valid = error === '';
        values[name].error = error;
        setValues({ ...values });
    }

    function isFormValid(){
        let valid = true;
        Object.keys(values).forEach(key => {
            if(!values[key].valid){
                valid = false;
            }
        });
        return valid;
    }

    return(
        <div className="flex items-center justify-center h-full w-full relative overflow-hidden px-5">
            <section className="relative z-10 bg-[white] w-full max-w-[400px] signup-box py-10 px-5 sm:px-10 flex flex-col items-center">  
                <Link href='/signin'>
                    <img src='/media/Google-Meet-Logo.png' className='h-[100px] object-contain mb-5 cursor-pointer'/>
                </Link> 
                <p className='text-2xl text-gray-500 cursor-default font-semibold mb-5'><span className='font-bold text-gray-700'>Google</span> Meet Clone</p>

                <form className="flex flex-col items-center w-full gap-2 text-black" onSubmit={submit}>
                    {initialState.fields.map((field, index)=>{
                        return(
                            <div className="flex flex-col items-center w-full gap-2" key={index}>
                                <input className={`border p-2 w-full outline-none ${values[field.name].error ? 'border-red-400':'border-gray-300'}`} type={field.type} name={field.name} placeholder={field.placeholder} onChange={validate}/>
                                {values[field.name].error && <p className="text-red-500 text-xs italic w-full text-right">{values[field.name].error}</p>}
                            </div>
                        )
                    })}
                    <button disabled={!isFormValid()} className={`w-full cursor-pointer bg-emerald-500 text-white h-10 mt-5 hover:bg-emerald-600 transition-grl disabled:bg-slate-500`} type="submit">Registrarse</button>
                </form>
            </section>
            <div className="bg-animation bg-signup"/>
        </div>
    )
}