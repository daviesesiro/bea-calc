import React from 'react'
import { useRouter } from 'next/router'

interface Props {
    title: string
    actions?: { icon: any; onPress: any }[]
    home?: boolean
}

const Header = ({ title, actions, home }: Props) => {
    const router = useRouter()
    return (
        <React.Fragment>
            <div className='rounded-b-xl dark:bg-gray-800 fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 bg-white'>
                {!home &&
                    <button className='focus:outline-none p-2 mr-2' onClick={() => router.push('/')}>
                        <svg stroke='currentColor' className='dark:text-gray-500' width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15 8H1" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M8 15L1 8L8 1" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                        </svg>

                    </button>
                }
                <h1 className='dark:text-gray-200 flex-1 font-sans text-lg capitalize'>
                    {title}
                </h1>
                <div>
                    {actions && actions.length > 0 &&
                        actions.map((action, idx) =>
                            <button className='focus:outline-none p-1 ml-3 rounded-full' onClick={action.onPress} key={'action-' + idx}>{action.icon}</button>
                        )}
                </div>
            </div>
            <div className='h-24'></div>
        </React.Fragment>
    )
}

export default Header
