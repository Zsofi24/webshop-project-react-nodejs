import React, { useContext } from 'react';
import { useLoaderData, useLocation } from 'react-router-dom';
import { UserAuthContext } from '../../contexts/UserAuthContext';

export function loader({ request }) {
  return new URL(request.url).searchParams.get('message');  
}

export default function HomePage() {

  const adminMessage = useLoaderData();
  const location = useLocation();
  const { message } = location.state || "";
  const {user, setUser} = useContext(UserAuthContext);
  console.log(user, "user");

  return (
    <>
      <div>
        <section className='home-header'>
        <svg className="wave" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path d="M 0,400 C 0,400 0,200 0,200 C 86.65897435897435,178.9948717948718 173.3179487179487,157.9897435897436 258,178 C 342.6820512820513,198.0102564102564 425.38717948717954,259.0358974358974 502,263 C 578.6128205128205,266.9641025641026 649.1333333333334,213.86666666666667 722,180 C 794.8666666666666,146.13333333333333 870.0794871794872,131.4974358974359 942,133 C 1013.9205128205128,134.5025641025641 1082.548717948718,152.14358974358973 1165,166 C 1247.451282051282,179.85641025641027 1343.725641025641,189.92820512820515 1440,200 C 1440,200 1440,400 1440,400 Z" stroke="none" strokeWidth="0" fill="#fffff0" fillOpacity="0.8"></path>
        </svg>
        <svg className="main-text" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
          <path id="SvgjsPath1116" d="M12 17v83c0 49.3 40.5 89.1 90.1 88 46.8-1.1 85-39.4 85.9-86.2.5-25-9.5-47.7-25.8-64C146.3 21.9 124.3 12 100 12H17c-2.7 0-5 2.3-5 5z" fill="rgba(255, 255, 255, 1)"></path>
          <text x='30' y='80'>valami </text>
        </svg>
        </section>

      </div>
      { adminMessage && <h2>{adminMessage}</h2>}
      { message && <h2>{message}</h2>}
    </>
  )
}