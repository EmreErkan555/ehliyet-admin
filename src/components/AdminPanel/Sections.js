import React, { useEffect, useState } from "react";
import { addSection, deleteSection, editSection, getSections } from "../../services/apiService";
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

export default function Sections() {
  const navigate = useNavigate();
  const [modalVisible, setModalVisible] = useState(false)
  const [editModalVisible, setEditModalVisible] = useState(false)
  const [sections, setSections] = useState([])
  const [form, setForm] = useState({
    name: '',
    image: ''
  })
  const [editForm, setEditForm] = useState({
    name: '',
    image: ''
  })
  const [editId, setEditID] = useState(null)

  useEffect(() => {
    fetchSections()
  }, [])

  const fetchSections = async () => {
    const sections = await getSections();
    setSections(sections)
  }

  const handleAddSection = async () => {
    const response = await addSection(form)
    if(response) fetchSections()
    setModalVisible(false)
  }

  const handleEditSection = async () => {
    const response = await editSection(editForm, editId)
    if(response) fetchSections()
    setEditModalVisible(false)
  }

  const handleDelete = async (id) => {
    const response = await deleteSection(id)
    if(response) fetchSections()
  }

  const handleEdit = (item) => {
    setEditForm({
      name: item.name,
    })
    setEditID(item.id)
    setEditModalVisible(true)
  }

  const handleImageUpload = async (e, isEdit) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if(isEdit){
          setEditForm((prevForm) => ({
            ...prevForm,
            image: reader.result
          }));
        }else{
          setForm((prevForm) => ({
            ...prevForm,
            image: reader.result
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
                      Kitap Ekle
                    </Button>
                    <Table className="mt-3" striped bordered hover>
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>İsim</th>
                          <th>Kapak Fotoğrafı</th>
                          <th>İşlemler</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sections.map((item) => (
                          
                          <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>
                              <img 
                                src={item.image} 
                                className="d-inline-block align-top"
                                alt="Image"
                                height='150'
                              />
                            </td>
                            <td>
                              <Button variant="info" size="sm" onClick={() => handleEdit(item)}>
                                Düzenle
                              </Button>{" "}
                              <Button variant="danger" size="sm" onClick={() => handleDelete(item.id)}>
                                Sil
                              </Button>{" "}
                              <Button variant="success" size="sm" onClick={() => navigate(`/addsectionpart/${item.id}`, { state: { sectionName: item.name } })}>
                                Bölüm Ekle
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
                  <Form.Group controlId="formSectionName">
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
                  <Form.Group controlId="image">
                    <Form.Label>Kapak Fotoğrafı Ekle</Form.Label>
                    <Form.Control type="file" accept="image/*" onChange={(e) => handleImageUpload(e, false)} />
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
                <Button variant="primary" onClick={handleAddSection}>
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
                  <Form.Group controlId="formSectionName">
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
                <Button variant="primary" onClick={handleEditSection}>
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
