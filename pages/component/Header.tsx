import React from 'react'

interface Props {
    title: string
    actions?: { icon: any; onPress: any; title: string }[]
}

const Header = ({ title, actions }: Props) => {
    return (
        <React.Fragment>
            <div className='rounded-b-xl fixed top-0 left-0 right-0 flex items-center justify-between p-4 bg-white'>
                <h1 className='font-sans text-2xl font-bold'>
                    {title}
                </h1>
                <div>
                    {actions && actions.length > 0 &&
                        actions.map((action, idx) =>
                            <button className='bg-gray-50 p-1 rounded-full' title={action.title} onClick={action.onPress} key={'action-' + idx}>{action.icon}</button>
                        )}
                </div>
            </div>
            <div className='h-24'></div>
        </React.Fragment>
    )
}

export default Header
