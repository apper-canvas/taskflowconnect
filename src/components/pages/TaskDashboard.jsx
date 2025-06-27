import React, { useState, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import { useTasks } from '@/hooks/useTasks'
import { useCategories } from '@/hooks/useCategories'
import { filterTasks, sortTasks, getTaskStats } from '@/utils/taskFilters'
import CategorySidebar from '@/components/molecules/CategorySidebar'
import TaskFilters from '@/components/organisms/TaskFilters'
import TaskList from '@/components/organisms/TaskList'
import TaskForm from '@/components/organisms/TaskForm'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import ApperIcon from '@/components/ApperIcon'

const TaskDashboard = () => {
  const { categoryId, priority, status } = useParams()
  
  // Hooks
  const { 
    tasks, 
    loading: tasksLoading, 
    error: tasksError,
    loadTasks,
    createTask,
    updateTask,
    deleteTask,
    toggleTaskComplete,
    bulkDeleteTasks,
    bulkCompleteTasks
  } = useTasks()
  
  const { 
    categories, 
    loading: categoriesLoading, 
    error: categoriesError,
    loadCategories,
    createCategory 
  } = useCategories()

  // Local state
  const [searchQuery, setSearchQuery] = useState('')
  const [priorityFilter, setPriorityFilter] = useState(priority || '')
  const [statusFilter, setStatusFilter] = useState(status || '')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [showTaskForm, setShowTaskForm] = useState(false)
  const [editingTask, setEditingTask] = useState(null)
  const [sortBy, setSortBy] = useState('dueDate')

  // Filter and sort tasks
  const filteredTasks = useMemo(() => {
    let filtered = filterTasks(tasks, {
      searchQuery,
      priority: priorityFilter,
      category: categoryId ? categories.find(c => c.Id === parseInt(categoryId))?.name : categoryFilter,
      status: statusFilter
    })
    
    return sortTasks(filtered, sortBy)
  }, [tasks, searchQuery, priorityFilter, categoryFilter, statusFilter, categoryId, categories, sortBy])

  // Task statistics
  const taskStats = useMemo(() => getTaskStats(filteredTasks), [filteredTasks])

  // Loading state
  const loading = tasksLoading || categoriesLoading

  // Error state
  const error = tasksError || categoriesError

  // Handle task form submission
  const handleTaskSubmit = async (taskData) => {
    try {
      if (editingTask) {
        await updateTask(editingTask.Id, taskData)
        toast.success('Task updated successfully!')
      } else {
        await createTask(taskData)
        toast.success('Task created successfully!')
      }
      setShowTaskForm(false)
      setEditingTask(null)
    } catch (error) {
      toast.error(error.message)
    }
  }

  // Handle task edit
  const handleEditTask = (task) => {
    setEditingTask(task)
    setShowTaskForm(true)
  }

  // Handle task delete
  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId)
      toast.success('Task deleted successfully!')
    } catch (error) {
      toast.error(error.message)
    }
  }

  // Handle bulk operations
  const handleBulkComplete = async (taskIds) => {
    try {
      await bulkCompleteTasks(taskIds)
      toast.success(`${taskIds.length} tasks completed!`)
    } catch (error) {
      toast.error(error.message)
    }
  }

  const handleBulkDelete = async (taskIds) => {
    try {
      await bulkDeleteTasks(taskIds)
      toast.success(`${taskIds.length} tasks deleted!`)
    } catch (error) {
      toast.error(error.message)
    }
  }

  // Clear all filters
  const handleClearFilters = () => {
    setSearchQuery('')
    setPriorityFilter('')
    setStatusFilter('')
    setCategoryFilter('')
  }

  // Check if any filters are active
  const hasActiveFilters = searchQuery || priorityFilter || statusFilter || categoryFilter

  // Get page title
  const getPageTitle = () => {
    if (categoryId) {
      const category = categories.find(c => c.Id === parseInt(categoryId))
      return category ? `${category.name} Tasks` : 'Category Tasks'
    }
    if (priority) return `${priority.charAt(0).toUpperCase() + priority.slice(1)} Priority Tasks`
    if (status === 'completed') return 'Completed Tasks'
    if (status === 'pending') return 'Pending Tasks'
    return 'All Tasks'
  }

  const getEmptyStateConfig = () => {
    if (hasActiveFilters) {
      return {
        title: "No tasks found",
        description: "No tasks match your current filters. Try adjusting your search or filter criteria.",
        icon: "Search"
      }
    }
    
    if (status === 'completed') {
      return {
        title: "No completed tasks",
        description: "Complete some tasks to see them here. Mark tasks as done to track your progress.",
        icon: "CheckCircle"
      }
    }
    
    if (priority === 'high') {
      return {
        title: "No high priority tasks",
        description: "Great! You don't have any high priority tasks at the moment.",
        icon: "AlertCircle"
      }
    }
    
    return {
      title: "No tasks yet",
      description: "Create your first task to get started with organizing your day.",
      icon: "CheckSquare"
    }
  }

  if (loading) return <Loading />
  if (error) return <Error error={error} onRetry={() => { loadTasks(); loadCategories(); }} />

  const emptyConfig = getEmptyStateConfig()

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <CategorySidebar 
        categories={categories}
        onAddCategory={() => {
          // TODO: Implement add category modal
          toast.info('Add category feature coming soon!')
        }}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-surface border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-display font-bold text-gray-900">
                {getPageTitle()}
              </h1>
              <div className="flex items-center gap-6 mt-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <ApperIcon name="ListTodo" className="w-4 h-4" />
                  <span>{taskStats.total} total</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-success-600">
                  <ApperIcon name="CheckCircle" className="w-4 h-4" />
                  <span>{taskStats.completed} completed</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-warning-600">
                  <ApperIcon name="Clock" className="w-4 h-4" />
                  <span>{taskStats.pending} pending</span>
                </div>
                {taskStats.overdue > 0 && (
                  <div className="flex items-center gap-2 text-sm text-accent-600">
                    <ApperIcon name="AlertTriangle" className="w-4 h-4" />
                    <span>{taskStats.overdue} overdue</span>
                  </div>
                )}
              </div>
            </div>

            {/* Completion Rate */}
            <div className="text-right">
              <div className="text-2xl font-bold text-primary-600">
                {taskStats.completionRate}%
              </div>
              <div className="text-sm text-gray-500">Completion Rate</div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto">
            <TaskFilters
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              priorityFilter={priorityFilter}
              onPriorityFilterChange={setPriorityFilter}
              statusFilter={statusFilter}
              onStatusFilterChange={setStatusFilter}
              categoryFilter={categoryFilter}
              onCategoryFilterChange={setCategoryFilter}
              categories={categories}
              onAddTask={() => setShowTaskForm(true)}
              onClearFilters={handleClearFilters}
              hasActiveFilters={hasActiveFilters}
            />

            <TaskList
              tasks={filteredTasks}
              onToggleComplete={toggleTaskComplete}
              onEditTask={handleEditTask}
              onDeleteTask={handleDeleteTask}
              onBulkComplete={handleBulkComplete}
              onBulkDelete={handleBulkDelete}
              emptyTitle={emptyConfig.title}
              emptyDescription={emptyConfig.description}
              onAddTask={() => setShowTaskForm(true)}
            />
          </div>
        </div>
      </div>

      {/* Task Form Modal */}
      {showTaskForm && (
        <TaskForm
          task={editingTask}
          categories={categories}
          onSubmit={handleTaskSubmit}
          onCancel={() => {
            setShowTaskForm(false)
            setEditingTask(null)
          }}
        />
      )}
    </div>
  )
}

export default TaskDashboard