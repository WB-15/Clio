'use client'

import { FC } from 'react'
import { TableTh } from '@/app/components/table'
import { SearchInput } from '@/app/components/form'
import { useSearch } from '@/app/hooks/useSearch'
import CraTableRow from './components/CraTableRow'
import { CRA_LIST_MOCK } from './mocks'

interface CraTableProps {}

const CraTable: FC<CraTableProps> = () => {
  const {
    searchValue,
    searchedItems: searchedCra,
    handleChangeSearchInputValue,
    handleClearValue,
    isSearchActive,
  } = useSearch(CRA_LIST_MOCK, {
    fuseOptions: {
      keys: ['fullName', 'organization', 'email'],
      threshold: 0.32,
    },
  })

  const craToDisplay = isSearchActive ? searchedCra : CRA_LIST_MOCK

  return (
    <div className="mt-6 grid gap-4">
      <SearchInput
        classNameGroup="w-72"
        placeholder="Search for CRA..."
        value={searchValue}
        onChange={handleChangeSearchInputValue}
        onClearValue={handleClearValue}
      />

      <div className="overflow-x-auto">
        <table className="table-first-cell-full table border-separate border-spacing-0 rounded-lg border border-neutral-100 bg-white pb-1">
          <thead>
            <TableTh>Full name</TableTh>
            <TableTh classNameInner="min-w-[280px]">Organization</TableTh>
            <TableTh classNameInner="min-w-[250px]">Email</TableTh>
            <TableTh classNameInner="min-w-[125px]">Trial Access</TableTh>
          </thead>
          <tbody>
            {craToDisplay &&
              craToDisplay.map((cra) => (
                <CraTableRow key={cra.fullName} cra={cra} />
              ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default CraTable
