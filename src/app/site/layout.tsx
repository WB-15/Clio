import { Header } from '@/app/layoutComponents'

const SiteLayout = (props: any) => {
  const { children } = props

  return (
    <div className="min-w-[1024px]">
      <Header />
      {children}
    </div>
  )
}

export default SiteLayout
