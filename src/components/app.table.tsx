"use client";
import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";

interface IProps {
  blogs: IBlog[];
}

const TablePage = (props: IProps) => {
  const { blogs } = props;
  // console.log("check blogs: ", blogs);

  return (
    <>
      <div className="mt-3 mb-2" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h3>Table Blogs</h3>
        <Button variant="secondary">Add New</Button>
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
                    <Button variant="primary">View</Button>
                    <Button variant="warning" className="mx-3">Edit</Button>
                    <Button variant="danger">Delete</Button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </>
  );
};

export default TablePage;