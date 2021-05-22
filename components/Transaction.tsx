import React, { useState } from 'react'
import Modal from './Modal';
import DB from '../utils/DB'
import { useStateContext } from '../Context';
interface Props {
    type: string;
    title: string;
    description: string;
    amount: number
    transactionDate: Date
    id: string
    personId: string
}

const Transaction: React.FC<Props> = ({ type, personId, id, amount, description, transactionDate, title }) => {

    const receiving = type === 'Receiving'
    const Icon = receiving ? <svg width={24} height={14} viewBox="0 0 24 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M23 1L13.5 10.5L8.5 5.5L1 13" stroke="#6DFF0E" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        <path d="M17 1H23V7" stroke="#6DFF0E" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </svg>

        : <svg width={24} height={14} viewBox="0 0 24 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M23 13L13.5 3.5L8.5 8.5L1 1" stroke="#FFA8A6" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
            <path d="M17 13H23V7" stroke="#FFA8A6" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        </svg>

    const [showModal, setShowModal] = useState(false)
    const { setState } = useStateContext()

    const handleDelete = async () => {
        if (confirm('Are you sure you want to delete this transaction?')) {
            await DB.deleteTransaction(id, type, amount, personId)
            setState(old => ({
                ...old,
                totalBalance: old.persons.reduce((old, cur) => old + cur.balance, 0),
                transactions: { ...old.transactions, [personId]: old.transactions[personId].filter(x => x.id != id) },
                persons: old.persons.map(person => {
                    if (person.id == personId) {
                        return {
                            ...person,
                            balance: type == "Receiving" ?
                                person.balance - amount : person.balance + amount
                        }
                    }
                    return person
                })
            }
            ))
        }
    }
    return (
        <React.Fragment>
            <div className={`relative flex items-center justify-between p-4 rounded-lg mx-5 mb-4
             ${receiving ? 'bg-receive-transaction' : 'bg-send-transaction'} `}>
                {transactionDate && <p className='top-2 right-2 absolute text-xs text-gray-200'>
                    {`${transactionDate.getDay()}/${transactionDate.getDate()}/${transactionDate.getFullYear()} ${transactionDate.getHours()}:${transactionDate.getMinutes()}`}
                </p>}
                <div className='mr-4'>{Icon}</div>
                <div className='flex flex-col flex-1 text-white'>
                    <p className='text-sm'>{title}</p>
                    <p className='font-sans-2 text-3xl font-light'>{amount.toLocaleString('en-US')}</p>
                </div>
                <div>
                    <button onClick={handleDelete} className='focus:outline-none p-2'>
                        <svg width={17} height={18} viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 4.2H2.6H15.4" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M5.00001 4.2V2.6C5.00001 2.17565 5.16858 1.76869 5.46864 1.46863C5.76869 1.16857 6.17566 1 6.60001 1H9.80001C10.2244 1 10.6313 1.16857 10.9314 1.46863C11.2314 1.76869 11.4 2.17565 11.4 2.6V4.2M13.8 4.2V15.4C13.8 15.8243 13.6314 16.2313 13.3314 16.5314C13.0313 16.8314 12.6244 17 12.2 17H4.20001C3.77566 17 3.36869 16.8314 3.06864 16.5314C2.76858 16.2313 2.60001 15.8243 2.60001 15.4V4.2H13.8Z" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                    <button onClick={() => setShowModal(true)} className='focus:outline-none p-2 ml-1'>
                        <svg width={17} height={17} viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 11.8333H3.5C3.94203 11.8333 4.36595 12.0089 4.67851 12.3215C4.99107 12.634 5.16667 13.058 5.16667 13.5V16M5.16667 1V3.5C5.16667 3.94203 4.99107 4.36595 4.67851 4.67851C4.36595 4.99107 3.94203 5.16667 3.5 5.16667H1L5.16667 1ZM16 5.16667H13.5C13.058 5.16667 12.634 4.99107 12.3215 4.67851C12.0089 4.36595 11.8333 3.94203 11.8333 3.5V1L16 5.16667ZM11.8333 16V13.5C11.8333 13.058 12.0089 12.634 12.3215 12.3215C12.634 12.0089 13.058 11.8333 13.5 11.8333H16L11.8333 16Z" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
            </div>

            {showModal &&
                <Modal closeModal={() => setShowModal(false)} title="View transaction detail for" subtitle={`For ${title}`}>
                    <div className='mb-4'>
                        <p className='block mb-1 text-sm text-gray-500'>Title</p>
                        <p className='text-lg'>{title}</p>
                    </div>
                    <div className='mb-4'>
                        <p className='block mb-1 text-sm text-gray-500'>Amount</p>
                        <p className='text-lg'>{amount}</p>
                    </div>
                    <div className='mb-4'>
                        <p className='block mb-1 text-sm text-gray-500'>Type</p>
                        <p className='text-lg'>{receiving ? "Receiving" : "Sending"}</p>
                    </div>
                    <div className='mb-4'>
                        <p className='block mb-1 text-sm text-gray-500'>Description</p>
                        <p className='text-lg'>{description ? description : "None"}</p>
                    </div>
                </Modal>
            }
        </React.Fragment >
    )
}

export default Transaction
