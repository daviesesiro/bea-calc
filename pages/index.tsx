import React from 'react'
import Header from './component/Header'
import Metas from './component/Metas'

export default function Home() {
  return (
    <div className='min-h-screen bg-gray-100'>
      <Metas />
      <Header title="Hello Beauty" />
    </div>
  )
}
