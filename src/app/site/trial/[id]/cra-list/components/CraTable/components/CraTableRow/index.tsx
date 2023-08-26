import { FC, useState } from 'react'
import { WrappedSwitch } from '@/app/components/form'
import { TableTd } from '@/app/components/table'

interface CraTableRowProps {
  cra: {
    fullName: string
    organization: string
    email: string
    access: boolean
  }
}

const CraTableRow: FC<CraTableRowProps> = (props) => {
  const {
    cra: { fullName, email, organization, access },
  } = props

  const [hasAccess, setHasAccess] = useState(access)

  return (
    <tr>
      <TableTd>{fullName}</TableTd>
      <TableTd>{organization}</TableTd>
      <TableTd>{email}</TableTd>
      <TableTd>
        <WrappedSwitch
          labelHeading={hasAccess ? 'Enable' : 'Disabled'}
          checked={hasAccess}
          onCheckedChange={setHasAccess}
        />
      </TableTd>
    </tr>
  )
}

export default CraTableRow
