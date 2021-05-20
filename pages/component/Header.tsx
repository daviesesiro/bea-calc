import React from 'react'

interface Props {
    title: string
    actions?: any[]
}

const Header = ({ title, actions }: Props) => {
    return (
        <div className='rounded-b-xl p-4 bg-white'>
            <h1 className='font-sans text-2xl font-bold'>
                {title}
            </h1>
            <div>
                {actions && actions.length > 0 && actions.map((action, idx) => <div id={'action-' + idx}>{action}</div>)}
            </div>
        </div>
    )
}

export default Header
