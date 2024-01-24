import React, { useEffect, useState } from "react";
import { addLanguage, deleteLanguage, editLanguage, getLanguages } from "../../services/apiService";
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

export default function Languages() {
  const navigate = useNavigate();
  const [modalVisible, setModalVisible] = useState(false)
  const [editModalVisible, setEditModalVisible] = useState(false)
  const [languages, setLanguages] = useState([])
  const [form, setForm] = useState({
    label: '',
    value: ''
  })
  const [editForm, setEditForm] = useState({
    label: '',
    value: ''
  })
  const [editId, setEditID] = useState(null)

  useEffect(() => {
    fetchLanguages()
  }, [])

  const fetchLanguages = async () => {
    const languages = await getLanguages();
    setLanguages(languages)
  }

  const handleAddLanguage = async () => {
    const response = await addLanguage(form)
    if(response) fetchLanguages()
    setModalVisible(false)
  }

  const handleEditLanguage = async () => {
    const response = await editLanguage(editForm, editId)
    if(response) fetchLanguages()
    setEditModalVisible(false)
  }

  const handleDelete = async (id) => {
    const response = await deleteLanguage(id)
    if(response) fetchLanguages()
  }

  const handleEdit = (item) => {
    setEditForm({
      label: item.label,
      value: item.value,
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
                      Dil Ekle
                    </Button>
                    <Table className="mt-3" striped bordered hover>
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Dil adı</th>
                          <th>Dil Kısaltması</th>
                          <th>İşlemler</th>
                        </tr>
                      </thead>
                      <tbody>
                        {languages.map((item) => (
                          <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.label}</td>
                            <td>{item.value}</td>
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
                <Modal.Title>Dil Ekle</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group controlId="formLanguageName">
                    <Form.Label>Dil Adı</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Dil Adı"
                      onChange={(e) => setForm({
                        ...form,
                        label: e.target.value
                      })}
                    />
                  </Form.Group>
                  <Form.Group controlId="formLanguageName">
                    <Form.Label>Dil Kısaltması</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Dil Kısaltması"
                      onChange={(e) => setForm({
                        ...form,
                        value: e.target.value
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
                <Button variant="primary" onClick={handleAddLanguage}>
                  Ekle
                </Button>
              </Modal.Footer>
            </Modal>

            <Modal show={editModalVisible} onHide={() => setEditModalVisible(false)}>
              <Modal.Header closeButton>
                <Modal.Title>Dil Ekle</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group controlId="formLanguageName">
                    <Form.Label>Dil Adı</Form.Label>
                    <Form.Control
                      value={editForm.label}
                      type="text"
                      placeholder="Dil Adı"
                      onChange={(e) => setEditForm({
                        ...editForm,
                        label: e.target.value
                      })}
                    />
                  </Form.Group>
                  <Form.Group controlId="formLanguageName">
                    <Form.Label>Dil Kısaltması</Form.Label>
                    <Form.Control
                      value={editForm.value}
                      type="text"
                      placeholder="Dil Kısaltması"
                      onChange={(e) => setEditForm({
                        ...editForm,
                        value: e.target.value
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
                <Button variant="primary" onClick={handleEditLanguage}>
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
