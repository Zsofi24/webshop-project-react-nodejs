import React from 'react'
import { MdOutlineArrowBackIosNew, MdOutlineArrowForwardIos } from 'react-icons/md';
import '../assets/css/Pagination.css';
import { PaginationButton } from '../assets/css/Button';

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
      <PaginationButton onClick={() => onPageChange(pageBackOne(currentPage))}><MdOutlineArrowBackIosNew /></PaginationButton>
      {
          paginatioRange.map(page => <PaginationButton key={page} onClick={() => onPageChange(page)}>{page}</PaginationButton> )
      }
      <PaginationButton onClick={() => onPageChange(pageForwardkOne(currentPage, totalPages))}><MdOutlineArrowForwardIos /></PaginationButton>

    </div>
  )
}
