import React, { useEffect, useState } from 'react'
import Card from '../smallComponants/Card'
const Images = ({ images }) => {
  return (
    <Card>
      <div className='flex flex-wrap'>
        {!images?.length ? <div className='p-20 text-3xl font-semibold'>No Photos !!</div> : images.map((image) => (
          image ?
            <div className='w-1/4 p-1 flex items-center bg-white m-1'>
              <img className='max-w-full max-h-full ' src={image} alt='post' />
            </div> : null
        ))}
      </div>
    </Card>
  )
}

export default Images