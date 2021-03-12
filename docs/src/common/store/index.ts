import { atom } from 'recoil';
// @ts-ignore
import nav from '@common/navigation.yaml';

export interface SideNavState {
  type: 'default' | 'page';
  items: any;
  selected: any;
  expanded: string;
}
export const sideNavState = atom<SideNavState>({
  key: 'app.sidenav',
  default: {
    type: 'default',
    items: nav.sections,
    selected: undefined,
    expanded: nav.sections[1].title,
  },
});
