import React from 'react'
import CreateOptions from './_components/CreateOptions'
import LatestinterviewList from './_components/LatestinterviewList'

function Dashboard() {
  return (
    <div>
      <h2 className='my-2 font-bold text-2xl'>Dashboard</h2>
      <CreateOptions />

      <LatestinterviewList />
    </div>
  )
}

export default Dashboard