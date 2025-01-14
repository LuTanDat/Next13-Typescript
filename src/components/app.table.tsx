"use client";
import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";
import { useState } from "react";
import CreateModal from "./create.modal";
import UpdateModal from "./update.modal";
import ViewModal from "./view.modal";
import DeleteModal from "./delete.modal";

interface IProps {
  blogs: IBlog[];
}

const TablePage = (props: IProps) => {
  const { blogs } = props;

  const [blog, setBlog] = useState<IBlog | null>(null); // blog user clicked on
  const [showModalCreate, setShowModalCreate] = useState<boolean>(false);
  const [showModalUpdate, setShowModalUpdate] = useState<boolean>(false);
  const [showModalView, setShowModalView] = useState<boolean>(false);
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);


  const handleShowBlog = (type: string, blog: IBlog) => {
    if (type === "VIEW") {
      setBlog(blog);
      setShowModalView(true);
    }

    if (type === "EDIT") {
      setBlog(blog);
      setShowModalUpdate(true);
    }

    if (type === "DELETE") {
      setBlog(blog);
      setShowModalDelete(true);
    }
  }

  return (
    <>
      <div className="mt-3 mb-2" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h3>Table Blogs</h3>
        <Button variant="secondary" onClick={() => setShowModalCreate(true)}>Add New</Button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>No</th>
            <th>Title</th>
            <th>Author</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {blogs && blogs.length > 0 &&
            blogs.map((blog) => {
              return (
                <tr key={blog.id}>
                  <td>{blog.id}</td>
                  <td>{blog.title}</td>
                  <td>{blog.author}</td>
                  <td>
                    <Button
                      variant="primary"
                      onClick={() => handleShowBlog('VIEW', blog)}
                    >
                      View
                    </Button>
                    <Button
                      variant="warning" className="mx-3"
                      onClick={() => handleShowBlog('EDIT', blog)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleShowBlog('DELETE', blog)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      <CreateModal
        show={showModalCreate}
        setShow={setShowModalCreate}
      />
      <ViewModal
        show={showModalView}
        setShow={setShowModalView}
        blog={blog}
        setBlog={setBlog}
      />
      <UpdateModal
        show={showModalUpdate}
        setShow={setShowModalUpdate}
        blog={blog}
        setBlog={setBlog}
      />
      <DeleteModal
        show={showModalDelete}
        setShow={setShowModalDelete}
        blog={blog}
        setBlog={setBlog}
      />
    </>
  );
};

export default TablePage;