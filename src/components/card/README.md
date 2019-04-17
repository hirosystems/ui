# Card

The card component is a styled `Flex` primitive.

### Example

```jsx
import { Card } from 'blockstack-ui'

const Component = (props) => (
  <>
    <Card>Card Content</Card>
  </>
)
```

### Props

This component can take all of the props that any primitive component can take. See styled system.

```jsx
Card.defaultProps = {
  border: 1,
  bg: 'white',
  p: 3,
  borderColor: 'blue.mid',
  borderRadius: 3,
  flexDirection: 'column',
  boxShadow: 'card'
}
```
