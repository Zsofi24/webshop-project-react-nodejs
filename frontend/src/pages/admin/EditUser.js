import { useParams } from 'react-router-dom';
import UserForm from '../../components/admin/UserForm';
import useUser from '../../hooks/useUser';
import Button from '../../components/button/Button';
import { userService } from '../../services/userServices';
import { StyledUpdateForm } from '../../components/admin/StyledUpdateForm';

export default function EditUser() {

    let [{ loading, response, error, orders}, dispatch ] = useUser();
    const { userid } = useParams();

    function handleChange(e) {
        const { name, value, type, checked } = e.target;
        dispatch({ type: 'UPDATE', response: {...response, [name]: type === "checkbox" ? checked : value}})
    }

    function updateUser(e) {
        e.preventDefault();
        userService
            .updateUser(response, userid)
            .then(updates => console.log("update user", updates))
            .catch(err => alert(err))
    }


  return (
    <section>
      { loading && <div>Loading...</div> }
      { error && <div>ERROR OH NO</div> }
      { response && (
        <StyledUpdateForm>
            <UserForm 
              inputData={response} 
              handleChange={handleChange}
            />
            <Button $primary text='szerkesztés' handleClick={updateUser}></Button>
        </StyledUpdateForm>
      )}
    </section>
  )
}
