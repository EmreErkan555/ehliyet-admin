const BASE_URL = process.env.REACT_APP_BASE_URL;
console.log("baseurl", BASE_URL)
export async function apiLogin(email, password) {
  const response = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  
  if (!response.ok) {
    throw new Error('Login failed');
  }

  const data = await response.json();
  return data.token;
}
