'use client'

import Link from 'next/link'
import app from '@/styles/app.module.css';
import app2 from '@/styles/app2.module.css';
import TablePage from '@/components/app.table';
import { useEffect } from 'react';
import useSWR from 'swr';

export default function Home() {

  const fetcher = (url: string) => fetch(url).then(res => res.json())

  const { data, error, isLoading } = useSWR(
    'http://localhost:8000/blogs',
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false
    }
  )

  // console.log('>>> check data: ' ,data); // [{}, {}, {}, {}, {}, {}, {},...]

  if (!data) return <div>Loading...</div>
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

      <TablePage blogs={data} />
    </div>
  )
}
