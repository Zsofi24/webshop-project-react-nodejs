import React from 'react'
import Button from '../../components/Button';
import useCategory from '../../hooks/useCategory';
import { useParams } from 'react-router-dom';
import { categoryService } from '../../services/categoryService';

export default function EditCategory() {

    const [ loading, response, error , dispatch ] = useCategory();
    const { categoryid } = useParams();

    function updateCategory(e) {
        e.preventDefault();
        categoryService.updateCategory(response, categoryid)
            .then(updated => console.log(updated, "updqted"))
    }

    function handleChange(e) {
      const { name, value, type, checked } = e.target;
      dispatch({ type: 'UPDATE', response: {...response, [name]: type === "checkbox" ? checked : value}})
    }

    console.log(response, "response");


    return (
        <section>
        { loading && <div>Loading...</div> }
        { error && <div>ERROR OH NO</div> }
        { response && (
          <>
            <form>
                <label>kategória id</label>
                <input type='text' value={response.categoryId} disabled/>

                <label>kategória név</label>
                <input 
                    type='text' 
                    value={response.categoryName} 
                    onChange={handleChange}
                    name="categoryName"
                />
            </form>
              <Button $primary handleClick={updateCategory} text='szerkesztés'></Button>
          </>
        )}
      </section>
  
  )
}
