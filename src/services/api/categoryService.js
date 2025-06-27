import categoriesData from '@/services/mockData/categories.json'
import { taskService } from './taskService.js'

let categories = [...categoriesData]

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const categoryService = {
  async getAll() {
    await delay(200)
    // Update task counts dynamically
    const tasks = await taskService.getAll()
    const updatedCategories = categories.map(category => ({
      ...category,
      taskCount: tasks.filter(task => task.category === category.name && !task.completed).length
    }))
    return updatedCategories
  },

  async getById(id) {
    await delay(150)
    const category = categories.find(c => c.Id === parseInt(id))
    if (!category) {
      throw new Error('Category not found')
    }
    return { ...category }
  },

  async create(categoryData) {
    await delay(200)
    const maxId = categories.length > 0 ? Math.max(...categories.map(c => c.Id)) : 0
    const newCategory = {
      ...categoryData,
      Id: maxId + 1,
      taskCount: 0
    }
    categories.push(newCategory)
    return { ...newCategory }
  },

  async update(id, categoryData) {
    await delay(200)
    const index = categories.findIndex(c => c.Id === parseInt(id))
    if (index === -1) {
      throw new Error('Category not found')
    }
    
    categories[index] = {
      ...categories[index],
      ...categoryData
    }
    
    return { ...categories[index] }
  },

  async delete(id) {
    await delay(200)
    const index = categories.findIndex(c => c.Id === parseInt(id))
    if (index === -1) {
      throw new Error('Category not found')
    }
    
    const deletedCategory = categories.splice(index, 1)[0]
    return { ...deletedCategory }
  }
}