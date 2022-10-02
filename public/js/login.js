//let loginSubmitBtn = document.querySelector('.login-form')
  


//document.getElementById('.signup-form').addEventListener('submit', signupFormHandler);



const loginFormHandler = async (event) => {
  // event.preventDefault();
  console.log("hello")
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
      alert('Login successful!')
      // If successful, redirect the browser to the profile page
      document.location.replace('/profile');
    } else {
      alert('Failed to log in');
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
      alert('Sign up successful!')
      document.location.replace('/');
    } else {
      alert('Failed to sign up');
    }
  }
};

document.getElementById("inputPassword")
    .addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        document.getElementById("loginBtn").click();
    }
});


document.getElementById("signupPassword")
    .addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        document.getElementById("signupBtn").click();
    }
});

