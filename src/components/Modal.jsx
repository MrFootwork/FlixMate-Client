import './Modal.css'
import React from 'react'
import ReactModal from 'react-modal'

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
ReactModal.setAppElement('#root')

const modalStyle = {
  content: {
    position: 'relative',
    backgroundColor: 'var(--color-background-off)',
    color: 'var(--color-text)',
    borderRadius: 'var(--border-round-l)',
    boxShadow: 'var(--shadow-l)',
  },
  overlay: {
    zIndex: 'var(--z-modal)',
    backgroundColor: `hsl(
      from var(--color-background) h s l / 0.4
    )`,
    backdropFilter: 'blur(4px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}

function Modal({ children, isOpen, close, cssOverwrite }) {
  return (
    <div>
      {/* BUG hook.js:608 Warning: react-modal: App element is not defined. Please use `Modal.setAppElement(el)` or set `appElement={el}`.  */}
      <ReactModal
        isOpen={Boolean(isOpen)}
        shouldCloseOnEsc={true}
        onRequestClose={close}
        style={{
          ...modalStyle,
          content: { ...modalStyle.content, ...cssOverwrite },
        }}
        className={`modal-container`}
      >
        {isOpen && children}
      </ReactModal>
    </div>
  )
}

export default Modal
