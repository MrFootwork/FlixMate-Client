import React from 'react'
import { RotateLoader } from 'react-spinners'

function LoadingSpinner({ loading }) {
  return (
    <RotateLoader loading={loading} size={20} margin={10} color='#3a4b5b' />
  )
}

export default LoadingSpinner
