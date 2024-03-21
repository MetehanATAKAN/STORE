import React from 'react'
import { useSelector } from 'react-redux'

const Basket = () => {

  const { products } = useSelector(state => state.basket);

  console.log(products);
  
  return (
    <div>Basket</div>
  )
}

export default Basket