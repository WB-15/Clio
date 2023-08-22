'use client'

import { FC } from 'react'

import { WrappedInput } from '@/app/components/form'
import { Button, EmptyList, Icon } from '@/app/components'
import { IPatient } from '@/types/api'
import { TableTd, TableTh } from '@/app/components/table'

interface PatientsTableProps {
  patients?: IPatient[]
}

const PatientsTable: FC<PatientsTableProps> = (props) => {
  const { patients } = props

  return (
    <div className="grid gap-4 pt-6">
      <div className="flex justify-between gap-x-4">
        <WrappedInput
          iconSlotLeft={<Icon name="icon-search" size={24} />}
          classNameGroup="w-72"
        />

        <Button
          variant="primary"
          iconSlotLeft={<Icon name="icon-plus" size={20} />}
        >
          Add patient
        </Button>
      </div>

      {patients?.length ? (
        <table className="w-full border-separate border-spacing-0 rounded-lg border border-neutral-100 bg-white px-2 pb-1 pt-2">
          <thead>
            <TableTh>Patient number</TableTh>
            <TableTh>Patient status</TableTh>
            <TableTh>Patient number</TableTh>
            <TableTh>Trial progress</TableTh>
            <TableTh>Next visits</TableTh>
            <TableTh />
          </thead>
          <tbody>
            <TableTd>test</TableTd>
            <TableTd>test</TableTd>
            <TableTd>test</TableTd>
            <TableTd>test</TableTd>
            <TableTd>test</TableTd>
            <TableTd>test</TableTd>
          </tbody>
        </table>
      ) : (
        <EmptyList
          heading="No patients yet"
          description="It is the best time to add patient.
Click the 'Add patient' button to get started."
        />
      )}
    </div>
  )
}

export default PatientsTable
