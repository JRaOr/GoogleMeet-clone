import { useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { hideEmailModal, showToast } from '../store/user/actions';
import Api from '../util/Api';

export default function EmailModal({}) {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const user = useSelector(state => state.user);

    async function sendEmail() {
        const response = await Api.getInstance().sendEmail({
            email: email,
            username: user.username,
            roomLink: user.ux.emailModal.roomLink,
            message: message
        });

        if (response.success) {
            setEmail('');
            setMessage('');
            setError('');
            dispatch(hideEmailModal());
            dispatch(showToast({
                message: 'Email enviado',
                type: 'success',
                position: 'bottom-right',
                icon: '📧',
                }));
        } else {
            setError(response.message);
        }
    }

    return(
        <div className="modal-container">
            <div className="modal-content">            
                <div className='flex p-3 text-2xl justify-between items-center'>
                    <button onClick={()=>{
                        dispatch(hideEmailModal())
                        }} className='p-2 rounded-full hover:bg-[#34353a] cursor-pointer'>
                        <AiOutlineClose/>
                    </button> 
                    <div className='p-2 rounded-full hover:bg-[#34353a] cursor-pointer'>
                        <BsThreeDotsVertical/>
                    </div>
                </div>
                <div className='modal-main'>
                    <h3 className='text-xl'>Enviar invitacion por email.</h3>
                    <p className='mt-3 text-sm text-slate-400'>
                        Por cuestiones de seguridad y pruebas, solo podras enviar una invitacion por email. (Nota: Toman unos minutos en llegar, pero llegan.) 
                    </p>
                    <div className='flex justify-center mt-3 flex-col'>
                        <input value={email} onChange={(e)=> setEmail(e.target.value)} className='w-full rounded-md p-2 bg-transparent border-[2px] border-slate-700 focus:border-sky-600 outline-none' type='text' placeholder='Email'/>
                        <textarea value={message} onChange={(e)=> setMessage(e.target.value)} className='w-full mt-5 min-h-[150px] rounded-md p-2 bg-transparent border-[2px] max-h-[300px] border-slate-700 focus:border-sky-400 outline-none' placeholder='Mensaje'/>
                        <button onClick={()=>{
                            sendEmail()
                        }} disabled={email === '' || message === ''} className='mt-5 bg-sky-700 py-2 px-5 w-full rounded-md hover:bg-sky-800 transition-grl disabled:bg-slate-500'>
                            Enviar
                        </button>
                        {error && <p className='text-red-500 text-sm mt-2'>{error}</p>}
                    </div>
                </div>
            </div>
        </div>
    )
}