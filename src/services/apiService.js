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
  const response = await fetch(`${BASE_URL}/lesson/edit/${id}`, {
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
  const response = await fetch(`${BASE_URL}/course/edit/${id}`, {
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

//-------------EXAM-------------------
export async function getExams() {
  const token = localStorage.getItem('token')
  const response = await fetch(`${BASE_URL}/exam`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    },
  });
  
  if (!response.ok) {
    throw new Error('Get exam failed');
  }

  const data = await response.json();
  return data.payload;
}

export async function addExam(data) {
  const dataJson = JSON.stringify(data)
  const token = localStorage.getItem('token')
  const response = await fetch(`${BASE_URL}/exam`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    },
    body: dataJson
  });
  
  if (!response.ok) {
    throw new Error('Add exam failed');
  }

  const responseJson = await response.json();
  return responseJson.payload;
}

export async function editExam(data, id) {
  const dataJson = JSON.stringify(data)
  const token = localStorage.getItem('token')
  const response = await fetch(`${BASE_URL}/exam/edit/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    },
    body: dataJson
  });
  
  if (!response.ok) {
    throw new Error('Add exam failed');
  }

  const responseJson = await response.json();
  return responseJson.payload;
}

export async function deleteExam(id) {
  const token = localStorage.getItem('token')
  const response = await fetch(`${BASE_URL}/exam/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    },
  });
  
  if (!response.ok) {
    throw new Error('Add exam failed');
  }

  const responseJson = await response.json();
  return responseJson.payload;
}

//-------------QUESTION-------------------
export async function getQuestions() {
  const token = localStorage.getItem('token')
  const response = await fetch(`${BASE_URL}/question`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    },
  });
  
  if (!response.ok) {
    throw new Error('Get question failed');
  }

  const data = await response.json();
  return data.payload;
}

export async function getQuestionsbyExam(id) {
  const token = localStorage.getItem('token')
  const response = await fetch(`${BASE_URL}/question/byexam/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    },
  });
  
  if (!response.ok) {
    throw new Error('Get question failed');
  }

  const data = await response.json();
  return data.payload;
}

export async function addQuestion(data) {
  const dataJson = JSON.stringify(data)
  const token = localStorage.getItem('token')
  const response = await fetch(`${BASE_URL}/question`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    },
    body: dataJson
  });
  
  if (!response.ok) {
    throw new Error('Add question failed');
  }

  const responseJson = await response.json();
  return responseJson.payload;
}

export async function editQuestion(data, id) {
  const dataJson = JSON.stringify(data)
  const token = localStorage.getItem('token')
  const response = await fetch(`${BASE_URL}/question/edit/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    },
    body: dataJson
  });
  
  if (!response.ok) {
    throw new Error('Add question failed');
  }

  const responseJson = await response.json();
  return responseJson.payload;
}

export async function deleteQuestion(id) {
  const token = localStorage.getItem('token')
  const response = await fetch(`${BASE_URL}/question/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    },
  });
  
  if (!response.ok) {
    throw new Error('Add question failed');
  }

  const responseJson = await response.json();
  return responseJson.payload;
}

//-------------SECTION-------------------
export async function getSections() {
  const token = localStorage.getItem('token')
  const response = await fetch(`${BASE_URL}/section`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    },
  });
  
  if (!response.ok) {
    throw new Error('Get section failed');
  }

  const data = await response.json();
  return data.payload;
}

export async function addSection(data) {
  const dataJson = JSON.stringify(data)
  const token = localStorage.getItem('token')
  const response = await fetch(`${BASE_URL}/section`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    },
    body: dataJson
  });
  
  if (!response.ok) {
    throw new Error('Add section failed');
  }

  const responseJson = await response.json();
  return responseJson.payload;
}

export async function editSection(data, id) {
  const dataJson = JSON.stringify(data)
  const token = localStorage.getItem('token')
  const response = await fetch(`${BASE_URL}/section/edit/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    },
    body: dataJson
  });
  
  if (!response.ok) {
    throw new Error('Add section failed');
  }

  const responseJson = await response.json();
  return responseJson.payload;
}

