import React from 'react'



const Layout: React.FC = ({ children }) => {
    return (
        <div className='min-h-screen bg-gray-200'>
            {children}
            <p>&nbsp;</p>
        </div>
    )
}

export default Layout
