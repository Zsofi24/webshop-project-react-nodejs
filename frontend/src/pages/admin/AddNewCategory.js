import React from 'react'
import useCategory from '../../hooks/useCategory';
import Button from '../../components/Button';
import { categoryService } from '../../services/categoryService';
import CategoryForm from '../../components/admin/CategoryForm';

export default function AddNewCategory() {

  const [{ response }, dispatch ] = useCategory();

  function handleChange(e) {
    const { name, value, type, checked, files } = e.target;
    if(type == "file") {
      console.log(files[0], "files0");
      dispatch({ type: 'UPDATE', response: {...response, [name]: files[0]}})
    } else {
      dispatch({ type: 'UPDATE', response: {...response, [name]: type === "checkbox" ? checked : value}})
    }

  }
  console.log(response);

  function createCategory() {
    categoryService
      .create({id: response.categoryId, name: response.categoryName})
      .then(resp => console.log(resp))
  }

  return (
    <>
    <CategoryForm
      inputData={response}
      handleChange={handleChange}      
    />
    <Button $primary handleClick={createCategory}>kategória létrehozása</Button>
    </>
  )
}
