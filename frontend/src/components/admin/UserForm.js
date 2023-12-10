export default function ProductForm({ inputData, handleChange, newUser }) {

  return (
    <form>
      <div className='grid-input'>
        <label>ID</label>
        <input 
          type='text' 
          name='id'
          disabled={!newUser}
          value={inputData?.id || ''}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div className='grid-input'>
        <label>felhasználónév</label>
        <input 
          type='text' 
          name='username'
          value={inputData?.username || ''}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div className='grid-input'>
        <label>email</label>
        <input 
          name='email'
          type='email' 
          disabled={!newUser}
          value={inputData?.email || ''}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div className={newUser ? 'grid-input' : 'grid-input hide'}>
        <label htmlFor='password' className={newUser ? '' : 'hide'}>jelszó</label>
        <input
          className={newUser ? '' : 'hide'}
          type='password'
          name='password'
          id='password'
          value={inputData?.password || ''}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div>
        <label htmlFor='isAdmin'>admin jogosultság</label>
        <input 
          type='checkbox' 
          name='isAdmin'
          id='isAdmin'
          checked={inputData?.isAdmin || ""}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div>
        <label>regisztráció</label>
        <input
          type='text'
          disabled={true}
          name='regisztracio'
          value={inputData?.created || ""}
        />
      </div>
      
      </form>
  )
}

