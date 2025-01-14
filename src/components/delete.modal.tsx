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

function DeleteModal(props: IProps) {
  const { show, setShow, blog, setBlog } = props;

  const [id, setId] = useState<number>(0);
  const [title, setTitle] = useState<string>('');


  const handleClose = () => {
    setBlog(null);
    setTitle('');
    setShow(false);
  }

  useEffect(() => {
    if (blog && blog.id) {
      setId(blog.id);
      setTitle(blog.title);
    }
  }, [blog])

  const handleSubmit = () => {

    // post api theo cach truyen thong
    fetch(`http://localhost:8000/blogs/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .then(res => {
        if (res) {
          toast.success('Blog deleted successfully');
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
      // size='lg'
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete a blog</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3 text-center">
              <Form.Label>Are you sure delete blog <b>{`${id} - ${title}`}</b>?</Form.Label>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleSubmit()}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteModal;