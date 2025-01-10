export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return <section className='mb-5 min-h-screen'>{children}</section>
}
