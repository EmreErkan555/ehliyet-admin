import React, { useState } from "react";
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

const AdminPanel = () => {
  // Örnek veri
  const [users, setUsers] = useState([
    { id: 1, name: "Admin", role: "Admin" },
    { id: 2, name: "User 1", role: "User" },
    // Diğer kullanıcılar
  ]);

  const [roles, setRoles] = useState(["Admin", "User"]);

  const [showUserModal, setShowUserModal] = useState(false);
  const [userName, setUserName] = useState("");
  const [selectedRole, setSelectedRole] = useState("");

  const handleAddUser = () => {
    // Kullanıcı ekleme işlemleri burada gerçekleştirilebilir
    const newUser = {
      id: users.length + 1,
      name: userName,
      role: selectedRole,
    };
    setUsers([...users, newUser]);
    setShowUserModal(false);
  };

  return (
    <div style={{ flex: 1, height: '100vh', width: '100%' }}>
      <Row style={{ flex: 1, height: '100vh'}}>
        <Col sm={2} style={{ height: '100vh' }}>
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
                      onClick={() => setShowUserModal(true)}
                    >
                      Kullanıcı Ekle
                    </Button>
                    <Table className="mt-3" striped bordered hover>
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Adı</th>
                          <th>Rolü</th>
                          <th>İşlemler</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((user) => (
                          <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.role}</td>
                            <td>
                              <Button variant="info" size="sm">
                                Düzenle
                              </Button>{" "}
                              <Button variant="danger" size="sm">
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

            {/* Kullanıcı Ekle Modal */}
            <Modal show={showUserModal} onHide={() => setShowUserModal(false)}>
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
                      onChange={(e) => setUserName(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId="formUserRole">
                    <Form.Label>Rol</Form.Label>
                    <Form.Control
                      as="select"
                      onChange={(e) => setSelectedRole(e.target.value)}
                    >
                      {roles.map((role) => (
                        <option key={role}>{role}</option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="secondary"
                  onClick={() => setShowUserModal(false)}
                >
                  Kapat
                </Button>
                <Button variant="primary" onClick={handleAddUser}>
                  Ekle
                </Button>
              </Modal.Footer>
            </Modal>
          </Container>
        </Col>
      </Row>
    </div>
  );
};

export default AdminPanel;
