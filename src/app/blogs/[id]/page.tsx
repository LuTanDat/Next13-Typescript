'use client'

import useSWR, { Fetcher } from 'swr';
import Form from 'react-bootstrap/Form';
import Link from "next/link";
import Card from 'react-bootstrap/Card';

const ViewDetailBlog = ({ params }: { params: { id: string } }) => {
  // console.log('id:', params.id);

  const fetcher: Fetcher<IBlog, string> = (url: string) => fetch(url).then(res => res.json()) // dinh nghia type "Fetcher<IBlog, string>" de no auto goi y code
  const { data, error, isLoading } = useSWR(
    `http://localhost:8000/blogs/${params.id}`,
    fetcher,
    // Mỗi lần re-render page này luôn gọi api để get blog mới nhất -> off đống dưới
    // {
    //   revalidateIfStale: false,
    //   revalidateOnFocus: false,
    //   revalidateOnReconnect: false
    // }
  )
  // console.log('>>> check data: ', data); // {}

  if (isLoading) return <div>Loading...</div>
  return (
    <>
      <div className='my-3'>
        <Link href='/blogs'>&lt;&lt; Go Back!</Link>
      </div>
      <Form>
        <fieldset className="border rounded-3 p-3">
          <legend className="float-none w-auto px-3">Blog Detail</legend>
          <Card className='text-center'>
            <Card.Header>Title: {data?.title}</Card.Header>
            <Card.Body>
              <Card.Text>
                Content: {data?.content}
              </Card.Text>
            </Card.Body>
            <Card.Footer>Author: {data?.author}</Card.Footer>
          </Card>
        </fieldset>
      </Form>
    </>
  )
}

export default ViewDetailBlog;