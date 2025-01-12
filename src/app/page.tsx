'use client'

import Link from 'next/link'
import app from '@/styles/app.module.css';
import app2 from '@/styles/app2.module.css';
import TablePage from '@/components/Table';
import { useEffect } from 'react';

export default function Home() {

  const fetchData = async() => {
    const res = await fetch('http://localhost:8000/blogs');
    const data = await res.json();
    console.log(data);
  }

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <div>
      <ul>
        <li className={app['red']}>
          <Link href="/facebook">
            <span className={app2['red']}>Facebook</span>
          </Link>
        </li>
        <li>
          <Link href="/youtube">Youtube</Link>
        </li>
        <li>
          <Link href="/tiktok">Tiktok</Link>
        </li>
      </ul>

      <TablePage />
    </div>
  )
}
