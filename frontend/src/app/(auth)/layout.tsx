import React from 'react'
import Login from './login/page'




const layout = ({children} : {children : React.ReactNode}) => {
  return (
    <main className='.dark main-section flex flex-row'>
        <section className='m-3 hidden md:block w-[50%]'>
            <h1 className='h1'>TaskFlow</h1>
            <p>A single tool to manage task's , file's and communication for a team</p>
        </section>

        <section className='w-fit h-full'>
            {children}
        </section>
    </main>
  )
}



export default layout