import { useParams } from 'react-router-dom';
import useCategory from '../../hooks/useCategory';
import Button from '../../components/button/Button';
import { categoryService } from '../../services/categoryService';
import CategoryForm from '../../components/admin/CategoryForm'
import { StyledUpdateForm } from '../../components/admin/StyledUpdateForm';

export default function EditCategory() {

  let [{ loading, response, categories, error}, dispatch ] = useCategory();
  const { categoryid } = useParams();

    function updateCategory(e) {
        e.preventDefault();
        categoryService
          .updateCategory(response, categoryid)
          .then(updated => console.log(updated, "updqted"))
    }

    function handleChange(e) {
      const { name, value, type, checked, files } = e.target;
      if(type == "file") {
        dispatch({ type: 'UPDATE', response: {...response, [name]: files[0]}})
      } else {
        dispatch({ type: 'UPDATE', response: {...response, [name]: type === "checkbox" ? checked : value}})
      }    
    }

    return (
        <section>
        { loading && <div>Loading...</div> }
        { error && <div>ERROR OH NO</div> }
        { response && (
          <StyledUpdateForm>
            <CategoryForm 
              inputData={response}
              handleChange={handleChange}
            />
            <Button $primary handleClick={updateCategory} text='szerkesztés'></Button>
          </StyledUpdateForm>
        )}
      </section>  
  )
}
