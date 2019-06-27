import React from 'react'

const Product = ({title, image, price}) => {
  return (
    <div className='product-container'>
      <img src={image} alt={title}/>
      <h2>{title}</h2>
      <p>{price}</p>
    </div>
  )
}

export default Product