import Link from 'next/link'
import app from '@/styles/app.module.css';
import app2 from '@/styles/app2.module.css';
import TablePage from '@/components/Table';

export default function Home() {
  return (
    <div>
      <ul>
        <li className={app['red']}>
          <Link href="/facebook">
            <span className={app2['red']}>Facebook</span>
          </Link>
          </li>
        <li><a href="/youtube">Youtube</a></li>
        <li><a href="/tiktok">Tiktok</a></li>
      </ul>

      <TablePage />
    </div>
  )
}
