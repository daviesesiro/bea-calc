import React, { ReactElement } from 'react'

interface Props {
    title: string;
    closeModal: any;
    subtitle?: string
}

const Modal: React.FC<Props> = ({ title, subtitle, closeModal, children }) => {
    return (
        <React.Fragment>
            <button onClick={closeModal} className='fixed inset-0 z-20 w-full h-screen bg-black bg-opacity-25'>&nbsp;</button>
            <div className='rounded-xl left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 dark:bg-gray-800 fixed z-30 w-10/12 px-5 py-8 transform bg-white'>
                <button className='right-4 top-4 absolute' onClick={closeModal}>
                    <svg className='dark:text-gray-500' width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 6L6 18" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M6 6L18 18" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>

                <div className=' mb-8'>
                    <h2 className='dark:text-gray-400 text-lg font-bold'>{title}</h2>
                    {subtitle && <p className='dark:text-gray-200 text-xs font-light'>{subtitle}</p>}

                </div>
                {children}
            </div>
        </React.Fragment>
    )
}

export default Modal
