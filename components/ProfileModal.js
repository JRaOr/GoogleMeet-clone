import { BsThreeDotsVertical } from 'react-icons/bs';
import { AiOutlineClose, AiOutlineEdit, AiOutlineArrowLeft, AiOutlineSearch } from 'react-icons/ai';
import { BsTrash } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { fillUser, hideProfileModal } from '../store/user/actions';
import { useEffect, useState } from 'react';
import { HiDesktopComputer } from 'react-icons/hi';
import { IoMdColorPalette } from 'react-icons/io';
import Api from '../util/Api';
export default function ProfileModal({ user }) {
    const dispatch = useDispatch();
    const [selectMenu, setSelectMenu] = useState(false);
    const [menu, setMenu] = useState('picture');
    const [searchFocus, setSearchFocus] = useState(false);
    const [pictures, setPictures] = useState([]);

    async function saveUserImage(image) {
        const response = await Api.getInstance().setUserImage(image);
        if (response.success) {
            dispatch(hideProfileModal());
            dispatch(fillUser())
        }
    }

    async function getDefaultPictures(){
        const response = await Api.getInstance().getPictures()
        if(response.success){
            setPictures(response.data)
        }
    }

    useEffect(()=>{
        getDefaultPictures();
    },[])
    
    return(
        <div className="modal-container">
            <div className="modal-content">
                <div className='flex p-3 text-2xl justify-between items-center'>
                    { !selectMenu ? 
                        <div onClick={()=>{
                            dispatch(hideProfileModal())
                        }} className='p-2 rounded-full hover:bg-[#34353a] cursor-pointer'>
                            <AiOutlineClose/>
                        </div> :
                        <div onClick={()=>{
                                setSelectMenu(false)
                            }} className='p-2 rounded-full hover:bg-[#34353a] cursor-pointer'>
                                <AiOutlineArrowLeft/>
                        </div>
                    }
                    {selectMenu && <p className='text-lg'>Cambia la foto de perfil</p>}
                    <div className='p-2 rounded-full hover:bg-[#34353a] cursor-pointer'>
                        <BsThreeDotsVertical/>
                    </div>
                </div>
                {!selectMenu ?
                <div className='modal-main'>
                    <h3 className='text-xl'>Foto de perfil</h3>
                    <p className='mt-3 text-sm text-slate-400'>
                        Una foto ayudará a las personas a reconocerte y te permitirá saber cuando hayas accedido a la cuenta
                    </p>
                    <div className='divider border-slate-400'/>
                    <div className='flex justify-center mt-3'>
                        <img onClick={()=>{
                            setSelectMenu(true)
                        }} src={user.avatar ? user.avatar : '/media/profile.png'} alt='profile' className=' w-40 h-40 rounded-full cursor-pointer'/>
                    </div>
                    <div className='flex items-center justify-between mt-10'>
                        <button onClick={()=>{
                            setSelectMenu(true)
                        }} className='w-[48%] transition-grl border-[1px] py-2 rounded-md flex items-center justify-center gap-2 font-semibold text-sky-200 hover:text-sky-400'>
                            <AiOutlineEdit/>Cambiar
                        </button>
                        <button className='w-[48%] transition-grl border-[1px] py-2 rounded-md flex items-center justify-center gap-2 font-semibold text-sky-200 hover:text-red-400'>
                            <BsTrash/>Quitar
                        </button>
                    </div>
                </div> : 
                <div className='modal-main'>
                    <div className='grid grid-cols-2 border-b-[1px] border-gray-500'>
                        <div onClick={()=>{
                            setMenu('picture')
                        }} className='pt-2 flex items-center flex-col justify-e hover:bg-gray-800 cursor-pointer'>
                            <button className={`flex items-center justify-center flex-col border-b-2 transition-grl ${menu === 'picture' ? 'border-blue-400 text-blue-400' : 'border-transparent text-white'}`}>
                                <IoMdColorPalette/>
                                Ilustraciones
                            </button>
                        </div>
                        <div onClick={()=>{
                            setMenu('computer')
                        }} className='pt-2 flex items-center flex-col justify-e hover:bg-gray-800 cursor-pointer'>
                            <button className={`flex items-center justify-center flex-col border-b-2 transition-grl ${menu === 'computer' ? 'border-blue-400 text-blue-400' : 'border-transparent text-white'}`}>
                                <HiDesktopComputer/>
                                Desde la computadora
                            </button>
                        </div>
                    </div>
                    {menu === 'picture' && 
                        <div className='py-2 mt-2'>
                            <div className={`flex items-center px-2 gap-2 border-[1px] rounded-md py-1 ${searchFocus ? 'border-blue-400' : 'border-gray-600'}`}>
                                <AiOutlineSearch/>
                                <input onFocus={()=>{
                                    setSearchFocus(true)
                                }} type='text' placeholder='Busca ilustraciones' className='w-full outline-none bg-transparent'/>
                            </div>
                            <div className='hide-scroll grid grid-cols-3 max-h-[500px] overflow-scroll mt-2'>
                                {pictures.map((picture, index)=>{
                                    return(
                                        <div onClick={()=>{
                                            saveUserImage(picture.url)
                                        }} key={index} className='flex cursor-pointer items-center justify-center p-1'>
                                            <img src={picture.url} alt='picture' className=' object-contain'/>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>}
                    {menu === 'computer' &&
                        <div>
                        </div>}

                </div>}
            </div>
        </div>
    )
}