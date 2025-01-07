// eventcontext
import EventProvider from '@/app/context/eventprovider'

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return <EventProvider>{children}</EventProvider>
}
