import { useState, useEffect } from 'react'
import { taskService } from '@/services/api/taskService'

export const useTasks = () => {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadTasks = async () => {
    try {
      setLoading(true)
      setError('')
      const data = await taskService.getAll()
      setTasks(data)
    } catch (err) {
      setError(err.message || 'Failed to load tasks')
    } finally {
      setLoading(false)
    }
  }

  const createTask = async (taskData) => {
    try {
      const newTask = await taskService.create(taskData)
      setTasks(prev => [newTask, ...prev])
      return newTask
    } catch (err) {
      throw new Error(err.message || 'Failed to create task')
    }
  }

  const updateTask = async (id, taskData) => {
    try {
      const updatedTask = await taskService.update(id, taskData)
      setTasks(prev => prev.map(task => 
        task.Id === parseInt(id) ? updatedTask : task
      ))
      return updatedTask
    } catch (err) {
      throw new Error(err.message || 'Failed to update task')
    }
  }

  const deleteTask = async (id) => {
    try {
      await taskService.delete(id)
      setTasks(prev => prev.filter(task => task.Id !== parseInt(id)))
    } catch (err) {
      throw new Error(err.message || 'Failed to delete task')
    }
  }

  const toggleTaskComplete = async (id) => {
    try {
      const updatedTask = await taskService.toggleComplete(id)
      setTasks(prev => prev.map(task => 
        task.Id === parseInt(id) ? updatedTask : task
      ))
      return updatedTask
    } catch (err) {
      throw new Error(err.message || 'Failed to update task')
    }
  }

  const bulkDeleteTasks = async (ids) => {
    try {
      await taskService.bulkDelete(ids)
      setTasks(prev => prev.filter(task => !ids.includes(task.Id)))
    } catch (err) {
      throw new Error(err.message || 'Failed to delete tasks')
    }
  }

  const bulkCompleteTasks = async (ids) => {
    try {
      const updatedTasks = await taskService.bulkComplete(ids)
      setTasks(prev => prev.map(task => {
        const updatedTask = updatedTasks.find(ut => ut.Id === task.Id)
        return updatedTask || task
      }))
    } catch (err) {
      throw new Error(err.message || 'Failed to complete tasks')
    }
  }

  useEffect(() => {
    loadTasks()
  }, [])

  return {
    tasks,
    loading,
    error,
    loadTasks,
    createTask,
    updateTask,
    deleteTask,
    toggleTaskComplete,
    bulkDeleteTasks,
    bulkCompleteTasks
  }
}