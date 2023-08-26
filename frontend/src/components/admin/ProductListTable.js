import React from 'react'
import { Link } from 'react-router-dom'
import { AdminTable } from '../../assets/css/AdminTable'
import { Button } from '../../assets/css/Button'

export default function ProductListTable({products, productDelete}) {

  return (
    <AdminTable classname="her">
        <thead>
            <tr>
                <th>ID</th>
                <th>név</th>
                <th>ár</th>
                <th>leírás</th>
                {/* <th>szerkesztés</th>
                <th>törlés</th> */}
            </tr>
        </thead>
        <tbody>
            {products?.map(p => 
                (
                    <tr>
                        <td>{p.id}</td>
                        <td>{p.title}</td>
                        <td>{p.price}</td>
                        <td>{p.description}</td>
                        <td><Link to={`/admin/termekek/${p.id}`}>szerk</Link></td>
                        <td><Button>láthatóság</Button></td>
                        <td><Button onClick={() => productDelete(p.id)}>törlés</Button></td>
                    </tr>
                )
                )            
            }

        </tbody>
    </AdminTable>
  )
}
