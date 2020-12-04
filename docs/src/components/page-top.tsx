import React from 'react';
import { Box, BoxProps, Flex } from '@stacks/ui';
import { H1 } from '@components/mdx';
import { Text } from '@components/typography';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { getTitle } from '@common/utils';
import { getHeadingStyles } from '@components/mdx/typography';
import { PageMeta } from '@components/page-meta';

const Search = dynamic(() => import('@components/search'));

interface PageTopProps extends BoxProps {
  description?: string;
  duration?: string;
  experience?: 'beginners' | 'intermediate' | 'advanced';
  title?: string;
  headings?: any[];
  images?: {
    large?: string;
    sm?: string;
  };
}
export const PageTop: React.FC<PageTopProps> = React.memo(
  ({ description, experience, duration, title, headings, images, ...rest }) => {
    const router = useRouter();
    const isHome = router?.pathname === '/';
    return (
      <Box as="section" mb="40px" {...rest}>
        <Flex>
          <H1 mb="0 !important">
            {getTitle({
              title,
              headings,
            })}
          </H1>
          {isHome ? (
            <Box width="100%" maxWidth="208px">
              <Search />
            </Box>
          ) : null}
        </Flex>
        {description ? (
          <Text display="block" maxWidth="32ch" mt="40px !important" {...getHeadingStyles('h4')}>
            {description}
          </Text>
        ) : null}
        <PageMeta duration={duration} experience={experience} isHome={isHome} />
      </Box>
    );
  }
);
