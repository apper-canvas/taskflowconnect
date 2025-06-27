import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate, useLocation } from 'react-router-dom'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'

const CategorySidebar = ({ categories, onAddCategory }) => {
  const navigate = useNavigate()
  const location = useLocation()
  
  const isActive = (path) => location.pathname === path

  const navigationItems = [
    { path: '/', label: 'All Tasks', icon: 'List', count: null },
    { path: '/status/pending', label: 'Pending', icon: 'Clock', count: null },
    { path: '/status/completed', label: 'Completed', icon: 'CheckCircle', count: null },
    { path: '/priority/high', label: 'High Priority', icon: 'AlertCircle', count: null },
  ]

  return (
    <div className="w-64 bg-surface border-r border-gray-200 h-full flex flex-col">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl p-2">
            <ApperIcon name="CheckSquare" className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-display font-bold text-gray-900">TaskFlow</h1>
            <p className="text-sm text-gray-500">Smart Task Management</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Navigation Items */}
        <div className="p-4">
          <div className="space-y-1">
            {navigationItems.map((item) => (
              <motion.button
                key={item.path}
                whileHover={{ x: 4 }}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(item.path)
                    ? 'bg-primary-100 text-primary-700 shadow-soft'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <ApperIcon name={item.icon} className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                {item.count !== null && (
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    isActive(item.path)
                      ? 'bg-primary-200 text-primary-800'
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {item.count}
                  </span>
                )}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Categories Section */}
        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
              Categories
            </h3>
            <Button
              variant="ghost"
              size="sm"
              icon="Plus"
              onClick={onAddCategory}
              className="text-gray-500 hover:text-primary-600"
            />
          </div>

          <div className="space-y-1">
            {categories.map((category) => (
              <motion.button
                key={category.Id}
                whileHover={{ x: 4 }}
                onClick={() => navigate(`/category/${category.Id}`)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(`/category/${category.Id}`)
                    ? 'bg-primary-100 text-primary-700 shadow-soft'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: category.color }}
                  />
                  <span>{category.name}</span>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  isActive(`/category/${category.Id}`)
                    ? 'bg-primary-200 text-primary-800'
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {category.taskCount}
                </span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CategorySidebar