import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Layout from '../components/Layout'
import Modal from '../components/Modal'
import Person from '../components/Person'
import DB, { IPerson } from '../utils/DB'
export default function Home() {
  const [totalBalance, setTotalBalance] = useState(0)
  const [personName, setPersonName] = useState('')
  const [isModalOpen, setModalState] = useState(false)
  const [submitActive, setSubmitActive] = useState(false)
  const [error, setError] = useState('')

  const handlePersonSubmit = async () => {
    if (error != '') setError('')
    if (personName != '') {
      try {
        const id = await DB.addPerson(personName.toLowerCase())
        setModalState(false);
        setPersons(prev => [...prev, { name: personName, dateAdded: new Date(), balance: 0, id }])
      } catch (e) {
        if (e.message.includes('uniqueness')) setError('That name already dey oh, change am jor!')
      }
    }
  }

  useEffect(() => {
    if (error != '') setError('')

    if (personName == '') setSubmitActive(false)
    else setSubmitActive(true)
  }, [personName])

  const [persons, setPersons] = useState<IPerson[]>()


  useEffect(() => {
    const updatePersonState = async () => {
      setPersons(await DB.getPersons());
      setTotalBalance(await DB.getTotalBalance());
    }
    updatePersonState()
  }, [])

  return (
    <Layout>
      <Header home title="Hello" actions={[{
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
      {}
      <div className='mt-3 mb-4'>
        {persons && persons.length > 0 && persons.map(({ id, name, balance }) =>
          <Person id={id} key={`person-${id}`} name={name} balance={balance} />
        )}
      </div>

      {isModalOpen &&
        <Modal closeModal={() => setModalState(false)} title='Add a new Person' >
          <div>
            <div className='mb-10'>
              <label className='block mb-1' htmlFor="person">Name</label>
              <input
                value={personName}
                onChange={(e) => { e.preventDefault(); setPersonName(e.target.value) }}
                className='focus:outline-none w-full p-3 text-lg bg-gray-100 rounded-lg'
                placeholder="Obakpolor Beauty" id='person' type="text" name='person' />
              {error.length > 0 && <p className='mt-1 text-xs text-center text-red-600'>{error}</p>}
            </div>
            <button disabled={!submitActive} onClick={handlePersonSubmit} className='disabled:bg-gray-500 active:bg-blue-800 focus:outline-none block w-full py-3 text-sm font-normal text-white bg-blue-700 rounded-lg'>Add Person</button>
          </div>
        </Modal>}
    </Layout>
  )
}
