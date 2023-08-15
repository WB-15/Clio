import { Header } from '@/app/layoutComponents'

const SiteLayout = (props: any) => {
  const { children } = props

  return (
    <>
      <Header />
      {children}
    </>
  )
}

export default SiteLayout
