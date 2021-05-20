import React from 'react'
import { useRouter } from 'next/router'

interface Props {
    title: string
    actions?: { icon: any; onPress: any; title: string }[]
    home?: boolean
}

const Header = ({ title, actions, home }: Props) => {
    return (
        <React.Fragment>
            <div className='rounded-b-xl fixed top-0 left-0 right-0 flex items-center justify-between p-4 bg-white'>
                {!home &&
                    <button className='focus:outline-none p-2 mr-4' onClick={useRouter().back}>
                        <svg width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15 8H1" stroke="black" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M8 15L1 8L8 1" stroke="black" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                        </svg>

                    </button>
                }
                <h1 className='flex-1 font-sans text-2xl font-bold'>
                    {title}
                </h1>
                <div>
                    {actions && actions.length > 0 &&
                        actions.map((action, idx) =>
                            <button className='focus:outline-none bg-gray-50 p-2 rounded-full' title={action.title} onClick={action.onPress} key={'action-' + idx}>{action.icon}</button>
                        )}
                </div>
            </div>
            <div className='h-24'></div>
        </React.Fragment>
    )
}

export default Header
