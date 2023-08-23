'use client'

import { FC } from 'react'

import { WrappedInput } from '@/app/components/form'
import { Button, EmptyList, Icon } from '@/app/components'
import { IPatient } from '@/types/api'
import { TableTh } from '@/app/components/table'
import { useSearch } from '@/app/hooks/useSearch'
import PatientsTableRow from './components/PatientsTableRow'

interface PatientsTableProps {
  patients?: IPatient[]
}

const PatientsTable: FC<PatientsTableProps> = (props) => {
  const { patients } = props

  const {
    searchValue,
    handleChangeSearchInputValue,
    searchedItems: searchedPatients,
    isSearchActive,
  } = useSearch<IPatient>(patients || [], {
    fuseOptions: {
      keys: ['patient_number'],
    },
  })

  const patientsToDisplay = isSearchActive ? searchedPatients : patients

  return (
    <div className="grid gap-4 pt-6">
      <div className="flex justify-between gap-x-4">
        <WrappedInput
          placeholder="Search for patient..."
          iconSlotLeft={<Icon name="icon-search" size={24} />}
          classNameGroup="w-72"
          value={searchValue}
          onChange={handleChangeSearchInputValue}
        />

        <Button
          variant="primary"
          iconSlotLeft={<Icon name="icon-plus" size={20} />}
        >
          Add patient
        </Button>
      </div>

      {patientsToDisplay?.length ? (
        <div className="overflow-x-auto">
          <table className="table border-separate border-spacing-0 rounded-lg border border-neutral-100 bg-white pb-1">
            <thead>
              <TableTh classNameInner="pr-14">Patient number</TableTh>
              <TableTh classNameInner="pr-14">Patient status</TableTh>
              <TableTh classNameInner="pr-14">Trial progress</TableTh>
              <TableTh>Next visit</TableTh>
              <TableTh classNameInner="text-neutral-50">.</TableTh>
            </thead>
            <tbody>
              {patientsToDisplay.map((patient) => (
                <PatientsTableRow key={patient.patient_id} patient={patient} />
              ))}
            </tbody>
          </table>
        </div>
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
