import { cloneElement } from 'react'

const WrapperList = ({ providers, children }) => {
  const renderProvider = (providers, children) => {
    const [provider, ...restProviders] = providers

    if (provider) {
      return cloneElement(
        provider,
        null,
        renderProvider(restProviders, children)
      )
    }

    return children
  }

  return renderProvider(providers, children)
}

export default WrapperList
