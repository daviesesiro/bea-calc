import React, { useEffect, useState } from 'react'
import Balance from '../components/Balance'
import Header from '../components/Header'
import Layout from '../components/Layout'
import Modal from '../components/Modal'
import Person from '../components/Person'
import { useStateContext } from '../Context'
import DB from '../utils/DB'

export default function Home() {
  const { state, setState } = useStateContext()
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
        setState(prev => ({ ...prev, persons: [...prev.persons, { name: personName, dateAdded: new Date(), balance: 0, id }] }))

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

  return (
    <Layout>
      <Header home title="Beauty Calculator" actions={[{
        icon: <svg width={20} height={20} className='dark:text-gray-500' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 5V19" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
          <path d="M5 12H19" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        </svg>,
        onPress: () => { setModalState(prev => !prev) }
      }]} />

      <Balance title="TOTAL BALANCE" balance={state.totalBalance} />

      {/* Persons */}
      <p className='dark:text-gray-400 mx-5 mt-8 text-gray-700'>Persons</p>

      <div className='mt-3 mb-4'>
        {(state.persons && state.persons.length > 0) ? state.persons.map(({ id, name, balance }) =>
          <Person id={id} key={`person-${id}`} name={name} balance={balance} />
        ) : <p className='mt-10 text-lg text-center'>No Person added yet</p>}
      </div>

      {isModalOpen &&
        <Modal closeModal={() => setModalState(false)} title='Add a new Person' >
          <div>
            <div className='mb-10'>
              <label className='dark:text-gray-200 block mb-1' htmlFor="person">Name</label>
              <input
                value={personName}
                onChange={(e) => { e.preventDefault(); setPersonName(e.target.value) }}
                className='focus:outline-none dark:bg-gray-300 w-full p-3 text-lg bg-gray-100 rounded-lg'
                placeholder="Obakpolor Beauty" id='person' type="text" name='person' />
              {error.length > 0 && <p className='mt-1 text-xs text-center text-red-600'>{error}</p>}
            </div>
            <button disabled={!submitActive} onClick={handlePersonSubmit} className='disabled:bg-gray-500 active:bg-blue-800 focus:outline-none block w-full py-3 text-sm font-normal text-white bg-blue-700 rounded-lg'>Add Person</button>
          </div>
        </Modal>}
    </Layout>
  )
}
