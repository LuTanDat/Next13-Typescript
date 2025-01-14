"use client";
import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";
import { useState } from "react";
import CreateModal from "./create.modal";
import UpdateModal from "./update.modal";
import DeleteModal from "./delete.modal";
import Link from "next/link";
import { toast } from 'react-toastify';
import { mutate } from 'swr';

interface IProps {
  blogs: IBlog[];
}

const TablePage = (props: IProps) => {
  const { blogs } = props;

  const [blog, setBlog] = useState<IBlog | null>(null); // blog user clicked on
  const [showModalCreate, setShowModalCreate] = useState<boolean>(false);
  const [showModalUpdate, setShowModalUpdate] = useState<boolean>(false);
  // const [showModalDelete, setShowModalDelete] = useState<boolean>(false);


  const handleShowBlog = (type: string, blog: IBlog) => {
    if (type === "EDIT") {
      setBlog(blog);
      setShowModalUpdate(true);
    }

    // if (type === "DELETE") {
    //   setBlog(blog);
    //   setShowModalDelete(true);
    // }
  }

  const handleDeleteBlog = (id: number) => {
    if (confirm(`Are you sure delete blog: id = ${id}!`) == true) {
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
            // cho biết cần gọi lại api, lúc này chỗ nào có "link url" này sẽ tự động gọi lại api
            // cụ thể file src/app/page.tsx sẽ gọi lại api dòng 12
            mutate('http://localhost:8000/blogs');
          }
        });
    } else {
      console.log("You canceled!")
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
                    <Link
                      className="btn btn-primary"
                      href={`/blogs/${blog.id}`}
                    >
                      View
                    </Link>
                    <Button
                      variant="warning" className="mx-3"
                      onClick={() => handleShowBlog('EDIT', blog)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDeleteBlog(blog.id)}
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
      <UpdateModal
        show={showModalUpdate}
        setShow={setShowModalUpdate}
        blog={blog}
        setBlog={setBlog}
      />
      {/* <DeleteModal
        show={showModalDelete}
        setShow={setShowModalDelete}
        blog={blog}
        setBlog={setBlog}
      /> */}
    </>
  );
};

export default TablePage;