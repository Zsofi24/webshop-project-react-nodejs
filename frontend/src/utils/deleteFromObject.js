export default  function deleteFromObject(userDetails, ...inputNames) {
    const newUserDetails = {...userDetails};
    inputNames.forEach(input => delete newUserDetails[input]);
    return newUserDetails;
  }