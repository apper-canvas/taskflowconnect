import React from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const Checkbox = ({ 
  checked = false, 
  onChange, 
  disabled = false,
  size = 'md',
  className = '',
  ...props 
}) => {
  const sizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  }
  
  const iconSizes = {
    sm: "w-3 h-3",
    md: "w-3.5 h-3.5",
    lg: "w-4 h-4",
  }

  return (
    <motion.button
      type="button"
      whileHover={!disabled ? { scale: 1.05 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      onClick={() => !disabled && onChange && onChange(!checked)}
      className={`
        ${sizes[size]} 
        rounded border-2 transition-all duration-200 
        flex items-center justify-center
        ${checked 
          ? 'bg-primary-500 border-primary-500 text-white shadow-glow' 
          : 'bg-white border-gray-300 hover:border-primary-400'
        }
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
      disabled={disabled}
      {...props}
    >
      {checked && (
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", duration: 0.3 }}
        >
          <ApperIcon name="Check" className={iconSizes[size]} />
        </motion.div>
      )}
    </motion.button>
  )
}

export default Checkbox