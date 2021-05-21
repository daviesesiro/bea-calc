import React, { useState } from 'react'
import Header from '../components/Header'
import Layout from '../components/Layout'
import Modal from '../components/Modal'
import Person from '../components/Person'

export default function Home() {
  let totalBalance = 12000000

  const [isModalOpen, setModalState] = useState(false)
  return (
    <Layout>
      <Header home title="Hello Beauty" actions={[{
        icon: <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 5V19" stroke="black" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
          <path d="M5 12H19" stroke="black" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        ,
        title: 'Add Person',
        onPress: () => { setModalState(prev => !prev) }
      }]} />


      <div className='rounded-xl px-4 py-5 mx-5 bg-white'>
        <p className='text-xs text-gray-400 uppercase'>TOTAL BALANCE</p>
        <p className='font-sans-2 mt-2 text-5xl text-blue-900'>&#8358; {totalBalance.toLocaleString('en-US')}</p>
      </div>

      {/* Persons */}
      <p className='mx-5 mt-8 text-gray-700'>Persons</p>
      <div className='mt-3 mb-4'>
        <Person name='Uncle Tony' balance={52000} />
        <Person name='Uncle Daniel' balance={30000} />
        <Person name='Aunty Florence' balance={200050} />
        <Person name='Aunty Joy' balance={55000} />
        <Person name='Grandma' balance={55000} />
      </div>

      {isModalOpen &&
        <Modal closeModal={() => setModalState(false)} title='Add a new Person' >
          <div>
            <label className='block mb-1' htmlFor="person">Name</label>
            <input
              className='focus:outline-none w-full p-3 mb-10 text-lg bg-gray-100 rounded-lg'
              placeholder="Obakpolor Beauty" id='person' type="text" name='person' />
            <button className='active:bg-blue-800 focus:outline-none block w-full py-3 text-sm font-normal text-white bg-blue-700 rounded-lg'>Add Person</button>
          </div>
        </Modal>}
    </Layout>
  )
}
