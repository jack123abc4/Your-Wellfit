//let loginSubmitBtn = document.querySelector('.login-form')
  


//document.getElementById('.signup-form').addEventListener('submit', signupFormHandler);



const loginFormHandler = async (event) => {
  //event.preventDefault();
  //console.log("hello")
  // Collect values from the login form
  const email = document.querySelector('#inputEmail').value;
  const password = document.querySelector('#inputPassword').value;

  console.log('user && pass', email,'&&',password)
  
  if (email && password) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    
    if (response.ok) {
      // If successful, redirect the browser to the profile page
      document.location.replace('/profile');
    } else {
      alert(response.statusText);
    }
  }
};
//loginSubmitBtn.addEventListener('submit', loginFormHandler);

const signupFormHandler = async (event) => {
  // event.preventDefault();

  const name = document.querySelector('#signupUsername').value;
  const email = document.querySelector('#signupEmail').value;
  const password = document.querySelector('#signupPassword').value;

  if (name && email && password) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
  }
};