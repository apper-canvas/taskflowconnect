import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import TaskCard from '@/components/molecules/TaskCard'
import Button from '@/components/atoms/Button'
import Empty from '@/components/ui/Empty'
import ApperIcon from '@/components/ApperIcon'

const TaskList = ({ 
  tasks, 
  onToggleComplete, 
  onEditTask, 
  onDeleteTask,
  onBulkComplete,
  onBulkDelete,
  emptyTitle,
  emptyDescription,
  onAddTask
}) => {
  const [selectedTasks, setSelectedTasks] = useState([])
  const [showBulkActions, setShowBulkActions] = useState(false)

  const handleSelectTask = (taskId) => {
    setSelectedTasks(prev => 
      prev.includes(taskId) 
        ? prev.filter(id => id !== taskId)
        : [...prev, taskId]
    )
  }

  const handleSelectAll = () => {
    if (selectedTasks.length === tasks.length) {
      setSelectedTasks([])
    } else {
      setSelectedTasks(tasks.map(task => task.Id))
    }
  }

  const handleBulkComplete = async () => {
    try {
      await onBulkComplete(selectedTasks)
      setSelectedTasks([])
      setShowBulkActions(false)
    } catch (error) {
      console.error('Failed to complete tasks:', error)
    }
  }

  const handleBulkDelete = async () => {
    if (window.confirm(`Are you sure you want to delete ${selectedTasks.length} tasks?`)) {
      try {
        await onBulkDelete(selectedTasks)
        setSelectedTasks([])
        setShowBulkActions(false)
      } catch (error) {
        console.error('Failed to delete tasks:', error)
      }
    }
  }

  if (tasks.length === 0) {
    return (
      <Empty
        title={emptyTitle}
        description={emptyDescription}
        onAction={onAddTask}
      />
    )
  }

  return (
    <div className="space-y-4">
      {/* Bulk Actions Bar */}
      <AnimatePresence>
        {selectedTasks.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-primary-50 border border-primary-200 rounded-xl p-4 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-primary-700">
                {selectedTasks.length} task{selectedTasks.length > 1 ? 's' : ''} selected
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSelectAll}
                className="text-primary-600 hover:text-primary-700"
              >
                {selectedTasks.length === tasks.length ? 'Deselect All' : 'Select All'}
              </Button>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                icon="Check"
                onClick={handleBulkComplete}
                className="text-success-600 hover:text-success-700"
              >
                Complete
              </Button>
              <Button
                variant="ghost"
                size="sm"
                icon="Trash2"
                onClick={handleBulkDelete}
                className="text-accent-600 hover:text-accent-700"
              >
                Delete
              </Button>
              <Button
                variant="ghost"
                size="sm"
                icon="X"
                onClick={() => {
                  setSelectedTasks([])
                  setShowBulkActions(false)
                }}
                className="text-gray-500 hover:text-gray-700"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Selection Mode */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500">
          {tasks.length} task{tasks.length > 1 ? 's' : ''}
        </span>
        
        <Button
          variant="ghost"
          size="sm"
          icon={showBulkActions ? "X" : "CheckSquare"}
          onClick={() => {
            setShowBulkActions(!showBulkActions)
            if (showBulkActions) {
              setSelectedTasks([])
            }
          }}
          className="text-gray-500 hover:text-gray-700"
        >
          {showBulkActions ? 'Cancel' : 'Select'}
        </Button>
      </div>

      {/* Task Cards */}
      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {tasks.map((task) => (
            <TaskCard
              key={task.Id}
              task={task}
              onToggleComplete={onToggleComplete}
              onEdit={onEditTask}
              onDelete={onDeleteTask}
              selected={selectedTasks.includes(task.Id)}
              onSelect={handleSelectTask}
              showSelection={showBulkActions}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default TaskList