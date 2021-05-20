import React from 'react'
import Header from './component/Header'
import Metas from './component/Metas'
import Person from './component/Person'

export default function Home() {
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
        <p className='font-sans-2 mt-2 text-5xl text-blue-900'>&#8358; 1,200,000</p>
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
    </div>
  )
}
