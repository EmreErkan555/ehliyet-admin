import React, { useEffect, useState } from "react";
import { addExam, deleteExam, editExam, getExams } from "../../services/apiService";
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
import { useNavigate } from 'react-router-dom';

export default function Exams() {
  const navigate = useNavigate();
  const [modalVisible, setModalVisible] = useState(false)
  const [editModalVisible, setEditModalVisible] = useState(false)
  const [exams, setExams] = useState([])
  const [form, setForm] = useState({
    name: '',
  })
  const [editForm, setEditForm] = useState({
    name: '',
  })
  const [editId, setEditID] = useState(null)

  useEffect(() => {
    fetchExams()
  }, [])

  const fetchExams = async () => {
    const exams = await getExams();
    setExams(exams)
  }

  const handleAddExam = async () => {
    const response = await addExam(form)
    if(response) fetchExams()
    setModalVisible(false)
  }

  const handleEditExam = async () => {
    const response = await editExam(editForm, editId)
    if(response) fetchExams()
    setEditModalVisible(false)
  }

  const handleDelete = async (id) => {
    const response = await deleteExam(id)
    if(response) fetchExams()
  }

  const handleEdit = (item) => {
    setEditForm({
      name: item.name,
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
                      Kitap Ekle
                    </Button>
                    <Table className="mt-3" striped bordered hover>
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>İsim</th>
                          <th>İşlemler</th>
                        </tr>
                      </thead>
                      <tbody>
                        {exams.map((item) => (
                          <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>
                              <Button variant="info" size="sm" onClick={() => handleEdit(item)}>
                                Düzenle
                              </Button>{" "}
                              <Button variant="danger" size="sm" onClick={() => handleDelete(item.id)}>
                                Sil
                              </Button>{" "}
                              <Button variant="success" size="sm" onClick={() => navigate(`/addquestion/${item.id}`, { state: { examName: item.name } })}>
                                Soru Ekle
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
                <Modal.Title>Kitap Ekle</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group controlId="formExamName">
                    <Form.Label>Kitap Adı</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Kitap Adı"
                      onChange={(e) => setForm({
                        ...form,
                        name: e.target.value
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
                <Button variant="primary" onClick={handleAddExam}>
                  Ekle
                </Button>
              </Modal.Footer>
            </Modal>

            <Modal show={editModalVisible} onHide={() => setEditModalVisible(false)}>
              <Modal.Header closeButton>
                <Modal.Title>Kitap Ekle</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group controlId="formExamName">
                    <Form.Label>Kitap Adı</Form.Label>
                    <Form.Control
                      value={editForm.name}
                      type="text"
                      placeholder="Kitap Adı"
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
                <Button variant="primary" onClick={handleEditExam}>
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
