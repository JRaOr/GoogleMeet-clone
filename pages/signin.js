import { useDispatch, useSelector } from 'react-redux';
import Api from '../util/Api';
import { signin, signout } from '../store/user/actions';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { AiFillGithub, AiFillLinkedin, AiFillInstagram, AiFillFacebook} from 'react-icons/ai';
import Link from 'next/link';
export default function Signin(){
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const router = useRouter();
    const [error, setError] = useState('');
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
        ],
        values : {
            username: { value: '', valid: false, error: '' },
            password: { value: '', valid: false, error: '' },
        }
    }
    const [values, setValues] = useState(initialState.values);

    useEffect(()=>{
        if(user.token){
            dispatch(signout())
        }
    },[])

    async function submit(e){
        e.preventDefault()
        dispatch(signin(e.target.username.value, e.target.password.value, ()=>{
            if(router.query.redirect) {
                router.push(router.query.redirect);
            } else
                router.push('/');
        }, ()=>{
            setError('Usuario o contraseña incorrectos');
            }));
    }
    const social = [
        { link: 'https://github.com/JRaOR', icon : <AiFillGithub/>, color: 'github'},
        { link: 'https://www.linkedin.com/in/gerardo-ramirez-ortega-a2239b133/', icon : <AiFillLinkedin/>, color: 'linkedin'},
        { link: 'https://www.instagram.com/gerardo.raor/', icon : <AiFillInstagram/>, color: 'instagram'},
        { link: 'https://www.facebook.com/gerardo.ramirezortega.5', icon : <AiFillFacebook/>, color: 'facebook'},
    ]

    function validate(e){
        e.persist()
        const { name, value } = e.target;
        values[name].value = value;
        if(value.length > 4){
            values[name].valid = true;
            values[name].error = '';
        } else {
            values[name].valid = false;
        }
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

    return (
        <div className='flex items-center justify-center h-[100vh] relative overflow-hidden px-5'>
            <section className=' max-w-[400px] w-full rounded-md signup-box bg-white py-10 px-5 sm:px-10 relative z-10 flex flex-col items-center justify-center'>
                <img src='/media/Google-Meet-Logo.png' className='h-[100px] object-contain mb-5'/>
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
                    {error && <p className="text-red-500 text-xs italic w-full text-right">{error}</p>}
                    <button disabled={!isFormValid()} className={`w-full cursor-pointer bg-rose-500 text-white h-10 mt-5 hover:bg-rose-600 transition-grl disabled:bg-slate-500`} type="submit">Ingresar</button>
                </form>
                <div className='mt-5'>
                    <p>No tienes una cuenta? - <Link href={'/signup'}><span className='text-purple-400 cursor-pointer'>Registrate aqui!</span></Link></p>
                </div>
                <div className='flex mt-10 gap-5 text-3xl'>
                    {social.map((item, index)=>(
                        <a href={item.link} target='_blank' rel='noopener noreferrer' key={index} className={`text-gray-500 ${item.color} transition-grl`}>
                            {item.icon}
                        </a>
                    ))}
                </div>
            </section>
            <div className='bg-animation bg-signin'/>
        </div>
    )
}