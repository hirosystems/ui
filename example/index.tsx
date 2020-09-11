import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Box, Text, Grid, Button, Flex, CSSReset } from '@stacks/ui';
import { theme } from '@stacks/ui-theme';
import { ThemeProvider } from '@emotion/react';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      {CSSReset}
      <Grid width="100%" height="100vh" placeItems="center">
        <Box>
          <Text as="h1" fontSize="36px" fontWeight="bold">
            @stacks/ui playground
          </Text>
          <Flex mt="extra-loose" justifyContent="center" mx="auto">
            <Button size="lg">Button</Button>
          </Flex>
        </Box>
      </Grid>
    </ThemeProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
