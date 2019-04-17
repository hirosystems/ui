# Button

This is our button component. It can take any of the props that all of the primitive accept. See props.

### Example

```jsx
import { Button } from 'blockstack-ui'

const Component = (props) => (
  <>
    <Button>Label</Button>
  </>
)
```

### Props

```jsx
Button.propTypes = {
  outline: PropTypes.bool,
  invert: PropTypes.bool,
  size: PropTypes.oneOf(['small'])
}
```
