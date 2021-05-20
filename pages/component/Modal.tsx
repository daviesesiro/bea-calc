import React, { ReactElement } from 'react'

interface Props {

}

function Modal({ }: Props): ReactElement {
    return (
        <div className='fixed inset-0 z-20 flex items-center justify-center h-screen bg-black bg-opacity-25'>
            <div className='z-30 flex-1 p-8 mx-10 bg-white'>
                k
            </div>
        </div>
    )
}

export default Modal
