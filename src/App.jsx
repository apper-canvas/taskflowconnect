import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import TaskDashboard from '@/components/pages/TaskDashboard'

function App() {
  return (
    <div className="min-h-screen bg-background">
      <Routes>
        <Route path="/" element={<TaskDashboard />} />
        <Route path="/category/:categoryId" element={<TaskDashboard />} />
        <Route path="/priority/:priority" element={<TaskDashboard />} />
        <Route path="/status/:status" element={<TaskDashboard />} />
      </Routes>
      
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        style={{ zIndex: 9999 }}
      />
    </div>
  )
}

export default App