import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Header from '../../components/Header'
import Layout from '../../components/Layout'
import Transaction from '../../components/Transaction'
import Modal from '../../components/Modal'

const Index = () => {
    const router = useRouter()
    const { id } = router.query

    console.log(router)
    const params = new URLSearchParams(router.asPath.split('?')[1])
    const personName = params.get('name')

    if (personName == '') router.back()

    const [showAddTran, setShowAddTran] = useState(false)
    const balance = 3453300
    const transactionDate = new Date()
    return (
        <Layout >
            <Header title={personName} actions={[{
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
                <Transaction amount={4400} title='hello 2' receiving description="hello" transactionDate={transactionDate} />
                <Transaction amount={1000} title='hello' receiving={false} description="hello" transactionDate={transactionDate} />
                <Transaction amount={5500} title='hello 2' receiving description="hello" transactionDate={transactionDate} />
                <Transaction amount={66000} title='hello 2' receiving description="hello" transactionDate={transactionDate} />
                <Transaction amount={36000} title='hello' receiving={false} description="hello" transactionDate={transactionDate} />
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
                            <label className='block mb-1' htmlFor="description">*Descripton</label>
                            <textarea
                                className='focus:outline-none w-full p-3 text-lg bg-gray-100 rounded-lg'
                                placeholder="Write something to describe the transaction" id='description' name='description' />
                        </div>

                        <button className='active:bg-blue-800 focus:outline-none block w-full py-3 text-sm font-normal text-white bg-blue-700 rounded-lg'>Add Transaction</button>
                    </div>
                </Modal>}
        </Layout>
    )
}

export default Index
