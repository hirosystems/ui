import React from 'react'
import { Box, Flex } from '../'
import { ModalContextTypes, ModalProps, WrapperComponentProps } from './types'

const ModalContext = React.createContext<ModalContextTypes>({
  isOpen: false
})

const useModalState = () => React.useContext(ModalContext)

const ModalContent: React.FC = ({ children, ...rest }) => (
  <Flex width="100%" height="100%" {...rest}>
    {children}
  </Flex>
)

const Header = ({ component }: WrapperComponentProps) =>
  component ? (
    <Box borderTopRightRadius="6px" borderTopLeftRadius="6px">
      {component}
    </Box>
  ) : null

const Footer = ({ component }: WrapperComponentProps) =>
  component ? (
    <Box borderBottomRightRadius="6px" borderBottomLeftRadius="6px">
      {component}
    </Box>
  ) : null

const Modal: React.FC<ModalProps> = ({
  footerComponent: FooterComponent = null,
  headerComponent: HeaderComponent = null,
  children
}) => {
  const { isOpen } = useModalState()
  return isOpen ? (
    <>
      <Flex
        position="fixed"
        size="100%"
        left={0}
        top={0}
        align={['flex-end', 'center']}
        justify="center"
        bg="rgba(0,0,0,0.48)"
        zIndex={99}
      >
        <Flex
          bg="white"
          direction="column"
          minWidth={['100%', '440px']}
          width="100%"
          maxWidth={['100%', '440px']}
          maxHeight={['100vh', 'calc(100vh - 48px)']}
          borderRadius={['unset', '6px']}
          boxShadow="high"
        >
          <Header component={HeaderComponent} />
          <Flex width="100%" p={[5, 8]} overflowY="auto" flexGrow={1} position="relative">
            <ModalContent>{children}</ModalContent>
          </Flex>
          <Footer component={FooterComponent} />
        </Flex>
      </Flex>
    </>
  ) : null
}

const ModalProvider: React.FC = props => {
  const [isOpen, setIsOpen] = React.useState(false)
  const doOpenModal = () => (!isOpen ? setIsOpen(true) : null)
  const doCloseModal = () => (isOpen ? setIsOpen(true) : null)
  return (
    <ModalContext.Provider
      value={{
        isOpen,
        doOpenModal,
        doCloseModal
      }}
    >
      {props.children}
    </ModalContext.Provider>
  )
}

export { ModalProvider, Modal, useModalState }
