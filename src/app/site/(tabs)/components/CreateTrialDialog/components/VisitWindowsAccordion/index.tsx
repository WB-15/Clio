'use state'

import React, { FC } from 'react'
import * as Accordion from '@radix-ui/react-accordion'
import {
  Control,
  useFieldArray,
  UseFormGetValues,
  UseFormRegister,
  UseFormWatch,
} from 'react-hook-form'
import { z } from 'zod'

import { Button, Icon, AccordionItem } from '@/app/components'
import { trialSchema } from '@/utils/zod'
import { IUIDropdownItem } from '@/types'

import WindowDetails from './components/WindowDetails'

interface VisitWindowsAccordionProps {
  watch: UseFormWatch<z.input<typeof trialSchema>>
  register: UseFormRegister<z.input<typeof trialSchema>>
  getValues: UseFormGetValues<z.input<typeof trialSchema>>
  control: Control<any>
  errors: any
}

const dropdownEventKeys = {
  DUPLICATE: 'duplicate',
  DELETE: 'delete',
}

const VisitWindowsAccordion: FC<VisitWindowsAccordionProps> = (props) => {
  const { register, control, watch, getValues, errors } = props

  const { fields, append, insert, remove } = useFieldArray({
    control,
    name: 'visit_windows',
  })

  const dropdownItems: IUIDropdownItem[] = [
    {
      eventKey: dropdownEventKeys.DUPLICATE,
      iconName: 'icon-duplicate',
      text: 'Duplicate window',
    },
    {
      eventKey: dropdownEventKeys.DELETE,
      iconName: 'icon-delete',
      text: 'Delete window',
      variant: 'danger',
    },
  ]

  const handleDropdownSelect = (event: string, eventIndex: number) => {
    const [
      name,
      visitDay,
      separateVisitWindow,
      windowBeforeDays,
      windowAfterDays,
      windowBuffer,
      durationMinutes,
      visitType,
      fasting,
    ] = getValues([
      `visit_windows.${eventIndex}.name`,
      `visit_windows.${eventIndex}.visit_day`,
      `visit_windows.${eventIndex}.separate_visit_window`,
      `visit_windows.${eventIndex}.window_before_days`,
      `visit_windows.${eventIndex}.window_after_days`,
      `visit_windows.${eventIndex}.window_buffer`,
      `visit_windows.${eventIndex}.duration_minutes`,
      `visit_windows.${eventIndex}.visit_type`,
      `visit_windows.${eventIndex}.fasting`,
    ])

    switch (event) {
      case dropdownEventKeys.DUPLICATE:
        insert(eventIndex + 1, {
          name,
          visit_day: visitDay,
          separate_visit_window: separateVisitWindow,
          window_before_days: windowBeforeDays,
          window_after_days: windowAfterDays,
          duration_minutes: durationMinutes,
          visit_type: visitType,
          window_buffer: windowBuffer,
          fasting,
        })
        break
      case dropdownEventKeys.DELETE:
        remove(eventIndex)
        break
      default:
    }
  }

  return (
    <div className="grid gap-4">
      <h3 className="px-6 font-bold">Visit windows</h3>

      <Accordion.Root type="single" className="grid gap-4" collapsible>
        {fields.map((field, i) => {
          const watchVisitName = watch(`visit_windows.${i}.name`)
          const watchVisitDay = watch(`visit_windows.${i}.visit_day`)
          const isVisitWindowSeparate = watch(
            `visit_windows.${i}.separate_visit_window`
          )
          const watchBuffer = watch(`visit_windows.${i}.window_buffer`)
          const watchBeforeDays = watch(`visit_windows.${i}.window_before_days`)
          const watchAfterDays = watch(`visit_windows.${i}.window_after_days`)

          const errorsCount = Object.keys(
            errors?.visit_windows?.[i] || {}
          ).length

          const badges = [
            {
              key: `visit_day-${i}`,
              children: watchVisitDay && (
                <>
                  Day: <span className="font-medium">{watchVisitDay}</span>
                </>
              ),
            },
            {
              key: `window_before_after_days-${i}`,
              // eslint-disable-next-line no-nested-ternary
              children: isVisitWindowSeparate
                ? (watchBeforeDays || watchAfterDays) && (
                    <>
                      Window:{' '}
                      <span className="font-medium">
                        {`${watchBeforeDays || 0}/${watchAfterDays || 0}`}
                      </span>
                    </>
                  )
                : watchBuffer && (
                    <>
                      Window:{' '}
                      <span className="font-medium">
                        {`${watchBuffer || 0}/${watchBuffer || 0}`}
                      </span>
                    </>
                  ),
            },
            {
              key: `errors`,
              variant: 'danger' as const,
              children: errorsCount && `Error(s): ${errorsCount}`,
            },
          ].filter(({ children }) => children)

          return (
            <AccordionItem
              key={field.id}
              value={field.id}
              triggerChildren={watchVisitName || 'Windows details'}
              contentClassName="px-6"
              headerClassName="px-6"
              badges={badges}
              dropdownProps={{
                onSelect: (eventKey) => handleDropdownSelect(eventKey, i),
                triggerContent: (
                  <div className="rounded-lg border border-white bg-white p-px group-hocus:border-neutral-100 group-hocus:bg-neutral-50">
                    <Icon name="icon-more" size={24} />
                  </div>
                ),
                dropdownTriggerProps: { className: 'group px-1 pb-4' },
                dropdownMenuProps: { align: 'end', sideOffset: -4 },
                dropdownItems,
              }}
              className="relative border-none after:absolute after:bottom-0 after:left-6 after:right-6 after:block after:h-px after:bg-neutral-200"
            >
              <WindowDetails
                index={i}
                register={register}
                control={control}
                watch={watch}
                errors={errors}
              />
            </AccordionItem>
          )
        })}
      </Accordion.Root>

      <Button
        variant="outline"
        iconSlotLeft={<Icon name="icon-plus" size={24} />}
        className="mx-6 justify-self-start"
        onClick={() => append({})}
      >
        Add visit window
      </Button>
    </div>
  )
}

export default VisitWindowsAccordion
