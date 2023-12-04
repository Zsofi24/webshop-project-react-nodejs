import React from 'react';
import { useLoaderData, useLocation } from 'react-router-dom';

export function loader({ request }) {
  return new URL(request.url).searchParams.get('message');  
}

export default function HomePage() {

  const adminMessage = useLoaderData();
  const location = useLocation();
  const { message } = location.state || "";

  return (
    <>
      <div>Home</div>
      { adminMessage && <h2>{adminMessage}</h2>}
      { message && <h2>{message}</h2>}
    </>
  )
}