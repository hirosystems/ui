export interface ModalContextTypes {
  isOpen: boolean
  doOpenModal?: () => void
  doCloseModal?: () => void
}
export interface ModalProps {
  footerComponent?: React.ReactNode
  headerComponent?: React.ReactNode
}
export interface WrapperComponentProps {
  component?: React.ReactNode
}
