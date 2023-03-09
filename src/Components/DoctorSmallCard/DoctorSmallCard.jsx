import React from 'react'

const DoctorSmallCard = ({data , button}) => {
  return (
    <div>
        <img src={data.profilePic} alt={data.lastName} />
        <p>{data.lastName +' ' +data.firstName}</p>
        <p>{data.position}</p>
        <p>{data.description}</p>
        <button>{button}</button>
    </div>
  )
}

export default DoctorSmallCard