import React from 'react';
import { useLoaderData, useLocation } from 'react-router-dom';
import testsvg from '../assets/img/noun-grape-2692039.svg'

export function loader({ request }) {
  return new URL(request.url).searchParams.get('message');  
}

export default function Home() {

  const adminMessage = useLoaderData();
  const location = useLocation();
  const { message } = location.state || "";

  return (
    <>
      <div className='test'>
        Home
      <img src={testsvg}/>
      </div>
      { adminMessage && <h2>{adminMessage}</h2>}
      { message && <h2>{message}</h2>}
    </>
  )
}