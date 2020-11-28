// @ts-nocheck
import React from 'react';
import { getAddressFromPrivateKey, makeRandomPrivKey } from '@stacks/transactions';
import { Flex, Grid, Stack } from '@stacks/ui';
import { generateRandomName } from '@common/hooks/use-random-name';
import { DynamicColorCircle } from '@components/dynamic-color-circle';
import { Caption, Title } from '@components/typography';
import { getAssetNameParts, truncateMiddle } from '@common/utils';
import { getTicker } from '@components/tx-events';

const generateAddresses = (amount: number) => {
  const arr: string[] = [];
  const array = Array.from(Array(amount).keys());
  array.forEach(() => {
    const key = makeRandomPrivKey();
    const address = getAddressFromPrivateKey(new Buffer.from(key.data, 'hex'));
    const contractName = generateRandomName();
    const tokenName = generateRandomName();
    arr.push(`${address}.${contractName}::${tokenName}`);
  });
  return arr;
};

const generateContracts = (amount: number) => {
  const arr: string[] = [];
  const array = Array.from(Array(amount).keys());
  array.forEach(() => {
    const key = makeRandomPrivKey();
    const address = getAddressFromPrivateKey(new Buffer.from(key.data, 'hex'));
    const contractName = generateRandomName();
    arr.push(`${address}.${contractName}`);
  });
  return arr;
};
const generateIds = (amount: number) => {
  const arr: string[] = [];
  const array = Array.from(Array(amount).keys());
  array.forEach(() => {
    const name = generateRandomName();
    arr.push(`${name}.id.blockstack`);
  });
  return arr;
};

const Address = ({ address }) => {
  const { asset } = getAssetNameParts(address);
  return (
    <Flex px="base">
      <Flex alignItems="center">
        <DynamicColorCircle string={address}>{asset[0]}</DynamicColorCircle>
        <Stack spacing="tight">
          <Title display="block">{asset}</Title>
          <Caption display="block" textTransform="uppercase">
            {getTicker(asset)}
          </Caption>
        </Stack>
      </Flex>
    </Flex>
  );
};
const Identity = ({ value }) => {
  return (
    <Flex px="base">
      <Flex alignItems="center">
        <DynamicColorCircle string={value}>{value[0]}</DynamicColorCircle>
        <Stack spacing="tight">
          <Title display="block">{value.split('.')[0]}</Title>
          <Caption>{value.replace(`${value.split('.')[0]}.`, '')}</Caption>
        </Stack>
      </Flex>
    </Flex>
  );
};

const Contract = ({ value }) => {
  return (
    <Flex px="base">
      <Flex alignItems="center">
        <DynamicColorCircle string={value}>{value.split('.')[1][0]}</DynamicColorCircle>
        <Stack spacing="tight">
          <Title display="block">{value.split('.')[1]}</Title>
          <Caption>{truncateMiddle(value.replace(`.${value.split('.')[1]}`, ''))}</Caption>
        </Stack>
      </Flex>
    </Flex>
  );
};

const Single = ({ value }) => {
  return (
    <Flex px="base">
      <Flex alignItems="center">
        <DynamicColorCircle string={value}>{value[0]}</DynamicColorCircle>
        <Title display="block">{value}</Title>
      </Flex>
    </Flex>
  );
};

const Page = () => {
  const amount = 10;
  const [state, setState] = React.useState({
    loading: false,
    addresses: [],
    ids: [],
    contracts: [],
  });
  const setLoadingTrue = () => setState(s => ({ ...s, loading: true }));

  const handleGenerateNames = React.useCallback(() => {
    setLoadingTrue();
    const addresses = generateAddresses(amount);
    const ids = generateIds(amount);
    const contracts = generateContracts(amount);
    setState({
      loading: false,
      addresses,
      ids,
      contracts,
    });
  }, []);

  React.useEffect(() => {
    handleGenerateNames();
  }, []);

  return (
    <Grid
      minHeight="100vh"
      placeItems="center"
      gridTemplateColumns="repeat(auto-fill, minmax(350px, 1fr))"
    >
      <Stack spacing="base">
        <Title>Assets</Title>
        <Grid
          width="50%"
          gap="extra-loose"
          gridTemplateColumns="repeat( auto-fit, minmax(350px, 1fr) )"
        >
          {state.addresses.length
            ? state.addresses.map(address => {
                return <Address address={address} />;
              })
            : null}
        </Grid>
      </Stack>
      <Stack spacing="base">
        <Title>Usernames</Title>
        <Grid
          width="50%"
          gap="extra-loose"
          gridTemplateColumns="repeat( auto-fit, minmax(350px, 1fr) )"
        >
          {state.ids.length
            ? state.ids.map(id => {
                return <Identity value={id} />;
              })
            : null}
        </Grid>
      </Stack>

      <Stack spacing="base">
        <Title>Contracts</Title>
        <Grid
          width="50%"
          gap="extra-loose"
          gridTemplateColumns="repeat( auto-fit, minmax(350px, 1fr) )"
        >
          {state.contracts.length
            ? state.contracts.map(value => {
                return <Contract value={value} />;
              })
            : null}
        </Grid>
      </Stack>

      <Stack spacing="base">
        <Title>Single strings</Title>
        <Grid
          width="50%"
          gap="extra-loose"
          gridTemplateColumns="repeat( auto-fit, minmax(350px, 1fr) )"
        >
          {state.ids.length
            ? state.ids.map(id => {
                return <Single value={id.split('.')[0]} />;
              })
            : null}
        </Grid>
      </Stack>
    </Grid>
  );
};

export default Page;
