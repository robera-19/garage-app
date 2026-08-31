const api_url = process.env.REACT_APP_API_URL;

const logIn = async (formData) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  };
  console.log('About to send request');
  console.log(requestOptions.body);
  const response = await fetch(`${api_url}/api/employee/login`, requestOptions);
  return response;
};

// A function to log out the user
const logOut = () => {
  localStorage.removeItem("employee");
};

module.exports = {
  logIn,
  logOut
};
