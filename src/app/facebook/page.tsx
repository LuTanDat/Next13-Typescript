'use client' // su dung event cua client
import { useRouter } from 'next/navigation'
import { Button } from 'react-bootstrap';

const Facebook = () => {
  const router = useRouter()

  const handleBtn = () => {
    router.push('/')
  }

  return (
    <div>
      Facebook
      <div>
        <Button variant="primary">Primary Button</Button>
        <button onClick={() => handleBtn()}>Back Home</button>
      </div>
    </div>
  )
}

export default Facebook;