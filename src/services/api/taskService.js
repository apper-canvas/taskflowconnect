import tasksData from '@/services/mockData/tasks.json'

let tasks = [...tasksData]

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const taskService = {
  async getAll() {
    await delay(300)
    return [...tasks]
  },

  async getById(id) {
    await delay(200)
    const task = tasks.find(t => t.Id === parseInt(id))
    if (!task) {
      throw new Error('Task not found')
    }
    return { ...task }
  },

  async create(taskData) {
    await delay(250)
    const maxId = tasks.length > 0 ? Math.max(...tasks.map(t => t.Id)) : 0
    const newTask = {
      ...taskData,
      Id: maxId + 1,
      completed: false,
      createdAt: new Date().toISOString(),
      completedAt: null
    }
    tasks.push(newTask)
    return { ...newTask }
  },

  async update(id, taskData) {
    await delay(200)
    const index = tasks.findIndex(t => t.Id === parseInt(id))
    if (index === -1) {
      throw new Error('Task not found')
    }
    
    tasks[index] = {
      ...tasks[index],
      ...taskData
    }
    
    return { ...tasks[index] }
  },

  async delete(id) {
    await delay(200)
    const index = tasks.findIndex(t => t.Id === parseInt(id))
    if (index === -1) {
      throw new Error('Task not found')
    }
    
    const deletedTask = tasks.splice(index, 1)[0]
    return { ...deletedTask }
  },

  async toggleComplete(id) {
    await delay(200)
    const index = tasks.findIndex(t => t.Id === parseInt(id))
    if (index === -1) {
      throw new Error('Task not found')
    }
    
    const wasCompleted = tasks[index].completed
    tasks[index].completed = !wasCompleted
    tasks[index].completedAt = !wasCompleted ? new Date().toISOString() : null
    
    return { ...tasks[index] }
  },

  async bulkDelete(ids) {
    await delay(300)
    const deletedTasks = []
    
    ids.forEach(id => {
      const index = tasks.findIndex(t => t.Id === parseInt(id))
      if (index !== -1) {
        deletedTasks.push(tasks.splice(index, 1)[0])
      }
    })
    
    return deletedTasks
  },

  async bulkComplete(ids) {
    await delay(300)
    const updatedTasks = []
    
    ids.forEach(id => {
      const index = tasks.findIndex(t => t.Id === parseInt(id))
      if (index !== -1) {
        tasks[index].completed = true
        tasks[index].completedAt = new Date().toISOString()
        updatedTasks.push({ ...tasks[index] })
      }
    })
    
    return updatedTasks
  }
}