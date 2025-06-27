import { isToday, isPast, parseISO } from 'date-fns'

export const filterTasks = (tasks, filters) => {
  const { 
    searchQuery = '', 
    priority = '', 
    category = '', 
    status = '',
    dueDate = '' 
  } = filters

  return tasks.filter(task => {
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      const matchesTitle = task.title.toLowerCase().includes(query)
      const matchesDescription = task.description?.toLowerCase().includes(query)
      if (!matchesTitle && !matchesDescription) return false
    }

    // Priority filter
    if (priority && task.priority !== priority) return false

    // Category filter
    if (category && task.category !== category) return false

    // Status filter
    if (status === 'completed' && !task.completed) return false
    if (status === 'pending' && task.completed) return false

    // Due date filter
    if (dueDate) {
      const taskDueDate = task.dueDate ? parseISO(task.dueDate) : null
      
      switch (dueDate) {
        case 'today':
          if (!taskDueDate || !isToday(taskDueDate)) return false
          break
        case 'overdue':
          if (!taskDueDate || !isPast(taskDueDate) || isToday(taskDueDate) || task.completed) return false
          break
        case 'upcoming':
          if (!taskDueDate || isPast(taskDueDate) || task.completed) return false
          break
        default:
          break
      }
    }

    return true
  })
}

export const sortTasks = (tasks, sortBy = 'dueDate') => {
  const sortedTasks = [...tasks]

  switch (sortBy) {
    case 'dueDate':
      return sortedTasks.sort((a, b) => {
        // Completed tasks go to bottom
        if (a.completed !== b.completed) {
          return a.completed ? 1 : -1
        }
        
        // Then sort by due date (null dates go to end)
        if (!a.dueDate && !b.dueDate) return 0
        if (!a.dueDate) return 1
        if (!b.dueDate) return -1
        
        return new Date(a.dueDate) - new Date(b.dueDate)
      })

case 'priority': {
      const priorityOrder = { high: 3, medium: 2, low: 1 }
      return sortedTasks.sort((a, b) => {
        if (a.completed !== b.completed) {
          return a.completed ? 1 : -1
        }
        return priorityOrder[b.priority] - priorityOrder[a.priority]
      })
    }

    case 'created':
      return sortedTasks.sort((a, b) => {
        if (a.completed !== b.completed) {
          return a.completed ? 1 : -1
        }
        return new Date(b.createdAt) - new Date(a.createdAt)
      })

    case 'alphabetical':
      return sortedTasks.sort((a, b) => {
        if (a.completed !== b.completed) {
          return a.completed ? 1 : -1
        }
        return a.title.localeCompare(b.title)
      })

    default:
      return sortedTasks
  }
}

export const getTaskStats = (tasks) => {
  const total = tasks.length
  const completed = tasks.filter(task => task.completed).length
  const pending = total - completed
  
  const overdue = tasks.filter(task => {
    if (task.completed || !task.dueDate) return false
    const dueDate = parseISO(task.dueDate)
    return isPast(dueDate) && !isToday(dueDate)
  }).length

  const dueToday = tasks.filter(task => {
    if (task.completed || !task.dueDate) return false
    const dueDate = parseISO(task.dueDate)
    return isToday(dueDate)
  }).length

  const highPriority = tasks.filter(task => 
    !task.completed && task.priority === 'high'
  ).length

  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0

  return {
    total,
    completed,
    pending,
    overdue,
    dueToday,
    highPriority,
    completionRate
  }
}