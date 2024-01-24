import React, { useEffect, useState } from "react";
import { addUser, deleteUser, editUser, getCourses, getRoles, getUsers } from "../../services/apiService";
import {
  Container,
  Row,
  Col,
  Button,
  Table,
  Form,
  Modal,
} from "react-bootstrap";
import Sidebar from "../Sidebar/Sidebar";
import moment from 'moment';
import { useAuth } from "../../contexts/AuthContext";
import { USER_ROLES, isAdmin } from "../../helper/constants";
import { useTranslation } from 'react-i18next';

export default function Users() {
  const { t } = useTranslation(['headers']);

  const { user } = useAuth();
  const [modalVisible, setModalVisible] = useState(false)
  const [editModalVisible, setEditModalVisible] = useState(false)
  const [users, setUsers] = useState([])
  const [roles, setRoles] = useState([])
  const [courses, setCourses] = useState([])
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    userName: '',
    password: '',
    roleId: null,
    courseId: null
  })
  const [editForm, setEditForm] = useState({
    firstName: '',
    lastName: '',
    userName: '',
    password: '',
    roleId: null,
    courseId: null
  })
  const [editId, setEditID] = useState(null)

  useEffect(() => {
    document.title = t('headers:panel');
    if(user.role.id !== USER_ROLES.ADMIN) {
      setForm((prevForm) => ({
        ...prevForm,
        roleId: USER_ROLES.USER,
        courseId: user.course.id
      }));
    } else {
      setForm((prevForm) => ({
        ...prevForm,
        courseId: user.course.id
      }));
    }
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    const users = await getUsers();
    setUsers(users)
  }

  const fetchRoles = async () => {
    const role = await getRoles();
    setRoles(role)
  }

  const fetchCourses = async () => {
    const course = await getCourses();
    setCourses(course)
  }

  const handleAddUser = async () => {
    const response = await addUser(form)
    if(response) fetchUsers()
    setModalVisible(false)
  }

  const handleEditUser = async () => {
    const response = await editUser(editForm, editId)
    if(response) fetchUsers()
    setEditModalVisible(false)
  }

  const handleDelete = async (id) => {
    const response = await deleteUser(id)
    if(response) fetchUsers()
  }

  // const handleEdit = (item) => {
  //   setEditForm({
  //     name: item.name,
  //     link: item.link
  //   })
  //   setEditID(item.id)
  //   setEditModalVisible(true)
  // }

  const handleAddUserVisible = () => {
    setModalVisible(true)
    if(roles.length === 0 && isAdmin(user)) fetchRoles()
    if(courses.length === 0 && isAdmin(user)) fetchCourses()
  }

  return (
    <div style={{ flex: 1, height: "100vh", width: "100%" }}>
      <Row style={{ flex: 1, height: "100vh" }}>
        <Col sm={2} style={{ height: "100vh" }}>
          <Sidebar />
        </Col>
        <Col>
          <Container>
            <Container className="mt-3">
              <Row>
                <Col>
                  <div>
                    <Button
                      variant="primary"
                      onClick={handleAddUserVisible}
                    >
                      Kullanıcı Ekle
                    </Button>
                    <Table className="mt-3" striped bordered hover>
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Ad</th>
                          <th>Soyad</th>
                          <th>Kullanıcı Adı</th>
                          <th>Oluşturulma Tarihi</th>
                          <th>İşlemler</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((item) => (
                          <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.firstName}</td>
                            <td>{item.lastName}</td>
                            <td>{item.userName}</td>
                            <td>{moment(item.createdAt).format('DD.MM.YYYY HH:mm')}</td>
                            <td>
                              {/* <Button variant="info" size="sm" onClick={() => handleEdit(item)}>
                                Düzenle
                              </Button>{" "} */}
                              <Button variant="danger" size="sm" onClick={() => handleDelete(item.id)}>
                                Sil
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                </Col>
              </Row>
            </Container>

            <Modal show={modalVisible} onHide={() => setModalVisible(false)}>
              <Modal.Header closeButton>
                <Modal.Title>Kullanıcı Ekle</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group controlId="formUserName">
                    <Form.Label>Kullanıcı Adı</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Kullanıcı Adı"
                      onChange={(e) => setForm({
                        ...form,
                        userName: e.target.value
                      })}
                    />
                  </Form.Group>
                  <Form.Group controlId="formFirstName">
                    <Form.Label>Adı</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Kullanıcı Adı"
                      onChange={(e) => setForm({
                        ...form,
                        firstName: e.target.value
                      })}
                    />
                  </Form.Group>
                  <Form.Group controlId="formLastName">
                    <Form.Label>Soyadı</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Kullanıcı Adı"
                      onChange={(e) => setForm({
                        ...form,
                        lastName: e.target.value
                      })}
                    />
                  </Form.Group>
                  <Form.Group controlId="formPassword">
                    <Form.Label>Şifre</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Kullanıcı Adı"
                      onChange={(e) => setForm({
                        ...form,
                        password: e.target.value
                      })}
                    />
                  </Form.Group>
                  {isAdmin(user) && <Form.Group className="mb-3">
                    <Form.Label>Rol</Form.Label>
                    <Form.Select
                      name="role"
                      value={form.roleId}
                      onChange={(e) => {
                        setForm((prevForm) => ({
                          ...prevForm,
                          roleId: e.target.value
                        }));
                      }}
                      required
                    >
                      {
                        roles.map(role => (
                          <option key={role.id} value={role.id}>{role.name}</option>
                        ))
                      }
                    </Form.Select>
                  </Form.Group>}
                  {isAdmin(user) && <Form.Group className="mb-3">
                    <Form.Label>Kurs</Form.Label>
                    <Form.Select
                      name="course"
                      value={form.courseId}
                      onChange={(e) => {
                        setForm((prevForm) => ({
                          ...prevForm,
                          courseId: e.target.value
                        }));
                      }}
                      required
                    >
                      {
                        courses.map(course => (
                          <option key={course.id} value={course.id}>{course.name}</option>
                        ))
                      }
                    </Form.Select>
                  </Form.Group>}
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="secondary"
                  onClick={() => setModalVisible(false)}
                >
                  Kapat
                </Button>
                <Button variant="primary" onClick={handleAddUser}>
                  Ekle
                </Button>
              </Modal.Footer>
            </Modal>

            <Modal show={editModalVisible} onHide={() => setEditModalVisible(false)}>
              <Modal.Header closeButton>
                <Modal.Title>Kullanıcı Ekle</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group controlId="formUserName">
                    <Form.Label>Kullanıcı Adı</Form.Label>
                    <Form.Control
                      value={editForm.name}
                      type="text"
                      placeholder="Kullanıcı Adı"
                      onChange={(e) => setEditForm({
                        ...editForm,
                        name: e.target.value
                      })}
                    />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="secondary"
                  onClick={() => setEditModalVisible(false)}
                >
                  Kapat
                </Button>
                <Button variant="primary" onClick={handleEditUser}>
                  Düzenle
                </Button>
              </Modal.Footer>
            </Modal>
          </Container>
        </Col>
      </Row>
    </div>
  );
}
