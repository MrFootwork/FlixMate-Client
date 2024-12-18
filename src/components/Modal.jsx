import './Modal.css'
import React from 'react'
import ReactModal from 'react-modal'

function Modal({ children, isOpen, close }) {
  return (
    <div>
      {/* BUG hook.js:608 Warning: react-modal: App element is not defined. Please use `Modal.setAppElement(el)` or set `appElement={el}`.  */}
      {/* FIXME Style it */}
      <ReactModal
        isOpen={Boolean(isOpen)}
        shouldCloseOnEsc={true}
        onRequestClose={close}
        style={{
          content: {
            width: '95%',
            maxWidth: '400px',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          },
        }}
      >
        {isOpen && children}
      </ReactModal>
    </div>
  )
}

export default Modal
