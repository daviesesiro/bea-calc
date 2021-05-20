import React from 'react'

interface Props {
    name: string;
    balance: number
}

const Person = ({ balance, name }: Props) => {
    const commarise = (num: number) => {
        let commarised = '', strNum = num.toString()
        for (let i = strNum.length - 1; i >= 0; i = i--) {
            commarised += strNum[i]
            if (i % 3 == 0) commarised += ','
        }
        console.log(commarised);
        return commarised;
    }
    commarise(4000)
    commarise(444000)
    commarise(40000)
    return (
        <div className='bg-person-gradient flex items-center px-4 py-6 mx-5 mb-4 rounded-lg'>
            <div className='mr-5'>
                <svg width={35} height={35} viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width={35} height={35} rx={6} fill="white" />
                    <path d="M26.4444 27.625V25.4444C26.4444 24.2878 25.985 23.1785 25.1671 22.3607C24.3492 21.5428 23.24 21.0833 22.0833 21.0833H13.3611C12.2045 21.0833 11.0952 21.5428 10.2773 22.3607C9.45947 23.1785 9 24.2878 9 25.4444V27.625" stroke="#27496D" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M17.7222 16.7222C20.1308 16.7222 22.0833 14.7697 22.0833 12.3611C22.0833 9.95254 20.1308 8 17.7222 8C15.3136 8 13.3611 9.95254 13.3611 12.3611C13.3611 14.7697 15.3136 16.7222 17.7222 16.7222Z" stroke="#27496D" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                </svg>

            </div>
            <div className='flex-1'>
                <p className='mb-3 text-xl text-blue-200'>{name}</p>
                <p className='font-sans-2 text-4xl font-light text-white'>&#8358; {balance}</p>
            </div>
            <div>
                <svg width={38} height={38} viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx={19} cy={19} r="18.5" stroke="#E3F6F5" />
                    <path d="M12 19H26" stroke="#E3F6F5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M19 12L26 19L19 26" stroke="#E3F6F5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                </svg>


            </div>
        </div>
    )
}

export default Person
