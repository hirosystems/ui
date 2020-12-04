import React from 'react';
// @ts-ignore
import nav from '@common/navigation.yaml';
import { useRouter } from 'next/router';
import { useMobileMenuState } from '@common/hooks/use-mobile-menu';
import { useRecoilState } from 'recoil';
import { sideNavState, SideNavState } from '@common/store';

export const useSideNavState = (): [state: SideNavState, setState: any] => {
  const [selected, setSelected] = useRecoilState(sideNavState);

  return [selected, setSelected];
};
const useAutoUpdateSideNav = () => {
  const [selected, setSelected] = useSideNavState();
  const router = useRouter();
  React.useEffect(() => {
    let currentSection;

    if (router.pathname === '/') {
      currentSection = {
        items: nav.sections,
        type: 'default',
      };
    } else {
      nav.sections.forEach(section => {
        section.pages.forEach(page => {
          if (page.pages) {
            const pagesFound = page.pages.find(_page => {
              return router.pathname.endsWith(`${page.path}${_page.path}`);
            });
            const sectionsFound = page?.sections?.find(_section => {
              return _section.pages.find(_page => {
                return router.pathname.endsWith(`${page.path}${_page.path}`);
              });
            });
            if (pagesFound || sectionsFound) {
              currentSection = {
                type: 'page',
                items: page,
              };
            }
          } else if (!currentSection && router.pathname.endsWith(page.path)) {
            currentSection = {
              items: nav.sections,
              type: 'default',
            };
          }
        });
      });
    }

    if (currentSection?.items && selected.items !== currentSection.items) {
      setSelected(currentSection);
    }
  }, [router.pathname]);
};

export const useSideNav = () => {
  const [{ items, type, expanded, selected }, setSelected] = useSideNavState();
  const { handleClose } = useMobileMenuState();

  const handleUpdateExpanded = (expanded: string) => setSelected(s => ({ ...s, expanded }));
  const handleUpdateSelected = (selected: any | undefined) =>
    setSelected(s => ({ ...s, selected }));
  const handleUpdateType = (type: 'page' | 'default') => setSelected(s => ({ ...s, type }));

  const handleClick = (_selected: any) => {
    if (_selected.pages) {
      setSelected({
        type: 'page',
        items: selected,
      });
    }
    handleClose();
  };

  const handleBack = () =>
    setSelected({
      type: 'default',
      items: nav.sections,
    });

  return {
    items,
    type,
    expanded,
    selected,
    handleClick,
    handleBack,
    handleUpdateExpanded,
    handleUpdateSelected,
    handleUpdateType,
  };
};
