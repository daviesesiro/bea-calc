import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Header from '../../components/Header'
import Layout from '../../components/Layout'
import Transaction from '../../components/Transaction'
import Modal from '../../components/Modal'
import DB from '../../utils/DB'
import { useStateContext } from '../../Context'

const Index = () => {
    const router = useRouter()
    let { id } = router.query
    if (typeof window != 'undefined') {
        id = id ||
            window.location.pathname.split('person/')[1]
    }
    const params = new URLSearchParams(router.asPath.split('?')[1])
    const personName = params.get('name')
    const initialBalance = params.get('balance')


    const [showAddTran, setShowAddTran] = useState(false)
    // useEffect(() => {
    //     const init = async () => {
    //         const balance = (await DB.getPersonById(id as string)).balance;
    //         setBalance(balance)
    //     }

    //     init()
    // }, [balance, setBalance])


    const [formState, setformState] = useState({ title: '', amount: 0, description: '', type: 'Receiving' })
    const { state, setState } = useStateContext()
    const txs = state.transactions[id as string]
    const handleOnChange = (e) => setformState(prev => ({ ...prev, [e.target.name]: e.target.name == 'amount' ? Number(e.target.value) : e.target.value }))

    const handleSubmit = async (e) => {
        e.preventDefault()
        const transactionId = await DB.addTransaction({ ...formState, personId: id as string }) as string
        setState(old => (
            {
                ...old,
                totalBalance: old.persons.reduce((old, cur) => old + cur.balance, 0),
                persons: old.persons.map(person => {
                    if (person.id == id) {
                        return {
                            ...person,
                            balance: formState.type == "Receiving" ?
                                person.balance + formState.amount : person.balance - formState.amount
                        }
                    }
                    return person
                }),
                transactions: {
                    ...old.transactions,
                    [id as string]: [{ ...formState, dateAdded: new Date(), id: transactionId, personId: id as string },
                    ...old.transactions[id as string]]
                }
            }
        ));
        setShowAddTran(false)

    }
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
                <p className='font-sans-2 mt-2 text-5xl text-blue-900'>
                    &#8358; {state.persons && state.persons.find(x => x.id == id) && state.persons.find(x => x.id == id).balance.toLocaleString('en-US')}
                </p>
            </div>

            {/* Transaction */}
            <div className='mt-8'>
                {
                    txs && txs.length > 0 && txs.map(({ title, amount, type, id, description, dateAdded }) => (
                        <Transaction key={`tx-${id}`}
                            amount={amount} id={id}
                            title={title} type={type}
                            description={description}
                            transactionDate={dateAdded} />))
                }

            </div>


            {showAddTran &&
                <Modal closeModal={() => setShowAddTran(false)} subtitle={`For ${personName}`} title='Add a transaction' >
                    <form onSubmit={handleSubmit}>
                        <div className='mb-4'>
                            <label className='block mb-1' htmlFor="title">*Title</label>
                            <input onChange={handleOnChange}
                                required
                                value={formState.title}
                                className='focus:outline-none w-full p-3 text-lg bg-gray-100 rounded-lg'
                                placeholder="For cement" id='title' type="text" name='title' />
                        </div>
                        <div className='mb-4'>
                            <label className='block mb-1' htmlFor="amount">*Amount</label>
                            <input onChange={handleOnChange}
                                value={formState.amount}
                                required
                                min={50}
                                className='focus:outline-none w-full p-3 text-lg bg-gray-100 rounded-lg'
                                placeholder="1,000" id='amount' type="number" name='amount' />
                        </div>
                        <div className='mb-4'>
                            <label className='block mb-1' htmlFor="description">Descripton</label>
                            <textarea onChange={handleOnChange}
                                value={formState.description}
                                className='focus:outline-none w-full p-3 text-lg bg-gray-100 rounded-lg'
                                placeholder="Write something to describe the transaction" id='description' name='description' />
                        </div>
                        <div className='mb-10 text-center align-middle'>
                            <input checked={formState.type == 'Receiving'}
                                onChange={handleOnChange} className='inline-block w-4 h-4 mr-2 align-middle' type="radio"
                                required
                                name="type" id="receiving" value="Receiving" /> <label htmlFor='receiving' className=' align-middle'> Receiving</label>
                            <input checked={formState.type == 'Sending'}
                                onChange={handleOnChange} className='inline-block w-4 h-4 ml-8 mr-2 align-middle' type="radio"
                                required
                                name="type" id="sending" value='Sending' /> <label className=' align-middle' htmlFor='sending'>Sending</label>
                        </div>

                        <button className='active:bg-blue-800 focus:outline-none block w-full py-3 text-sm font-normal text-white bg-blue-700 rounded-lg'>Add Transaction</button>
                    </form>
                </Modal>}
        </Layout>
    )
}



export default Index
