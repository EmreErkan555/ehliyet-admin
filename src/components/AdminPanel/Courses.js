import React, { useEffect, useState } from "react";
import { addCourse, deleteCourse, editCourse, getCourses } from "../../services/apiService";
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

export default function Courses() {
  const [modalVisible, setModalVisible] = useState(false)
  const [editModalVisible, setEditModalVisible] = useState(false)
  const [courses, setCourses] = useState([])
  const [form, setForm] = useState({
    name: '',
    logo: ''
  })
  const [editForm, setEditForm] = useState({
    name: '',
    logo: ''
  })
  const [editId, setEditID] = useState(null)

  useEffect(() => {
    fetchCourses()
  }, [])

  const fetchCourses = async () => {
    const course = await getCourses();
    setCourses(course)
  }

  const handleAddCourse = async () => {
    const response = await addCourse(form)
    if(response) fetchCourses()
    setModalVisible(false)
  }

  const handleEditCourse = async () => {
    const response = await editCourse(editForm, editId)
    if(response) fetchCourses()
    setEditModalVisible(false)
  }

  const handleDelete = async (id) => {
    const response = await deleteCourse(id)
    if(response) fetchCourses()
  }

  const handleEdit = (item) => {
    setEditForm({
      name: item.name,
      link: item.link
    })
    setEditID(item.id)
    setEditModalVisible(true)
  }

  const handleImageUpload = (e, isEdit) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if(isEdit){
          setEditForm((prevForm) => ({
            ...prevForm,
            icon: reader.result
          }));
        }else{
          setForm((prevForm) => ({
            ...prevForm,
            icon: reader.result
          }));
        }
        
      };
      reader.readAsDataURL(file);
    }
  };

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
                      onClick={() => setModalVisible(true)}
                    >
                      Kurs Ekle
                    </Button>
                    <Table className="mt-3" striped bordered hover>
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>İsim</th>
                          <th>Logo</th>
                          <th>Ödeme</th>
                          <th>Oluşturulma Tarihi</th>
                          <th>İşlemler</th>
                        </tr>
                      </thead>
                      <tbody>
                        {courses.map((item) => (
                          <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>
                              <img 
                                src={item.icon} 
                                className="d-inline-block align-top"
                                alt="Car Logo"
                                height='30'
                              />
                            </td>
                            <td>{item.isPayed ? "Yapıldı" : "Yapılmadı"}</td>
                            <td>{moment(item.createdAt).format('DD.MM.YYYY HH:mm')}</td>
                            <td>
                              <Button variant="info" size="sm" onClick={() => handleEdit(item)}>
                                Düzenle
                              </Button>{" "}
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
                <Modal.Title>Kurs Ekle</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group controlId="formCourseName">
                    <Form.Label>Kurs Adı</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Kurs Adı"
                      onChange={(e) => setForm({
                        ...form,
                        name: e.target.value
                      })}
                    />
                  </Form.Group>
                  <Form.Group controlId="icon">
                    <Form.Label>Logo Ekle</Form.Label>
                    <Form.Control type="file" accept="image/*" onChange={handleImageUpload} />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="secondary"
                  onClick={() => setModalVisible(false)}
                >
                  Kapat
                </Button>
                <Button variant="primary" onClick={handleAddCourse}>
                  Ekle
                </Button>
              </Modal.Footer>
            </Modal>

            <Modal show={editModalVisible} onHide={() => setEditModalVisible(false)}>
              <Modal.Header closeButton>
                <Modal.Title>Kurs Ekle</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group controlId="formCourseName">
                    <Form.Label>Kurs Adı</Form.Label>
                    <Form.Control
                      value={editForm.name}
                      type="text"
                      placeholder="Kurs Adı"
                      onChange={(e) => setEditForm({
                        ...editForm,
                        name: e.target.value
                      })}
                    />
                  </Form.Group>
                  <Form.Group controlId="icon">
                    <Form.Label>Logo Ekle</Form.Label>
                    <Form.Control type="file" accept="image/*" onChange={(e) => handleImageUpload(e, true)} />
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
                <Button variant="primary" onClick={handleEditCourse}>
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
