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

function UpdateModal(props: IProps) {
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

  const handleSubmit = () => {

    if (!title) {
      toast.error('Title is required');
      return;
    }
    if (!author) {
      toast.error('Author is required');
      return;
    }
    if (!content) {
      toast.error('Content is required');
      return;
    }

    // post api theo cach truyen thong
    fetch(`http://localhost:8000/blogs/${id}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title, author, content })
    }).then(res => res.json())
      .then(res => {
        if (res) {
          toast.success('Blog updated successfully');
          handleClose();
          // cho biết cần gọi lại api, lúc này chỗ nào có "link url" này sẽ tự động gọi lại api
          // cụ thể file src/app/page.tsx sẽ gọi lại api dòng 12
          mutate('http://localhost:8000/blogs');
        }
      });
  }

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
          <Modal.Title>Update a blog</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control type="email" placeholder="..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Author</Form.Label>
              <Form.Control type="email" placeholder="..."
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Content</Form.Label>
              <Form.Control as="textarea" rows={3}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleSubmit()}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UpdateModal;