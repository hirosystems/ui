import React from 'react';
import { Box, BoxProps, color, Flex, space } from '@stacks/ui';
import Link from 'next/link';
import { useAppState } from '@common/hooks/use-app-state';
import { SIDEBAR_WIDTH } from '@common/constants';
// @ts-ignore
import nav from '@common/navigation.yaml';
import ArrowLeftIcon from 'mdi-react/ArrowLeftIcon';
import { convertToTitle, getTitle, slugify } from '@common/utils';
import { useRouter } from 'next/router';
import { getCapsizeStyles } from '@components/mdx/typography';
import { Text } from '@components/typography';
import { SmartLink } from '@components/mdx';
import { useMobileMenuState } from '@common/hooks/use-mobile-menu';
import ChevronDownIcon from 'mdi-react/ChevronDownIcon';
import { ForwardRefExoticComponentWithAs, forwardRefWithAs } from '@stacks/ui-core';
import { useSideNav } from '@common/hooks/use-side-nav';

const Wrapper: React.FC<BoxProps & { containerProps?: BoxProps }> = ({
  width = `${SIDEBAR_WIDTH}px`,
  containerProps,
  children,
  ...rest
}) => {
  return (
    <Box width={width} maxWidth={width} flexGrow={0} flexShrink={0} {...rest}>
      <Box
        position="sticky"
        width={width}
        maxHeight={`calc(100vh - 60px)`}
        overflow="auto"
        top={0}
        pt={space('extra-loose')}
        {...containerProps}
      >
        {children}
      </Box>
    </Box>
  );
};

const PageItem = React.forwardRef(
  (
    {
      isActive,
      color: _color = color('text-caption'),
      children,
      mb = space('base'),
      isTopLevel,
      ...props
    }: any,
    ref: any
  ) => {
    const typeStyles = isTopLevel ? getCapsizeStyles(16, 26) : getCapsizeStyles(14, 20);
    const styleProps = {
      outline: '0',
      display: 'block',
      color: isActive ? color('accent') : isTopLevel ? color('text-title') : _color,
      mb: isTopLevel ? space('base-loose') : mb,
    };
    return (
      <SmartLink
        fontWeight="500"
        ref={ref}
        {...styleProps}
        _hover={{ color: isTopLevel ? color('accent') : color('text-title') }}
        _focus={{ color: color('accent') }}
        {...typeStyles}
        {...props}
      >
        {children}
      </SmartLink>
    );
  }
);

const SectionTitle: ForwardRefExoticComponentWithAs<BoxProps, 'a'> = forwardRefWithAs<
  BoxProps,
  'a'
>(({ children, ...rest }, ref) => (
  <Text
    {...{
      display: 'block',
      fontWeight: 500,
      ...getCapsizeStyles(16, 26),
      color: color('text-title'),
      ...rest,
    }}
    ref={ref}
  >
    {children}
  </Text>
));

const getRoutePath = (path, routes) => routes.find(route => route.path.endsWith(path));

const ChildPages = ({ items, handleClick }: any) => {
  const { routes } = useAppState();
  const { handleClose } = useMobileMenuState();

  return items?.pages
    ? items?.pages?.map((page, key) => {
        if (page.external) {
          return (
            <Box mb={space('extra-tight')} key={key}>
              <PageItem
                as="a"
                href={page.external.href}
                onClick={() => handleClose()}
                target="_blank"
              >
                {page.external.title}
              </PageItem>
            </Box>
          );
        }

        const path = page.pages
          ? `${page.path}${page.pages[0].path}`
          : items.path
          ? `/${slugify(items.path)}${page.path}`
          : page.path;

        const router = useRouter();

        const routePath = routes.find(route => route.path.endsWith(path));

        const route = getRoutePath(path, routes);

        return (
          <Box mb={space('extra-tight')} key={key}>
            <Link href={routePath.path} passHref>
              <PageItem
                isActive={router.pathname.includes(path)}
                onClick={
                  page.pages
                    ? () => {
                        handleClick(page);
                        handleClose();
                      }
                    : handleClose
                }
                as="a"
              >
                {items.usePageTitles ? getTitle(route) : convertToTitle(page.path)}
              </PageItem>
            </Link>
          </Box>
        );
      })
    : null;
};

