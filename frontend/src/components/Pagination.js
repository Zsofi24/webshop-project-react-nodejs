import React from 'react'
import { MdOutlineArrowBackIosNew, MdOutlineArrowForwardIos } from 'react-icons/md';
import '../assets/css/Pagination.css';
import Button from './Button';

export default function Pagination({totalPages, onPageChange, currentPage}) {

    const range = (start, end) => {
        let length = end - start + 1;
        /*
            Create an array of certain length and set the elements within it from
          start value to end value.
        */
        return Array.from({ length }, (_, idx) => idx + start);
    };

    function pageBackOne(current) {
      if(current - 1 > 1) return current -1
      else return 1
    }

    function pageForwardkOne(current, total) {
      if(current + 1 <= total) return current  + 1
      else return total
    }

    const paginatioRange = range(1, totalPages)

  return (
    <div className='pagination-container'>
      <Button type="pagination" handleClick={() => onPageChange(pageBackOne(currentPage))}><MdOutlineArrowBackIosNew /></Button>
      {
          paginatioRange.map(page => <Button type="pagination" key={page} handleClick={() => onPageChange(page)}>{page}</Button> )
      }
      <Button type="pagination" handleClick={() => onPageChange(pageForwardkOne(currentPage, totalPages))}><MdOutlineArrowForwardIos /></Button>

    </div>
  )
}
