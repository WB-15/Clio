'use state'

import React, { FC } from 'react'
import * as Accordion from '@radix-ui/react-accordion'
import {
  Control,
  useFieldArray,
  UseFormRegister,
  UseFormWatch,
} from 'react-hook-form'
import { z } from 'zod'

import { Button, Icon, AccordionItem } from '@/app/components'
import { createTrialSchema } from '@/utils/zod'
import WindowDetails from './components/WindowDetails'

interface VisitWindowsAccordionProps {
  watch: UseFormWatch<z.input<typeof createTrialSchema>>
  register: UseFormRegister<z.input<typeof createTrialSchema>>
  control: Control<any>
}

const VisitWindowsAccordion: FC<VisitWindowsAccordionProps> = (props) => {
  const { register, control, watch } = props

  const { fields, append } = useFieldArray({ control, name: 'visit_windows' })

  return (
    <div className="grid gap-4">
      <h3 className="px-6 font-bold">Visit windows</h3>

      <Accordion.Root type="single" className="grid gap-4" collapsible>
        {fields.map((field, i) => {
          const watchVisitName = watch(`visit_windows.${i}.name`)
          const watchVisitDay = watch(`visit_windows.${i}.visit_day`)
          const watchBeforeDays = watch(`visit_windows.${i}.window_before_days`)
          const watchAfterDays = watch(`visit_windows.${i}.window_after_days`)

          const badges = [
            {
              key: `visit_day-${i}`,
              value: watchVisitDay && (
                <>
                  Day: <span className="font-medium">{watchVisitDay}</span>
                </>
              ),
            },
            {
              key: `window_before_after_days-${i}`,
              value: (watchBeforeDays || watchAfterDays) && (
                <>
                  Window:{' '}
                  <span className="font-medium">
                    {/* {watchBeforeDays}/{watchAfterDays} */}
                    {+watchBeforeDays + +watchAfterDays}
                  </span>
                </>
              ),
            },
          ].filter(({ value }) => value)

          return (
            <AccordionItem
              key={field.id}
              value={field.id}
              triggerChildren={watchVisitName || 'Windows details'}
              contentClassName="px-6"
              headerClassName="px-6"
              badges={badges}
              className="relative border-none after:absolute after:bottom-0 after:left-6 after:right-6 after:block after:h-px after:bg-neutral-200"
            >
              <WindowDetails index={i} register={register} control={control} />
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
