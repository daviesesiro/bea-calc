import React from 'react'
import Link from 'next/link'

interface Props {
    id: string
    name: string;
    balance: number
}

const Person = ({ balance, name, id }: Props) => {
    balance = balance || 0;
    return (
        <Link href={`/person/${id}?name=${name}`}>
            <a className='bg-person-gradient flex items-center px-3 py-3 mx-5 mb-4 rounded-lg'>
                <div className='mr-5'>
                    <svg width={35} height={35} viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width={35} height={35} rx={6} fill="white" />
                        <path d="M26.4444 27.625V25.4444C26.4444 24.2878 25.985 23.1785 25.1671 22.3607C24.3492 21.5428 23.24 21.0833 22.0833 21.0833H13.3611C12.2045 21.0833 11.0952 21.5428 10.2773 22.3607C9.45947 23.1785 9 24.2878 9 25.4444V27.625" stroke="#27496D" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M17.7222 16.7222C20.1308 16.7222 22.0833 14.7697 22.0833 12.3611C22.0833 9.95254 20.1308 8 17.7222 8C15.3136 8 13.3611 9.95254 13.3611 12.3611C13.3611 14.7697 15.3136 16.7222 17.7222 16.7222Z" stroke="#27496D" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                    </svg>

                </div>
                <div className='flex-1'>
                    <p className='mb-1 text-sm text-blue-200 capitalize'>{name}</p>
                    <p className='font-sans-2 text-3xl font-light text-white'>&#8358; {balance.toLocaleString('en-US')}</p>
                </div>
                <div>
                    <svg width={30} height={30} viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx={19} cy={19} r="18.5" stroke="#E3F6F5" />
                        <path d="M12 19H26" stroke="#E3F6F5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M19 12L26 19L19 26" stroke="#E3F6F5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                    </svg>


                </div>
            </a>
        </Link>
    )
}

export default Person
