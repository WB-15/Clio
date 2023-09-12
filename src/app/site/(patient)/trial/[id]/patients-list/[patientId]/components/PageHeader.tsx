'use client'

import Link from 'next/link'
import { FC, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Breadcrumb, Button, ButtonIcon, Icon } from '@/app/components'
import { PatientStatus, RouteURL } from '@/constants'
import { IPatient } from '@/types/api'
import { EditPatientForm } from './EditPatientForm'

interface PageHeaderProps {
  patientData?: IPatient
  id: string
}

export const PageHeader: FC<PageHeaderProps> = ({ patientData, id }) => {
  const [showEditForm, setShowEditForm] = useState<boolean>(false)
  const router = useRouter()

  const renderStatus = () => {
    switch (patientData?.status) {
      case PatientStatus.ACTIVE:
        return (
          <div className="flex h-5 items-center justify-center rounded-lg border border-solid border-green-100 bg-green-50 px-2 py-1 text-[12px] font-medium uppercase text-green-200">
            {patientData?.status}
          </div>
        )

      case PatientStatus.COMPLETED:
        return (
          <div className="flex h-5 items-center justify-center rounded-lg border border-solid border-neutral-200 bg-neutral-100 px-2 py-1 text-[12px] font-medium uppercase text-neutral-400">
            {patientData?.status}
          </div>
        )

      case PatientStatus.WITHDRAWN:
        return (
          <div className="flex h-5 items-center justify-center rounded-lg border border-solid border-red-300 bg-[#FBEFEF] px-2 py-1 text-[12px] font-medium uppercase text-red-300">
            {patientData?.status}
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="grid gap-y-4">
      <Breadcrumb
        breadcrumb={[
          { text: 'Trials', url: RouteURL.Site.TRIALS },
          {
            text: 'Trial Details',
            url: `${RouteURL.Site.TRIAL}/${id}/patients-list`,
          },
          {
            text: `${patientData?.first_name} ${patientData?.last_name}`,
            active: true,
          },
        ]}
      />
      {showEditForm ? (
        <EditPatientForm
          setShowEditForm={setShowEditForm}
          patientData={patientData}
          trialId={id}
          onSuccess={() => router.refresh()}
        />
      ) : (
        <div className="flex flex-col gap-2.5">
          <h4 className="-mb-2 text-sm font-medium text-neutral-900">
            <span className="text-sm text-neutral-400">#</span>
            {patientData?.patient_number}
          </h4>
          <div className="flex items-center gap-x-3">
            <ButtonIcon
              as={Link}
              href={`${RouteURL.Site.TRIAL}/${id}/patients-list`}
              iconName="icon-chevron_down"
              className="rotate-90"
              label="back"
            />
            <div className="flex flex-1 justify-between">
              <div className="flex items-center gap-3">
                {patientData?.first_name} {patientData?.last_name}
                {renderStatus()}
              </div>
              <Button
                iconSlotLeft={<Icon name="icon-note" size={20} />}
                variant="outline"
                onClick={() => setShowEditForm(true)}
              >
                Edit patient details
              </Button>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex gap-1.5">
              <Icon name="icon-phone" size={20} />
              <p className="text-sm">{patientData?.phone}</p>
            </div>
            <div className="flex gap-1.5">
              <Icon name="icon-mail" size={20} />
              <p className="text-sm">{patientData?.email}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
