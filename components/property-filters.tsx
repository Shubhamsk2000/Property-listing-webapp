"use client"

import { useProperty } from "@/contexts/property-context"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"

export function PropertyFilters() {
  const { state, dispatch } = useProperty()

  const handleTypeChange = (type: string) => {
    dispatch({
      type: "SET_FILTERS",
      payload: { ...state.filters, type },
    })
  }

  const handleSearchChange = (search: string) => {
    dispatch({
      type: "SET_FILTERS",
      payload: { ...state.filters, search },
    })
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="Search properties..."
          value={state.filters.search}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>

      <Select value={state.filters.type} onValueChange={handleTypeChange}>
        <SelectTrigger className="w-full sm:w-48">
          <SelectValue placeholder="Filter by type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Types</SelectItem>
          <SelectItem value="apartment">Apartment</SelectItem>
          <SelectItem value="house">House</SelectItem>
          <SelectItem value="condo">Condo</SelectItem>
          <SelectItem value="townhouse">Townhouse</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
