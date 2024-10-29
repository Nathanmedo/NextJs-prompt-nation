import React from 'react'
import '@styles/globals.css'
import Nav from '@components/Nav';
import Provider from '@components/Provider'


//application static metadata

export const metadata = {
  title: 'Prompt Nation',
  description: 'Share AI related prompts based on topics.'
}

const RootLayout = ({children}) => {
  return (
    <html>
        <body>
            <Provider>
              <Nav />
              {children}
            </Provider>
        </body>
    </html>
  )
}

export default RootLayout;