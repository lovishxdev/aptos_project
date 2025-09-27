import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Layout } from 'antd'
import Home from './pages/Home'
import './App.css'

const { Content } = Layout

function App() {
  return (
    <Layout>
      <Content>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Content>
    </Layout>
  )
}

export default App
