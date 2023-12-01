import { Link } from 'react-router-dom';
import { RiDeleteBin2Fill } from 'react-icons/ri';
import { FiEdit } from 'react-icons/fi';
import { AdminTable } from './AdminTable';
import Button from '../button/Button';

export default function CategoryListTable({categories, categoryDelete}) {
  return (
    <AdminTable className='admin-table'>
        <thead>
            <tr>
                <th>ID</th>
                <th>kategóra név</th>
                <th className='button'></th>
                <th className='button'></th>
            </tr>
        </thead>
        <tbody>
            {categories?.map(c => 
                (
                    <tr key={c.categoryId}>
                        <td>{c.categoryId}</td>
                        <td>{c.categoryName}</td>
                        <td className='button'><Button type="admin" primary={true}><Link to={`/admin/kategoriak/${c.categoryId}`}><FiEdit /></Link></Button></td>
                        <td className='button'><Button type="admin" remove={true} handleClick={() => categoryDelete(c.categoryId)}><RiDeleteBin2Fill /></Button></td>
                    </tr>
                )
            )
            }
        </tbody>
    </AdminTable>
  )
}
