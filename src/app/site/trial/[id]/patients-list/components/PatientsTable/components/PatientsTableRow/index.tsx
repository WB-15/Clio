import { FC } from 'react'
import { TableLinkTd, TableTd } from '@/app/components/table'
import { IPatient } from '@/types/api'
import { Badge, Icon, Progress, VisitTag } from '@/app/components'
import { buildUrl, getVariantFormStatus } from '@/utils'
import { RouteURLBase, RouteUrlSubPath } from '@/constants'

interface PatientsTableRowProps {
  patient: IPatient
}

const PatientsTableRow: FC<PatientsTableRowProps> = (props) => {
  const { patient } = props

  const progress =
    ((patient.completed_visits + patient.missed_visits) * 100) /
    patient.total_visits

  const patientUrl = buildUrl([
    RouteURLBase.SITE,
    RouteUrlSubPath.TRIAL,
    patient.trial_id,
    RouteUrlSubPath.PATIENTS_LIST,
    patient.patient_id,
    '/upcoming',
  ])

  return (
    <tr className="group cursor-pointer duration-300 ease-in-out hover:bg-neutral-50">
      <TableLinkTd url={patientUrl} className="text-neutral-900">
        <span className="text-neutral-400">#</span>
        {patient.patient_number}
      </TableLinkTd>
      <TableLinkTd url={patientUrl}>
        <Badge size="small" variant={getVariantFormStatus(patient.status)}>
          {patient.status.toUpperCase()}
        </Badge>
      </TableLinkTd>
      <TableLinkTd url={patientUrl}>
        <Progress
          variant={getVariantFormStatus(patient.status)}
          value={progress}
        />
      </TableLinkTd>
      <TableLinkTd url={patientUrl}>
        <VisitTag data={patient.next_visit_date} />
      </TableLinkTd>
      <TableTd align="right">
        <button
          type="button"
          className="-m-2 rotate-90 rounded p-2 duration-300 ease-in-out hocus:bg-neutral-50"
        >
          <Icon name="icon-more" size={20} />
        </button>
      </TableTd>
    </tr>
  )
}

export default PatientsTableRow
