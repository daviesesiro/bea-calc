import React from 'react'


const Balance: React.FC<{ title: string; balance: number }> = ({ title, balance }) => {
    return (
        <div className='rounded-xl dark:bg-gray-700 px-4 py-5 mx-5 bg-white'>
            <p className='text-xs text-gray-400 uppercase'>{title}</p>
            <p className='font-sans-2 dark:text-blue-500 mt-2 text-5xl text-blue-900'>&#8358; {balance.toLocaleString('en-US')}</p>
        </div>
    )
}

export default Balance
