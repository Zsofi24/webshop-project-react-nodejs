import React from 'react';
import { Link } from 'react-router-dom';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { RiDeleteBin2Fill } from 'react-icons/ri';
import { FiEdit } from 'react-icons/fi';
import { AdminTable } from '../../assets/css/AdminTable';
import Button from '../../components/Button';

export default function ProductListTable({ products, productDelete, productVisible }) {

  return (
    <AdminTable className="admin-table">
        <thead>
            <tr>
                <th>ID</th>
                <th>név</th>
                <th>ár</th>
                <th className='mq-medium-table-cell description'>leírás</th>
                <th className='button'></th>
                <th className='mq-medium-table-cell button'></th>
                <th className='button'></th>
            </tr>
        </thead>
        <tbody>
            {products?.map(p => 
                (
                    <tr key={p.id}>
                        <th>{p.id}</th>
                        <td>{p.title}</td>
                        <td>{p.price} Ft</td>
                        <td className='mq-medium-table-cell description'>{p.description}</td>
                        <td className='button'><Link to={`/admin/termekek/${p.id}`}><Button type='admin' primary={true}><FiEdit /></Button></Link></td>
                        <td className='mq-medium-table-cell button'><Button type='admin' handleClick={() => productVisible(p, p.id)}>{p.visible ? <AiFillEye/> : <AiFillEyeInvisible/>}</Button></td>
                        <td className='button'><Button type='admin' remove={true} handleClick={() => productDelete(p.id)}><RiDeleteBin2Fill /></Button></td>
                    </tr>
                )
                )            
            }
        </tbody>
    </AdminTable>
  )
}