export async function deleteSection(id) {
  const token = localStorage.getItem('token')
  const response = await fetch(`${BASE_URL}/section/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    },
  });
  
  if (!response.ok) {
    throw new Error('Add section failed');
  }

  const responseJson = await response.json();
  return responseJson.payload;
}

//-------------SECTIONPART-------------------
export async function getSectionParts() {
  const token = localStorage.getItem('token')
  const response = await fetch(`${BASE_URL}/sectionPart`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    },
  });
  
  if (!response.ok) {
    throw new Error('Get sectionPart failed');
  }

  const data = await response.json();
  return data.payload;
}

export async function getPartsbySection(id) {
  const token = localStorage.getItem('token')
  const response = await fetch(`${BASE_URL}/sectionPart/bysection/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    },
  });
  
  if (!response.ok) {
    throw new Error('Get sectionPart failed');
  }

  const data = await response.json();
  return data.payload;
}

export async function addSectionPart(data) {
  const dataJson = JSON.stringify(data)
  const token = localStorage.getItem('token')
  const response = await fetch(`${BASE_URL}/sectionPart`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    },
    body: dataJson
  });
  
  if (!response.ok) {
    throw new Error('Add sectionPart failed');
  }

  const responseJson = await response.json();
  return responseJson.payload;
}

export async function editSectionPart(data, id) {
  const dataJson = JSON.stringify(data)
  const token = localStorage.getItem('token')
  const response = await fetch(`${BASE_URL}/sectionPart/edit/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    },
    body: dataJson
  });
  
  if (!response.ok) {
    throw new Error('Add sectionPart failed');
  }

  const responseJson = await response.json();
  return responseJson.payload;
}

export async function deleteSectionPart(id) {
  const token = localStorage.getItem('token')
  const response = await fetch(`${BASE_URL}/sectionPart/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    },
  });
  
  if (!response.ok) {
    throw new Error('Add sectionPart failed');
  }

  const responseJson = await response.json();
  return responseJson.payload;
}

export async function getSectionPartAudio(id) {
  const token = localStorage.getItem('token')
  const response = await fetch(`${BASE_URL}/sectionpart/${id}/audio`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    },
  });
  
  if (!response.ok) {
    throw new Error('Get sectionPart failed');
  }

  const data = await response.arrayBuffer();
  const blob = new Blob([data], { type: 'audio/mpeg' });
  const blobURL = URL.createObjectURL(blob);
  return blobURL;
}

//-------------LANGUAGE-------------------
export async function getLanguages() {
  const token = localStorage.getItem('token')
  const response = await fetch(`${BASE_URL}/language`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    },
  });
  
  if (!response.ok) {
    throw new Error('Get language failed');
  }

  const data = await response.json();
  return data.payload;
}

export async function addLanguage(data) {
  const dataJson = JSON.stringify(data)
  const token = localStorage.getItem('token')
  const response = await fetch(`${BASE_URL}/language`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    },
    body: dataJson
  });
  
  if (!response.ok) {
    throw new Error('Add language failed');
  }

  const responseJson = await response.json();
  return responseJson.payload;
}

export async function editLanguage(data, id) {
  const dataJson = JSON.stringify(data)
  const token = localStorage.getItem('token')
  const response = await fetch(`${BASE_URL}/language/edit/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    },
    body: dataJson
  });
  
  if (!response.ok) {
    throw new Error('Add language failed');
  }

  const responseJson = await response.json();
  return responseJson.payload;
}

export async function deleteLanguage(id) {
  const token = localStorage.getItem('token')
  const response = await fetch(`${BASE_URL}/language/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    },
  });
  
  if (!response.ok) {
    throw new Error('Add language failed');
  }

  const responseJson = await response.json();
  return responseJson.payload;
}