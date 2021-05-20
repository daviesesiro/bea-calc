import React from 'react'
import Header from './component/Header'
import Metas from './component/Metas'
import Modal from './component/Modal'
import Person from './component/Person'

export default function Home() {
  let totalBalance = 12000000
  return (
    <div className='min-h-screen bg-gray-200'>
      <Metas />
      <Header title="Hello Beauty" actions={[{
        icon: <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 5V19" stroke="black" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
          <path d="M5 12H19" stroke="black" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        ,
        title: 'Add Person',
        onPress: () => { console.log('hello i was clicked') }
      }]} />


      <div className='rounded-xl px-4 py-6 mx-5 bg-white'>
        <p className='text-xs text-gray-400 uppercase'>TOTAL BALANCE</p>
        <p className='font-sans-2 mt-2 text-5xl text-blue-900'>&#8358; {totalBalance.toLocaleString('en-US')}</p>
      </div>
      <hr />
      {/* Persons */}
      <div className='mt-8'>
        <Person name='John Doe' balance={320000} />
        <Person name='John Doe' balance={320000} />
        <Person name='John Doe' balance={320000} />
        <Person name='John Doe' balance={320000} />
        <Person name='John Doe' balance={320000} />
      </div>
      <Modal title='Add a new Person' >
        <div>
          <label className='block' htmlFor="">Name</label>
          <input type="text" />
          <button className='active:bg-blue-800 focus:outline-none block w-full py-3 text-sm font-normal text-white bg-blue-700 rounded-lg'>Add Person</button>
        </div>
      </Modal>
    </div>
  )
}
