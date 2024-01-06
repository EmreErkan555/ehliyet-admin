const BASE_URL = process.env.REACT_APP_BASE_URL;
export async function apiLogin(userName, password) {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userName, password }),
  });
  
  if (!response.ok) {
    throw new Error('Login failed');
  }

  const data = await response.json();
  console.log("data", data)
  return data.payload;
}

//-------------LESSON-------------------
export async function getLessons() {
  const token = localStorage.getItem('token')
  const response = await fetch(`${BASE_URL}/lesson`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    },
  });
  
  if (!response.ok) {
    throw new Error('Get lesson failed');
  }

  const data = await response.json();
  return data.payload;
}

export async function addLesson(data) {
  const dataJson = JSON.stringify(data)
  const token = localStorage.getItem('token')
  const response = await fetch(`${BASE_URL}/lesson`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    },
    body: dataJson
  });
  
  if (!response.ok) {
    throw new Error('Add lesson failed');
  }

  const responseJson = await response.json();
  return responseJson.payload;
}

export async function editLesson(data, id) {
  const dataJson = JSON.stringify(data)
  const token = localStorage.getItem('token')
  const response = await fetch(`${BASE_URL}/lesson/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    },
    body: dataJson
  });
  
  if (!response.ok) {
    throw new Error('Add lesson failed');
  }

  const responseJson = await response.json();
  return responseJson.payload;
}

export async function deleteLesson(id) {
  const token = localStorage.getItem('token')
  const response = await fetch(`${BASE_URL}/lesson/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    },
  });
  
  if (!response.ok) {
    throw new Error('Add lesson failed');
  }

  const responseJson = await response.json();
  return responseJson.payload;
}