import React, { useState } from 'react'

const Pagination = ({productsPerPage,totalProducts , paginate}) => {

    const pageNumbers = [];
    const [currentNum, setcurrentNum] = useState(1)


    for(let i=1;i<=Math.ceil(totalProducts / productsPerPage);i++){
        pageNumbers.push(i)
    }

    // console.log(pageNumbers)

  return (
    <nav className='my-4'>
        <ul className='pagination justify-content-center'>
            {
                pageNumbers.map((number) => (
                    <li key={number} className="page-item">
                        <a onClick={() => {
                            paginate(number)
                            setcurrentNum(number)

                        }} href='#' className={`page-link  ${currentNum == '' ? '' : currentNum == number ?  'active' : ''}`}>
                            {number}
                            
                        </a>
                    </li>
                ))
            }

    
        </ul>
    </nav>
  )
}

export default Pagination