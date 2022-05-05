import { useDispatch, useSelector } from 'react-redux';
import Api from '../util/Api';
import { signin, signout } from '../store/user/actions';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { AiFillGithub, AiFillLinkedin, AiFillInstagram, AiFillFacebook} from 'react-icons/ai';
import Link from 'next/link';
export default function Signin(){
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const router = useRouter();

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
        }))
    }
    const social = [
        { link: 'https://github.com/JRaOR', icon : <AiFillGithub/>, color: 'github'},
        { link: 'https://www.linkedin.com/in/gerardo-ramirez-ortega-a2239b133/', icon : <AiFillLinkedin/>, color: 'linkedin'},
        { link: 'https://www.instagram.com/gerardo.raor/', icon : <AiFillInstagram/>, color: 'instagram'},
        { link: 'https://www.facebook.com/gerardo.ramirezortega.5', icon : <AiFillFacebook/>, color: 'facebook'},
    ]
    return (
        <div className='flex items-center justify-center h-[100vh]'>
            <section className=' min-w-[480px] h-auto rounded-md signup-box bg-white  py-10 relative z-10 flex flex-col items-center justify-center px-10'>
                <img src='/media/Google-Meet-Logo.png' className='h-[100px] object-contain mb-5'/>
                <p className='text-2xl text-gray-500 cursor-default font-semibold mb-5'><span className='font-bold text-gray-700'>Google</span> Meet Clone</p>
                <form className='flex flex-col gap-5 w-full items-center' onSubmit={submit}>
                    <input placeholder='username' className='bg-[#ffffff3f] w-full px-3 py-2 font-xl outline-none border-b-2 border-gray-300 focus:border-purple-400 text-center' type="text" name="username"/>
                    <input placeholder='password' className='bg-[#ffffff3f] w-full px-3 py-2 font-xl outline-none border-b-2 border-gray-300 focus:border-orange-400 text-center' type="password" name="password"/>
                    <button className='text-xl w-[130px] py-1 mt-5 border-2 bg-sky-600 text-white rounded-lg border-sky-700 hover:bg-sky-500 transition-grl' type="submit" >SignIn</button>
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
            <img src='/media/signin-bg.jpg' className='h-full w-full z-0 object-cover absolute'/>
        </div>
    )
}