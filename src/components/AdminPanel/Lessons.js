import React, { useEffect, useState } from "react";
import { addLesson, deleteLesson, editLesson, getLessons } from "../../services/apiService";
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

export default function Lessons() {
  const [modalVisible, setModalVisible] = useState(false)
  const [editModalVisible, setEditModalVisible] = useState(false)
  const [lessons, setLessons] = useState([])
  const [form, setForm] = useState({
    name: '',
    link: ''
  })
  const [editForm, setEditForm] = useState({
    name: '',
    link: ''
  })
  const [editId, setEditID] = useState(null)

  useEffect(() => {
    fetchLessons()
  }, [])

  const fetchLessons = async () => {
    const lessons = await getLessons();
    setLessons(lessons)
  }

  const handleAddLesson = async () => {
    const response = await addLesson(form)
    if(response) fetchLessons()
    setModalVisible(false)
  }

  const handleEditLesson = async () => {
    const response = await editLesson(editForm, editId)
    if(response) fetchLessons()
    setEditModalVisible(false)
  }

  const handleDelete = async (id) => {
    const response = await deleteLesson(id)
    if(response) fetchLessons()
  }

  const handleEdit = (item) => {
    setEditForm({
      name: item.name,
      link: item.link
    })
    setEditID(item.id)
    setEditModalVisible(true)
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
                      onClick={() => setModalVisible(true)}
                    >
                      Ders Ekle
                    </Button>
                    <Table className="mt-3" striped bordered hover>
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>İsim</th>
                          <th>Link</th>
                          <th>İşlemler</th>
                        </tr>
                      </thead>
                      <tbody>
                        {lessons.map((item) => (
                          <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.link}</td>
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
                <Modal.Title>Ders Ekle</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group controlId="formLessonName">
                    <Form.Label>Ders Adı</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Ders Adı"
                      onChange={(e) => setForm({
                        ...form,
                        name: e.target.value
                      })}
                    />
                  </Form.Group>
                  <Form.Group controlId="formLink">
                    <Form.Label>Link</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Link"
                      onChange={(e) => setForm({ 
                        ...form,
                        link: e.target.value
                      })}                    
                    />
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
                <Button variant="primary" onClick={handleAddLesson}>
                  Ekle
                </Button>
              </Modal.Footer>
            </Modal>

            <Modal show={editModalVisible} onHide={() => setEditModalVisible(false)}>
              <Modal.Header closeButton>
                <Modal.Title>Ders Ekle</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group controlId="formLessonName">
                    <Form.Label>Ders Adı</Form.Label>
                    <Form.Control
                      value={editForm.name}
                      type="text"
                      placeholder="Ders Adı"
                      onChange={(e) => setEditForm({
                        ...editForm,
                        name: e.target.value
                      })}
                    />
                  </Form.Group>
                  <Form.Group controlId="formLink">
                    <Form.Label>Link</Form.Label>
                    <Form.Control
                      value={editForm.link}
                      type="text"
                      placeholder="Link"
                      onChange={(e) => setEditForm({ 
                        ...editForm,
                        link: e.target.value
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
                <Button variant="primary" onClick={handleEditLesson}>
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
