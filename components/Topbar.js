import { CgMenuGridR } from "react-icons/cg"
import { useDispatch, useSelector } from "react-redux"
import { MdOutlineContactSupport, MdOutlineFeedback} from "react-icons/md"
import { FiSettings } from "react-icons/fi"
import Link from "next/link"
import Clock from 'react-live-clock';
import { useState } from "react"
import { AiOutlineClose, AiOutlineCamera } from "react-icons/ai"
import { showProfileModal, signout } from "../store/user/actions"
import  { useRouter } from "next/router"
export default function Topbar({ hidden }) {
    const user = useSelector(state => state.user)
    const [menuActive, setMenuActive] = useState(false)
    const [menuProfile, setMenuProfile] = useState(false)
    const dispatch = useDispatch()
    const router = useRouter()
    const _renderAvatar = (big) => (
        <button onClick={()=>{ setMenuProfile(!menuProfile) }} className={`${ big ? 'h-[100px] w-[100px]': 'h-[40px] w-[40px]'} bg-purple-400 rounded-full overflow-hidden cursor-pointer`}>
            {user.avatar ? <img src={user.avatar} alt="avatar" /> : null}
        </button>
    )

    const _renderMenuButton = (icon) => (
        <button className="flex items-center justify-center text-gray-500 hover:text-gray-600 text-2xl cursor-pointer h-[35px] w-[35px] rounded-full hover:bg-slate-100 transition-grl">
            {icon}
        </button>
        )

    const apps = [
        {
            name: "Gmail",
            image: "/media/Logos/Gmail-Logo.png",
            link: "https://gmail-clone-livid.vercel.app/"
        },
        {
            name: "Airbnb",
            image: "/media/Logos/Airbnb-Logo.png",
            link: "https://airbnb-clone-seven-beta.vercel.app/"
        },
        {
            name: "Chat",
            image: "/media/Logos/Chat-Logo.png",
            link: "https://interactive-comments-section-dun.vercel.app/"
        },
        {
            name: "Countries",
            image: "/media/Logos/Countries-Logo.png",
            link: "https://countries-roan.vercel.app/"
        },
        {
            name: "Covid",
            image: "/media/Logos/COVID-Logo.png",
            link: "https://covid-angular.vercel.app/"
        },
        {
            name: "Advices",
            image: "/media/Logos/Google-New-Logo.png",
            link: "https://advice-generator-umber.vercel.app/"
        },
        {
            name: "Portfolio",
            image: "/media/Logos/Portfolio-Logo.png",
            link: "https://portafolio-henna.vercel.app/"
        }
    ]
    
    return (
        <>
            {!hidden && 
                <header className="h-[70px] w-full bg-white flex justify-between px-3 fixed">
                    <div className="flex items-center">
                        <Link href="/">
                            <img src='/media/Google-Meet-Logo.png' className="h-[35px] object-contain cursor-pointer"/>
                        </Link>
                        <p className="text-2xl text-gray-500 cursor-default">
                            <span className="font-semibold">Google</span> Meet
                        </p>
                    </div>
                    <div className="flex items-center gap-5">
                        <p className="text-gray-500 font-normal text-xl cursor-default">
                            <Clock format={'HH:mm A - ddd, D MMM'} ticking={true} />
                        </p>
                        <div className="flex gap-2">
                            {_renderMenuButton(<MdOutlineContactSupport/>)}
                            {_renderMenuButton(<MdOutlineFeedback/>)}
                            {_renderMenuButton(<FiSettings/>)}
                        </div>
                        <div onClick={()=>{
                            setMenuActive(!menuActive)
                        }} className="text-gray-400 text-2xl cursor-pointer hover:text-gray-600 transition-grl">
                            <CgMenuGridR/>
                        </div>
                        {_renderAvatar()}
                        {menuActive &&
                        <div className="absolute right-3 top-[80px] menu-meet bg-white">
                            <div className="flex justify-between"><h4 className="text-xl select-none">My Other Apps</h4> <AiOutlineClose onClick={()=>{
                                setMenuActive(!menuActive)
                            }} className="cursor-pointer"/></div>
                            <div className="divider"/>
                            <div className="grid grid-cols-3 gap-5 ">
                                {apps.map((app, index) => (
                                    <a href={app.link} key={`apps-${index}`} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-between gap-2 rounded-md hover:bg-slate-50 select-none">
                                        <img src={app.image} className="h-[50px] w-[50px] object-contain "/>
                                        <p className="text-gray-500 font-normal text-xl">{app.name}</p>
                                    </a>
                                ))}
                            </div>
                        </div>}
                        {menuProfile &&
                        <div className="absolute right-3 top-[80px] menu-profile bg-white flex flex-col items-center">
                            <div className="relative">
                                {_renderAvatar(true)}
                                <div onClick={()=>{
                                    dispatch(showProfileModal())
                                    setMenuProfile(!menuProfile)
                                }} className="absolute h-7 w-7 bottom-1 text-xl right-1 rounded-full bg-white flex items-center justify-center shadow-lg cursor-pointer hover:text-blue-600">
                                    <AiOutlineCamera/>
                                </div>
                            </div>
                            <h4 className="text-normal font-semibold mt-5">{user.name || user.username}</h4>
                            <p className="text-gray-500 font-normal text-normal">{user.email}</p>
                            <div className="divider w-full"/>
                            <div className="w-full flex items-center justify-center">
                                <button onClick={()=>{
                                    setMenuProfile(!menuProfile)
                                    dispatch(signout())
                                    router.push('/signin')
                                }} className="border-[2px] px-5 py-2 rounded-md text-gray-600 hover:bg-stone-50 font-semibold">
                                    Salir de tu cuenta
                                </button>
                            </div>
                        </div>}
                    </div>
                </header>
            }
        </>
    )
}