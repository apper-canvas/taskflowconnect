import React from 'react'
import Input from '@/components/atoms/Input'

const SearchBar = ({ 
  value, 
  onChange, 
  placeholder = "Search tasks...",
  className = '',
  ...props 
}) => {
  return (
    <Input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      icon="Search"
      iconPosition="left"
      className={`bg-white border-gray-200 hover:border-gray-300 focus:border-primary-500 ${className}`}
      {...props}
    />
  )
}

export default SearchBar