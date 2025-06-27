import React from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const Empty = ({ 
  title = "No tasks yet", 
  description = "Create your first task to get started with organizing your day.",
  actionText = "Add Task",
  onAction,
  icon = "CheckSquare"
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center py-16 px-4 text-center"
    >
      <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-full p-6 mb-6">
        <ApperIcon name={icon} className="w-12 h-12 text-primary-500" />
      </div>
      
      <h3 className="text-2xl font-display font-semibold text-gray-900 mb-3">
        {title}
      </h3>
      
      <p className="text-gray-600 mb-8 max-w-md leading-relaxed">
        {description}
      </p>
      
      {onAction && (
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: "0 8px 25px rgba(91, 76, 255, 0.25)" }}
          whileTap={{ scale: 0.95 }}
          onClick={onAction}
          className="bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white font-medium px-6 py-3 rounded-xl shadow-soft transition-all duration-200 flex items-center gap-2"
        >
          <ApperIcon name="Plus" className="w-5 h-5" />
          {actionText}
        </motion.button>
      )}
    </motion.div>
  )
}

export default Empty