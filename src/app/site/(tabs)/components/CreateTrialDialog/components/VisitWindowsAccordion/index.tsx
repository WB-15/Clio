'use state'

/* eslint-disable react/no-array-index-key */

import React, { FC, useState } from 'react'
import * as Accordion from '@radix-ui/react-accordion'

import { Button, Icon, AccordionItem } from '@/app/components'
import WindowDetails from './components/WindowDetails'

interface VisitWindowsAccordionProps {}

const VisitWindowsAccordion: FC<VisitWindowsAccordionProps> = () => {
  const [visitWindowsCount, setVisitWindowsCount] = useState(1)

  return (
    <div className="grid gap-4">
      <h3 className="font-bold">Visit windows</h3>

      <Accordion.Root type="single" className="grid gap-4" collapsible>
        {Array.from({ length: visitWindowsCount }).map((_, i) => (
          <AccordionItem
            key={`Windows details-${i}`}
            value={`Windows details-${i}`}
            triggerChildren="Windows details"
          >
            <WindowDetails />
          </AccordionItem>
        ))}
      </Accordion.Root>

      <Button
        variant="outline"
        iconSlotLeft={<Icon name="icon-plus" size={24} />}
        className="justify-self-start"
        onClick={() => setVisitWindowsCount((prevState) => prevState + 1)}
      >
        Add visit window
      </Button>
    </div>
  )
}

export default VisitWindowsAccordion
