import { mergeMetadataWithDefault } from '@/utils/seo'
import CraTable from './components/CraTable'

export const metadata = mergeMetadataWithDefault({ title: 'CRA list' })

const TabCraList = () => {
  return <CraTable />
}

export default TabCraList
