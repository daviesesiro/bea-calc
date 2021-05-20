import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Header from '../component/Header'
import Layout from '../component/Layout'
import Transaction from '../component/Transaction'
import Modal from '../component/Modal'

const Index = () => {
    const router = useRouter()
    const { id } = router.query
    console.log(id)

    const [showAddTran, setShowAddTran] = useState(false)
    const balance = 34533000
    const date = new Date()
    return (
        <Layout >
            <Header title={id as string} actions={[{
                icon: <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 5V19" stroke="black" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M5 12H19" stroke="black" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                ,
                title: 'Add Person',
                onPress: () => { setShowAddTran(prev => !prev) }
            }]} />

            <div className='rounded-xl px-4 py-5 mx-5 bg-white'>
                <p className='text-xs text-gray-400 uppercase'>BALANCE</p>
                <p className='font-sans-2 mt-2 text-5xl text-blue-900'>&#8358; {balance.toLocaleString('en-US')}</p>
            </div>

            {/* Transaction */}
            <div className='mt-8'>
                <Transaction amount={3000} title='hello 2' receiving description="hello" date={date} />
                <Transaction amount={3000} title='hello' receiving={false} description="hello" date={date} />
                <Transaction amount={3000} title='hello 2' receiving description="hello" date={date} />
                <Transaction amount={3000} title='hello 2' receiving description="hello" date={date} />
                <Transaction amount={3000} title='hello' receiving={false} description="hello" date={date} />
            </div>


            {showAddTran &&
                <Modal closeModal={() => setShowAddTran(false)} subtitle={`For ${id}`} title='Add a transaction' >
                    <div>
                        <div className='mb-4'>
                            <label className='block mb-1' htmlFor="title">*Title</label>
                            <input
                                className='focus:outline-none w-full p-3 text-lg bg-gray-100 rounded-lg'
                                placeholder="For cement" id='title' type="text" name='title' />
                        </div>
                        <div className='mb-4'>
                            <label className='block mb-1' htmlFor="amount">*Amount</label>
                            <input
                                className='focus:outline-none w-full p-3 text-lg bg-gray-100 rounded-lg'
                                placeholder="1,000" id='amount' type="text" name='amount' />
                        </div>
                        <div className='mb-10'>
                            <label className='block mb-1' htmlFor="amount">*Amount</label>
                            <textarea
                                className='focus:outline-none w-full p-3 text-lg bg-gray-100 rounded-lg'
                                placeholder="Write something to describe the transaction" id='amount' name='person' />
                        </div>

                        <button className='active:bg-blue-800 focus:outline-none block w-full py-3 text-sm font-normal text-white bg-blue-700 rounded-lg'>Add Transaction</button>
                    </div>
                </Modal>}
        </Layout>
    )
}

export default Index
