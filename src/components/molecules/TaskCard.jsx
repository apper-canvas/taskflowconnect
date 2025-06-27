import React from 'react'
import { motion } from 'framer-motion'
import { format, isToday, isPast, parseISO } from 'date-fns'
import { toast } from 'react-toastify'
import Checkbox from '@/components/atoms/Checkbox'
import Badge from '@/components/atoms/Badge'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'

const TaskCard = ({ 
  task, 
  onToggleComplete, 
  onEdit, 
  onDelete,
  selected = false,
  onSelect,
  showSelection = false 
}) => {
  const dueDate = task.dueDate ? parseISO(task.dueDate) : null
  const isOverdue = dueDate && isPast(dueDate) && !isToday(dueDate) && !task.completed
  const isDueToday = dueDate && isToday(dueDate)

  const handleToggleComplete = async () => {
    try {
      await onToggleComplete(task.Id)
      if (!task.completed) {
        toast.success('Task completed! 🎉', {
          position: "top-right",
          autoClose: 2000,
        })
      }
    } catch (error) {
      toast.error('Failed to update task')
    }
  }

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await onDelete(task.Id)
        toast.success('Task deleted')
      } catch (error) {
        toast.error('Failed to delete task')
      }
    }
  }

  const getDueDateDisplay = () => {
    if (!dueDate) return null
    
    if (isOverdue) {
      return (
        <span className="text-accent-600 text-sm font-medium flex items-center gap-1">
          <ApperIcon name="AlertCircle" className="w-3 h-3" />
          Overdue
        </span>
      )
    }
    
    if (isDueToday) {
      return (
        <span className="text-warning-600 text-sm font-medium flex items-center gap-1">
          <ApperIcon name="Clock" className="w-3 h-3" />
          Due today
        </span>
      )
    }
    
    return (
      <span className="text-gray-500 text-sm flex items-center gap-1">
        <ApperIcon name="Calendar" className="w-3 h-3" />
        {format(dueDate, 'MMM d')}
      </span>
    )
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -2 }}
      className={`task-card relative ${task.completed ? 'opacity-75' : ''} ${
        selected ? 'ring-2 ring-primary-500 ring-offset-2' : ''
      }`}
    >
      {showSelection && (
        <div className="absolute top-4 left-4">
          <Checkbox
            checked={selected}
            onChange={() => onSelect(task.Id)}
            size="sm"
          />
        </div>
      )}
      
      <div className={`flex items-start gap-3 ${showSelection ? 'ml-8' : ''}`}>
        <div className="flex-shrink-0 mt-1">
          <Checkbox
            checked={task.completed}
            onChange={handleToggleComplete}
            size="md"
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <h3 className={`font-medium text-gray-900 ${task.completed ? 'line-through text-gray-500' : ''}`}>
              {task.title}
            </h3>
            
            <div className="flex items-center gap-2 ml-4">
              <Badge variant={task.priority} size="sm">
                {task.priority}
              </Badge>
              
              {task.category && (
                <Badge variant="default" size="sm">
                  {task.category}
                </Badge>
              )}
            </div>
          </div>
          
          {task.description && (
            <p className={`text-sm mb-3 ${task.completed ? 'line-through text-gray-400' : 'text-gray-600'}`}>
              {task.description}
            </p>
          )}
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {getDueDateDisplay()}
            </div>
            
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                icon="Edit"
                onClick={() => onEdit(task)}
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              />
              <Button
                variant="ghost"
                size="sm"
                icon="Trash2"
                onClick={handleDelete}
                className="opacity-0 group-hover:opacity-100 transition-opacity text-accent-600 hover:text-accent-700"
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default TaskCard