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

//-------------USER-------------------
export async function getUsers() {
  const token = localStorage.getItem('token')
  const response = await fetch(`${BASE_URL}/auth`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    },
  });
  
  if (!response.ok) {
    throw new Error('Get course failed');
  }

  const data = await response.json();
  return data.payload;
}

export async function addUser(data) {
  const dataJson = JSON.stringify(data)
  const token = localStorage.getItem('token')
  const response = await fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    },
    body: dataJson
  });
  
  if (!response.ok) {
    throw new Error('Add course failed');
  }

  const responseJson = await response.json();
  return responseJson.payload;
}

export async function editUser(data, id) {
  const dataJson = JSON.stringify(data)
  const token = localStorage.getItem('token')
  const response = await fetch(`${BASE_URL}/auth/edit/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    },
    body: dataJson
  });
  
  if (!response.ok) {
    throw new Error('Add course failed');
  }

  const responseJson = await response.json();
  return responseJson.payload;
}

export async function deleteUser(id) {
  const token = localStorage.getItem('token')
  const response = await fetch(`${BASE_URL}/auth/delete/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    },
  });
  
  if (!response.ok) {
    throw new Error('Add Course failed');
  }

  const responseJson = await response.json();
  return responseJson.payload;
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
    method: 'POST',
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

//-------------COURSE-------------------
export async function getCourses() {
  const token = localStorage.getItem('token')
  const response = await fetch(`${BASE_URL}/course`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    },
  });
  
  if (!response.ok) {
    throw new Error('Get course failed');
  }

  const data = await response.json();
  return data.payload;
}

export async function addCourse(data) {
  const dataJson = JSON.stringify(data)
  const token = localStorage.getItem('token')
  const response = await fetch(`${BASE_URL}/course`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    },
    body: dataJson
  });
  
  if (!response.ok) {
    throw new Error('Add course failed');
  }

  const responseJson = await response.json();
  return responseJson.payload;
}

export async function editCourse(data, id) {
  const dataJson = JSON.stringify(data)
  const token = localStorage.getItem('token')
  const response = await fetch(`${BASE_URL}/course/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    },
    body: dataJson
  });
  
  if (!response.ok) {
    throw new Error('Add course failed');
  }

  const responseJson = await response.json();
  return responseJson.payload;
}

export async function deleteCourse(id) {
  const token = localStorage.getItem('token')
  const response = await fetch(`${BASE_URL}/course/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    },
  });
  
  if (!response.ok) {
    throw new Error('Add Course failed');
  }

  const responseJson = await response.json();
  return responseJson.payload;
}

//-------------ROLE-------------------
export async function getRoles() {
  const token = localStorage.getItem('token')
  const response = await fetch(`${BASE_URL}/role`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    },
  });
  
  if (!response.ok) {
    throw new Error('Get course failed');
  }

  const data = await response.json();
  return data.payload;
}
