import React from 'react';


export default function Pagination ({pageNow, allVideogamesfromState, vgPerPage}) {
    const pageNumbers = []

    for (let i = 1; i <=Math.ceil(allVideogamesfromState/vgPerPage); i++) {
        pageNumbers.push(i)
        }
    return (
        <div>
            <div> 
                { pageNumbers &&
                pageNumbers.map(num => {
                    return (
                    <div key={num}>
                        <button onClick={() => pageNow(num)}>{num}</button>
                    </div>
                    )
                })}
            </div>
        </div>
    )
}