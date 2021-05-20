import React, { ReactElement } from 'react'

interface Props {
    title: string;
}

const Modal: React.FC<Props> = ({ title, children }) => {
    return (
        <div className='fixed inset-0 z-20 flex items-center justify-center h-screen bg-black bg-opacity-25'>
            <div className='rounded-xl relative z-30 flex-1 p-5 mx-8 bg-white'>
                <svg className=' right-4 top-4 absolute' width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 6L6 18" stroke="black" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M6 6L18 18" stroke="black" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                </svg>

                <h2 className='text-lg font-bold'>{title}</h2>
                {children}
            </div>
        </div>
    )
}

export default Modal
