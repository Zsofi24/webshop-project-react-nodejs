import { useEffect } from 'react';
import { useState } from 'react'

export default function useChangeNavColor() {

    const [ color, setColor ] = useState(false);

    const changeBackground = () => {
        if (window.scrollY >= 66) {
          setColor(true)
        } else {
          setColor(false)
        }
    } 

    useEffect(() => {
        changeBackground()
        // adding the event when scroll change background
        window.addEventListener("scroll", changeBackground)
      })

    return [color, setColor]
  
}
