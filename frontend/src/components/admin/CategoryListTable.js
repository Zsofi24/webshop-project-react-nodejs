import React from 'react'
import { AdminTable } from '../../assets/css/AdminTable'
import Button from '../../components/Button'
import { Link } from 'react-router-dom'
// import { LuEdit } from 'react-icons/lu'
import { RiDeleteBin2Fill } from 'react-icons/ri'

export default function CategoryListTable({categories, categoryDelete}) {
  return (
    <AdminTable>
        <thead>
            <tr>
                <th>ID</th>
                <th>kategóra név</th>
            </tr>
        </thead>
        <tbody>
            {categories?.map(c => 
                (
                    <tr key={c.categoryId}>
                        <td>{c.categoryId}</td>
                        <td>{c.categoryName}</td>
                        <td><Button><Link to={`/admin/kategoriak/${c.categoryId}`}><LuEdit /></Link></Button></td>
                        <td><Button handleClick={() => categoryDelete(c.categoryId)}><RiDeleteBin2Fill /></Button></td>
                    </tr>
                )
            )
            }
        </tbody>

    </AdminTable>
  )
}
