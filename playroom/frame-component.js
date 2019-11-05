import React from 'react'
import { ThemeProvider, theme } from '@blockstack/ui'

export default ({ children }) => (
  <ThemeProvider theme={theme}>
    <React.Fragment>
      <style>{`html,body { margin: 0; }`}</style>
      {children}
      {console.log(children)}
    </React.Fragment>
  </ThemeProvider>
)
