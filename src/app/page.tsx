
import Link from 'next/link'
import app from '@/styles/app.module.css';
import app2 from '@/styles/app2.module.css';

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'HomePage',
  description: 'Home page',
}

export default function Home() {

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
    </div>
  )
}
