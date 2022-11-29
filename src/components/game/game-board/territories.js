import React from 'react'
import Territory from './Territory'

const mapTerritories = (territories, width, clickFunction) => {

    // set a dynamic number based on the view width, with a max and min for responsive sizing
    let hexWidth = .3 * width   
    if (hexWidth > 425) {
        hexWidth = 425
    } else if (hexWidth < 300) {
        hexWidth = 300
    }

    //establish empty array with length 37
    const territoriesJSX = Array(37)
    
    territories.forEach(territory => {
        //put each territory into array in order by number
        territoriesJSX.splice(territory.number, 1, (
            <Territory
                key={territory.number}
                territory={territory}
                hexWidth={hexWidth}
                clickFunction={clickFunction}
            />
        ))
    })

    return (
        <div className='hexBoard' style= {{height: 2* hexWidth}}>
            <div className='hexRow hexRow1'>
                {territoriesJSX.slice(0,4)}
            </div>
            <div className='hexRow hexRow2' style={{ top: -.072 * hexWidth }}>
                {territoriesJSX.slice(4,9)}
            </div>
            <div className='hexRow hexRow3' style={{ top: -.144 * hexWidth}}>
                {territoriesJSX.slice(9,15)}
            </div>
            <div className='hexRow hexRow4' style={{ top: -.216 * hexWidth}}>
                {territoriesJSX.slice(15,22)}
            </div>
            <div className='hexRow hexRow5' style={{ top: -.288 * hexWidth}}>
                {territoriesJSX.slice(22,28)}
            </div>
            <div className='hexRow hexRow6' style={{ top: -.360 * hexWidth}}>
                {territoriesJSX.slice(28,33)}
            </div>
            <div className='hexRow hexRow7' style={{ top: -.432 * hexWidth}}>
                {territoriesJSX.slice(33,37)}
            </div>
        </div>
)}

export default mapTerritories