import React from 'react'

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
    <>
    <span onClick={() => onPageChange(pageBackOne(currentPage))}>vissza</span>
    {
        paginatioRange.map(page => <span key={page} onClick={() => onPageChange(page)}>{page}</span> )
    }
    <span onClick={() => onPageChange(pageForwardkOne(currentPage, totalPages))}>tovább</span>

    </>
  )
}
