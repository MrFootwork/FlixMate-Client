import { useState } from 'react'
import './TestPage.css'

import React from 'react'
import Modal from '../components/Modal'

function TestPage() {
  const [modalOpen, setModalOpen] = useState(false)

  function openModal() {
    setModalOpen(true)
  }

  function closeModal() {
    setModalOpen(false)
  }

  return (
    <div>
      <button onClick={openModal}>Open Modal</button>
      {modalOpen && (
        <Modal isOpen={modalOpen} close={closeModal}>
          <p>OPEN!!! 🎉</p>
        </Modal>
      )}
    </div>
  )
}

export default TestPage
