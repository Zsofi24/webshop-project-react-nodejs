import { StyledUpdateForm } from '../../components/admin/StyledUpdateForm';
import useUser from '../../hooks/useUser';
import UserForm from '../../components/admin/UserForm';
import Button from '../../components/button/Button';
import { userService } from '../../services/userServices';
import { useNavigate } from 'react-router-dom';
import { logDOM } from '@testing-library/react';

export default function AdminNewUser() {

    let [{ loading, response, error, orders}, dispatch ] = useUser();

    const navigate = useNavigate();

    console.log(response, "new user data");    

    function createUser() {
        userService
            .createUser(response)
            .then(() => navigate('/admin/felhasznalok'))
            .catch(err => alert(err))
    }

    function handleChange(e) {
        const { name, value, type, checked, files } = e.target;
        if(type == "file") {
          console.log(files[0], "files0");
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
            <>
            <StyledUpdateForm>
                <UserForm
                    inputData={response} 
                    handleChange={handleChange}
                    newUser={true}
                />
                <Button $primary handleClick={createUser}>FELHASZNÁLÓ LÉTREHOZÁSA</Button>
            </StyledUpdateForm>
            </>
     )} 
</section>

)
}
