import React from 'react'
import { Link } from 'react-router-dom'
import { AdminTable } from '../../assets/css/AdminTable'

export default function ProductListTable({products}) {

  return (
    <AdminTable classname="her">
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
            {products?.map(p => 
                (
                    <tr>
                        <td>{p.id}</td>
                        <td>{p.title}</td>
                        <td>{p.price}</td>
                        <td>{p.description}</td>
                        <td><Link to={`/admin/termekek/${p.id}`}>szerk</Link></td>
                        <td>törlés</td>
                    </tr>
                )
                )            
            }

        </tbody>
    </AdminTable>
  )
}
