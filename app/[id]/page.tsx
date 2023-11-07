import React from 'react'

function User({params}:{params:{id:number}}) {
  return (
    <div>
        <p>User no {params.id}</p>
    </div>
  )
}

export default User