'use client'

import { FC } from 'react'

import { SearchInput } from '@/app/components/form'
import { EmptyList } from '@/app/components'
import { IPatient, IVisitWindow } from '@/types/api'
import { TableTh } from '@/app/components/table'
import { useSearch } from '@/app/hooks/useSearch'
import PatientsTableRow from './components/PatientsTableRow'
import CreatePatientDialog from '../CreatePatientDialog'

interface PatientsTableProps {
  patients?: IPatient[]
  visitWindows?: IVisitWindow[]
  trailId: string
  authToken: string
}

const PatientsTable: FC<PatientsTableProps> = (props) => {
  const { patients, visitWindows, trailId, authToken } = props

  const {
    searchValue,
    handleChangeSearchInputValue,
    searchedItems: searchedPatients,
    isSearchActive,
    handleClearValue,
  } = useSearch<IPatient>(patients || [], {
    fuseOptions: {
      keys: ['patient_number'],
      threshold: 0.32,
    },
    customFormatFn: (value) => {
      const trimmedValue = value.trim()
      return trimmedValue.startsWith('#') ? trimmedValue.slice(1) : trimmedValue
    },
  })

  const patientsToDisplay = isSearchActive ? searchedPatients : patients

  return (
    <div className="mt-6 grid gap-4">
      <div className="flex justify-between gap-x-4">
        <SearchInput
          placeholder="Search for patient..."
          classNameGroup="w-72"
          value={searchValue}
          onChange={handleChangeSearchInputValue}
          onClearValue={handleClearValue}
        />

        <CreatePatientDialog
          visitWindows={visitWindows}
          trailId={trailId}
          authToken={authToken}
        />
      </div>

      {patientsToDisplay?.length ? (
        <div className="overflow-x-auto">
          <table className="table-last-cell-full table border-separate border-spacing-0 rounded-lg border border-neutral-100 bg-white pb-1">
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
          iconName={isSearchActive ? 'icon-search' : ''}
          heading={isSearchActive ? 'No patients found' : 'No patients yet'}
          description={
            isSearchActive
              ? "It seems like we couldn't find anything based on your search query."
              : "It is the best time to add patient. Click the 'Add patient' button to get started."
          }
        />
      )}
    </div>
  )
}

export default PatientsTable
