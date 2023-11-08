import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { HiArrowNarrowDown, HiArrowNarrowUp } from 'react-icons/hi';
import { useSearchParams } from 'react-router-dom';

export default function TableArrow() {

  const sortDirection = "";
  return (   
    <>
    { (sortDirection== false) && (<span></span>) }     
    { (sortDirection == 'asc') && (<span><HiArrowNarrowDown /></span>) }
    { (sortDirection == 'desc') && (<span><HiArrowNarrowUp /></span>)  }  
    </>      
  )
}
