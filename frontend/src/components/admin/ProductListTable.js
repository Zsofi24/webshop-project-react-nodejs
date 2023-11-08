import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { RiDeleteBin2Fill } from 'react-icons/ri';
import { LuEdit } from 'react-icons/lu';
import { AdminTable } from '../../assets/css/AdminTable';
import Button from '../../components/Button';
import TableArrow from '../TableArrow';
import { useState } from 'react';

export default function ProductListTable({ products, productDelete, productVisible }) {

   

  return (
    <AdminTable className="admin-table">
        <thead>
            <tr>
                <th>ID</th>
                <th>név <TableArrow/></th>
                <th>ár <TableArrow/></th>
                <th className='mq-medium-table-cell'>leírás</th>
            </tr>
        </thead>
        <tbody>
            {products?.map(p => 
                (
                    <tr key={p.id}>
                        <td>{p.id}</td>
                        <td>{p.title}</td>
                        <td>{p.price} Ft</td>
                        <td className='mq-medium-table-cell'>{p.description}</td>
                        <td><Button type='admin'><Link to={`/admin/termekek/${p.id}`}><LuEdit /></Link></Button></td>
                        <td className='mq-medium-table-cell'><Button type='admin' handleClick={() => productVisible(p, p.id)}>{p.visible ? <AiFillEye/> : <AiFillEyeInvisible/>}</Button></td>
                        <td><Button type='admin' remove={true} handleClick={() => productDelete(p.id)}><RiDeleteBin2Fill /></Button></td>
                    </tr>
                )
                )            
            }

        </tbody>
    </AdminTable>
  )
}
