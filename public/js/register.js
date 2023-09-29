console.log('successful registration');

const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const name = document.querySelector('#name-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
  
    if (name && email && password) {
      const response = await fetch('/api/user', {
      
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  console.log('adrian', response);
      if (response.ok) {
        document.location.replace('/dashboard');
        
      } else {
        alert(response.statusText);
      }
    
    }

  };
  

  document
    .querySelector('#registration')
    .addEventListener('submit', signupFormHandler);