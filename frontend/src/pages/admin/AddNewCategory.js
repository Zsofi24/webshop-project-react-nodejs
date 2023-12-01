import { useNavigate } from 'react-router-dom';
import useCategory from '../../hooks/useCategory';
import { categoryService } from '../../services/categoryService';
import CategoryForm from '../../components/admin/CategoryForm';
import Button from '../../components/button/Button';
import { StyledUpdateForm } from '../../components/admin/StyledUpdateForm';

export default function AddNewCategory() {

  const [{ response }, dispatch ] = useCategory();
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value, type, checked, files } = e.target;
    if(type == "file") {
      console.log(files[0], "files0");
      dispatch({ type: 'UPDATE', response: {...response, [name]: files[0]}})
    } else {
      dispatch({ type: 'UPDATE', response: {...response, [name]: type === "checkbox" ? checked : value}})
    }

  }

  function createCategory() {
    categoryService
      .create({id: response.categoryId, name: response.categoryName})
      .then(() => {
         navigate('/admin/kategoriak')
      })
      .catch(err => alert(err.statusText))
  }

  return (
    <>
    <StyledUpdateForm>
      <CategoryForm
        inputData={response}
        handleChange={handleChange}      
      />
      <Button $primary handleClick={createCategory}>kategória létrehozása</Button>
    </StyledUpdateForm>
    </>
  )
}
