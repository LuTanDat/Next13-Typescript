
export const metadata = {
  title: 'Blog Lists',
  description: 'Blog Lists',
}

export default function BlogsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
    </>
  )
}
