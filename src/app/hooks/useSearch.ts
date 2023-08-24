'use client'

import { ChangeEvent, useEffect, useRef, useState, useTransition } from 'react'
import Fuse from 'fuse.js'

export const useSearch = <T>(
  items: T[],
  options?: {
    fuseOptions?: Fuse.IFuseOptions<T>
    searchOptions?: Fuse.FuseSearchOptions
    customFormatFn?: (value: string) => string
  }
) => {
  const { fuseOptions, searchOptions, customFormatFn } = options || {}

  const [searchValue, setSearchValue] = useState('')
  const [searchedItems, setSearchedItems] = useState<T[] | null>(null)
  const [, startTransition] = useTransition()

  const fuseRef = useRef<Fuse<T> | null>(null)

  useEffect(() => {
    fuseRef.current = new Fuse(items, {
      ...fuseOptions,
    })
  }, [items, JSON.stringify(fuseOptions)])

  const handleChangeSearchInputValue = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setSearchValue(value)

    const formattedValue = customFormatFn ? customFormatFn(value) : value
    const trimmedValue = formattedValue.trim()

    if (!trimmedValue) {
      setSearchedItems(null)
      return
    }

    startTransition(() => {
      if (!fuseRef.current) return

      const searchResults = fuseRef.current?.search(trimmedValue, searchOptions)
      setSearchedItems(searchResults?.map(({ item }) => item))
    })
  }

  const handleClearValue = () => {
    handleChangeSearchInputValue({
      target: { value: '' },
    } as ChangeEvent<HTMLInputElement>)
  }

  return {
    searchValue,
    searchedItems,
    isEmptySearchResult: searchValue && searchedItems && !searchedItems.length,
    isSearchActive: !!searchValue && !!searchedItems,
    handleChangeSearchInputValue,
    handleClearValue,
  }
}
