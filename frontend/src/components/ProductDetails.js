import React from 'react'
import { Link, useParams } from 'react-router-dom'

export default function ProductDetails() {
  const { id } = useParams();
  return (
    <>
    <Link to='/termekek'>vissza</Link>
    <div>{`ProductDetails ${id}`}</div>
    </>
  )
}

