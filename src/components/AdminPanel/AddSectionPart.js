import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useParams, useLocation } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addSectionPart, deleteSectionPart, getPartsbySection } from '../../services/apiService';

function AddSectionPart() {
  const { sectionId } = useParams();

  const location = useLocation();
  const { sectionName } = location.state;

  const [form, setForm] = useState({
    sectionId: sectionId,
    name: '',
    images: [],
    audio: '',
    coverImage: '',
  });
  const [sectionParts, setSectionParts] = useState([]);

  const fetchSectionParts = async () => {
    const response = await getPartsbySection(sectionId)
    setSectionParts(response);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await addSectionPart(form)
    if(response) {
      fetchSectionParts()
      toast.success('Bölüm eklendi');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value
    }));
  };

  const handleDelete = async (sectionPartId) => {
    const response = await deleteSectionPart(sectionPartId)
    if(response) fetchSectionParts()
  };

  const handleCoverImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm((prevForm) => ({
          ...prevForm,
          coverImage: reader.result
        }));
      }
      reader.readAsDataURL(file);
    };
  }

  const handleImageUpload = (e) => {
    const files = e.target.files;
    const filesArray = Array.from(files);

    const promises = filesArray.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          resolve(e.target.result);
        };
        reader.readAsDataURL(file);
      });
    });

    // Tüm base64 verilerini al ve state'i güncelle
    Promise.all(promises).then((base64Array) => {
      setForm((prevForm) => ({
        ...prevForm,
        images: base64Array
      }));
    });
  };

  useEffect(() => {
    fetchSectionParts();
  }, [sectionId]);

  return (
    <Container>
      <h2 className="my-4">Kitap Bölümü Ekle - {sectionName}</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>İsim</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Ses Yolu</Form.Label>
          <Form.Control
            type="text"
            name="audio"
            value={form.audio}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="image">
          <Form.Label>Kapak Fotoğrafı Ekle</Form.Label>
          <Form.Control type="file" accept="image/*" onChange={handleCoverImageUpload} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="image">
          <Form.Label>Fotoğraf Ekle</Form.Label>
          <Form.Control multiple type="file" accept="image/*" onChange={handleImageUpload} />
        </Form.Group>
        <Button variant="primary" type="submit" style={{marginTop: 20}}>
          Bölümü Ekle
        </Button>
      </Form>
      <ListGroup style={{marginTop: 50}}>
        {sectionParts.map((sectionPart, index) => (
          <Card key={sectionPart._id} className="mb-3">
            <Card.Header>{index + 1 + ") " + sectionPart.name}</Card.Header>
            {sectionPart.coverImage && (
              <Card.Img variant="top" src={sectionPart.coverImage} alt="Bölüm Fotoğrafı" />
            )}
            {sectionPart.audio && 
              <Card.Text>
                {sectionPart.audio}
              </Card.Text>
            }
            <Button variant="danger" onClick={() => handleDelete(sectionPart.id)}>Sil</Button>
          </Card>
        ))}
      </ListGroup>
      <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar={true} />
    </Container>
  );
}

export default AddSectionPart;
