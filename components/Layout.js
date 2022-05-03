import { useRouter } from "next/router"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fillUser, signout } from "../store/user/actions"
import Api from "../util/Api"
import ProfileModal from "./ProfileModal"
import Topbar from "./Topbar"
import Script from 'next/script'
import EmailModal from "./EmailModal"
export default function Layout({ children }){
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const router = useRouter()

    async function heartbeat(token){
        if (!Api.getInstance().base.defaults.headers.Authorization) {
            Api.setInstance(token);
        }
        const response = await Api.getInstance().heartbeat();
        if (response.success) {
            if(!user.userId){
                dispatch(fillUser())
            }
        } else {
            console.log('Token expired');
            dispatch(signout());
        }
    }

    useEffect(()=>{
        if(localStorage.getItem('token')){
            heartbeat(localStorage.getItem('token'))    
        }
    },[])

    const routes = [
        '/signin',
        '/signup',
        '/room/[...id]',
    ]
    return(
        <>
            <Topbar hidden={routes.includes(router.pathname)}/>
            {user.ux.profileModal && <ProfileModal user={user}/>}
            {user.ux.emailModal.open && <EmailModal/>}
            <main className={`h-[100vh] w-[100vw] overflow-hidden ${!routes.includes(router.pathname) && 'pt-[70px]'}`}>
                {children}
            </main>
            <Script src="https://sdk.twilio.com/js/video/releases/2.21.0/twilio-video.min.js" strategy="beforeInteractive"/>
        </>
    )
}