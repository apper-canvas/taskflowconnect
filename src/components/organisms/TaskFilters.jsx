import React from 'react'
import SearchBar from '@/components/molecules/SearchBar'
import FilterDropdown from '@/components/molecules/FilterDropdown'
import Button from '@/components/atoms/Button'

const TaskFilters = ({ 
  searchQuery, 
  onSearchChange,
  priorityFilter,
  onPriorityFilterChange,
  statusFilter,
  onStatusFilterChange,
  categoryFilter,
  onCategoryFilterChange,
  categories,
  onAddTask,
  onClearFilters,
  hasActiveFilters
}) => {
  const priorityOptions = [
    { value: '', label: 'All Priorities' },
    { value: 'high', label: 'High Priority' },
    { value: 'medium', label: 'Medium Priority' },
    { value: 'low', label: 'Low Priority' },
  ]

  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'pending', label: 'Pending' },
    { value: 'completed', label: 'Completed' },
  ]

  const categoryOptions = [
    { value: '', label: 'All Categories' },
    ...categories.map(category => ({
      value: category.name,
      label: category.name,
    }))
  ]

  return (
    <div className="bg-surface rounded-xl p-6 shadow-soft mb-6">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search Bar */}
        <div className="flex-1">
          <SearchBar
            value={searchQuery}
            onChange={onSearchChange}
            placeholder="Search tasks by title or description..."
          />
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 lg:w-auto">
          <FilterDropdown
            value={statusFilter}
            onChange={onStatusFilterChange}
            options={statusOptions}
            placeholder="Status"
            className="w-full sm:w-32"
          />
          
          <FilterDropdown
            value={priorityFilter}
            onChange={onPriorityFilterChange}
            options={priorityOptions}
            placeholder="Priority"
            className="w-full sm:w-32"
          />
          
          <FilterDropdown
            value={categoryFilter}
            onChange={onCategoryFilterChange}
            options={categoryOptions}
            placeholder="Category"
            className="w-full sm:w-32"
          />

          {/* Action Buttons */}
          <div className="flex gap-2">
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="md"
                icon="X"
                onClick={onClearFilters}
                className="text-gray-500 hover:text-gray-700"
              >
                Clear
              </Button>
            )}
            
            <Button
              variant="primary"
              size="md"
              icon="Plus"
              onClick={onAddTask}
              className="whitespace-nowrap"
            >
              Add Task
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TaskFilters