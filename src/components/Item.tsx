import React from 'react'
import { IItem } from '../interfaces/itemInterface'

const Item: React.FC<IItem> = ({ continent, name, code, emoji }: IItem) => {
    return (
        <div style={{ padding: '10px 16px', borderRadius: '1px solid black', boxShadow: '0px 0px 2px 1px black' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ margin: '0 10px 0 0' }}>{name}</h3>
                <p style={{ margin: 0 }}>{emoji}</p>
            </div>
            <div style={{ marginTop: '10px' }}>
                <p style={{ margin: 0 }}>ISO code: {code}</p>
                <p style={{ margin: 0 }}>Continent: {continent}</p>
            </div>
        </div>
    )
}

export default Item