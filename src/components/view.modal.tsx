import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import { mutate } from 'swr';


interface IProps {
  show: boolean;
  setShow: (value: boolean) => void;
  blog: IBlog | null;
  setBlog: (value: IBlog | null) => void;
}

function ViewModal(props: IProps) {
  const { show, setShow, blog, setBlog } = props;

  const [id, setId] = useState<number>(0);
  const [title, setTitle] = useState<string>('');
  const [author, setAuthor] = useState<string>('');
  const [content, setContent] = useState<string>('');


  const handleClose = () => {
    setBlog(null);
    setTitle('');
    setAuthor('');
    setContent('');
    setShow(false);
  }

  useEffect(() => {
    if (blog && blog.id) {
      setId(blog.id);
      setTitle(blog.title);
      setAuthor(blog.author);
      setContent(blog.content);
    }
  }, [blog])

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size='lg'
      >
        <Modal.Header closeButton>
          <Modal.Title>View a blog</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control type="email" placeholder="..."
                value={title}
                disabled
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Author</Form.Label>
              <Form.Control type="email" placeholder="..."
                value={author}
                disabled
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Content</Form.Label>
              <Form.Control as="textarea" rows={3}
                value={content}
                disabled
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ViewModal;