import React from 'react';
import './Pagination.css'


export default function Pagination ({pageNow, allVideogamesfromState, vgPerPage}) {
    const pageNumbers = []

    for (let i = 1; i <=Math.ceil(allVideogamesfromState/vgPerPage); i++) {
        pageNumbers.push(i)
        }
    return (
        
        <div className='pagination'>
            <div className='numbers'>
            {pageNumbers && pageNumbers.length ? (
                    pageNumbers.map(num => {
                        return (
                        <div key={num}>
                            <button onClick={() => pageNow(num)}>{num}</button>
                        </div>
                        )
                    })
                ) 
                : 
                (
                <div className='numbers'> <p>Loading Recipes...</p></div>
                )}
            </div>
         </div>
    
    )
}
