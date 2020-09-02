import { useContext } from 'react';
import { Theme } from '../css';
import { ThemeContext } from '../components/theme-provider';

export const useTheme = (): Theme | undefined => useContext<Theme | undefined>(ThemeContext);
