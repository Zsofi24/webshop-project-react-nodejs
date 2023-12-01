import React from 'react'
import { AdminTable } from './AdminTable'
import { unstable_batchedUpdates } from 'react-dom'
import { FiEdit } from 'react-icons/fi'
import Button from '../button/Button'
import { Link } from 'react-router-dom'

export default function UsersListTable({ users }) {
  return (
    <AdminTable className='admin-table'>
        <thead>
            <tr>
                <th>email</th>
                <th className='mq-large-table-cell'>ID</th>
                <th>felhasználónév</th>
                <th className='mq-medium-table-cell'>regisztráció dátuma</th>
                <th>jogosultság</th>
                <th className='button'></th>
            </tr>
        </thead>
        <tbody>
            {users.map(u => (
                <tr key={u.id}>
                    <th>{u.email}</th>
                    <td className='mq-large-table-cell'>{u.id}</td>
                    <td>{u.username}</td>
                    <td className='mq-medium-table-cell'>{u.created}</td>
                    <td>{u.isAdmin ? "admin" : "vásárló"}</td>
                    <td className='button'><Link to={`/admin/felhasznalok/${u.id}`}><Button type='admin' primary={true}><FiEdit /></Button></Link></td>
                </tr>
            ))
            }
        </tbody>
    </AdminTable>
  )
}
