import React from 'react';
import { Link } from 'react-router-dom';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { RiDeleteBin2Fill } from 'react-icons/ri';
import { LuEdit } from 'react-icons/lu';
import { AdminTable } from '../../assets/css/AdminTable';
import { Button } from '../../assets/css/Button';

export default function ProductListTable({products, productDelete, productVisible}) {

  return (
    <AdminTable className="her">
        <thead>
            <tr>
                <th>ID</th>
                <th>név</th>
                <th>ár</th>
                <th>leírás</th>
            </tr>
        </thead>
        <tbody>
            {products?.map(p => 
                (
                    <tr key={p.id}>
                        <td>{p.id}</td>
                        <td>{p.title}</td>
                        <td>{p.price}</td>
                        <td>{p.description}</td>
                        <td><Button><Link to={`/admin/termekek/${p.id}`}><LuEdit /></Link></Button></td>
                        <td><Button onClick={() => productVisible(p, p.id)}>{p.visible ? <AiFillEye/> : <AiFillEyeInvisible/>}</Button></td>
                        <td><Button onClick={() => productDelete(p.id)}><RiDeleteBin2Fill /></Button></td>
                    </tr>
                )
                )            
            }

        </tbody>
    </AdminTable>
  )
}
