import React from 'react'

export default function ProductListTable({products}) {

  return (
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>név</th>
                <th>ár</th>
                <th>leírás</th>
                <th>szerkesztés</th>
                <th>törlés</th>
            </tr>
        </thead>
        <tbody>
            {products.map(p => 
                (
                    <tr>
                        <td>{p.id}</td>
                        <td>{p.title}</td>
                        <td>{p.price}</td>
                        <td>{p.description}</td>
                        <td>szerk</td>
                        <td>törlés</td>
                    </tr>
                )
                )            
            }

        </tbody>
    </table>
  )
}