const ChildSection: React.FC<BoxProps & { sections?: any }> = ({ sections, ...rest }) =>
  sections?.map((section, key) => {
    return (
      <Box {...rest} key={key}>
        <SectionTitle
          letterSpacing="0.06rem"
          textTransform="uppercase"
          fontSize="12px"
          fontWeight={500}
          mb={space('base-loose')}
        >
          {section.title}
        </SectionTitle>
        <ChildPages items={section} />
      </Box>
    );
  });

const BackItem = props => (
  <Flex
    color={color('text-caption')}
    _hover={{
      cursor: 'pointer',
      color: color('text-title'),
    }}
    alignItems="center"
    {...props}
  >
    <Box mr={space('extra-tight')}>
      <ArrowLeftIcon size="16px" />
    </Box>
    <PageItem textDecoration="none" mb={'0px'} color={'currentColor'}>
      Back
    </PageItem>
  </Flex>
);

const PageView = () => {
  const { items, handleBack, handleClick } = useSideNav();

  return (
    <Box>
      <BackItem onClick={handleBack} mb={space('extra-loose')} />
      <Box mb={space('loose')}>
        <SectionTitle>{convertToTitle(items.path)}</SectionTitle>
      </Box>
      <Box>
        {items ? <ChildPages handleClick={handleClick} items={items} /> : null}
        {items?.sections ? (
          <ChildSection
            mt={space('extra-loose')}
            sections={items?.sections?.map(section => ({
              ...section,
              path: items.path,
            }))}
          />
        ) : null}
      </Box>
    </Box>
  );
};

const SectionLinks = ({ section, index }) => {
  const router = useRouter();
  const { handleClick } = useSideNav();
  const { routes } = useAppState();
  return section.pages.map((page, key) => {
    const path = page.pages
      ? `${page.path}${page.pages[0].path}`
      : section?.title
      ? `/${slugify(section?.title)}${page.path}`
      : page.path;

    const route = getRoutePath(path, routes);

    return (
      <Box mt="base" key={`${index}-${key}`}>
        <PageItem
          href={path}
          isActive={router.pathname.endsWith(path)}
          onClick={() => handleClick({ path })}
        >
          {section.usePageTitles ? getTitle(route) : convertToTitle(page.path)}
        </PageItem>
      </Box>
    );
  });
};

const Section = ({ section, index, ...rest }) => {
  const { expanded, handleUpdateExpanded } = useSideNav();

  const isExpanded = expanded === section.title;

  return (
    <Box mb={isExpanded ? 'loose' : 'tight'} {...rest}>
      <Flex
        onClick={() => handleUpdateExpanded(section.title)}
        width="100%"
        alignItems="center"
        justifyContent="space-between"
        userSelect="none"
        _hover={{
          cursor: 'pointer',
        }}
        {...rest}
      >
        <SectionTitle>{section.title}</SectionTitle>
        <Box as={ChevronDownIcon} opacity={0.5} color={color('text-caption')} />
      </Flex>
      {isExpanded && <SectionLinks section={section} index={index} />}
    </Box>
  );
};

const DefaultView = () => {
  const { items, handleClick } = useSideNav();
  const router = useRouter();
  return items.map((section, i) => {
    if (section.title) {
      return <Section section={section} key={i} index={i} />;
    }
    return (
      <Box>
        {section.pages.map(({ title, path }) => (
          <PageItem
            href={path}
            isTopLevel
            isActive={router.pathname.endsWith(path)}
            onClick={() => handleClick({ path })}
          >
            {title || convertToTitle(path)}
          </PageItem>
        ))}
      </Box>
    );
  });
};

const Navigation = () => {
  const { type, expanded } = useSideNav();

  switch (type) {
    case 'page': {
      return <PageView />;
    }
    default: {
      return <DefaultView />;
    }
  }
};

export const SideNav: React.FC<BoxProps & { containerProps?: BoxProps }> = ({
  containerProps,
  ...rest
}) => {
  return (
    <Wrapper containerProps={containerProps} {...rest}>
      <Navigation />
    </Wrapper>
  );
};
