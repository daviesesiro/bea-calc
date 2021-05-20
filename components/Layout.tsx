import React from 'react'
import Metas from './Metas'



const Layout: React.FC = ({ children }) => {
    return (
        <div className='min-h-screen bg-gray-200'>
            <Metas />
            {children}
            <p>&nbsp;</p>
        </div>
    )
}

export default Layout
