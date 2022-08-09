// @mui
import { alpha, styled } from '@mui/material/styles';
import {
  ListItemText,
  ListItemIcon,
  ListSubheader,
  ListItemButton,
  ListItemTextProps,
  ListItemButtonProps,
} from '@mui/material';
// utils
import cssStyles from '../../../utils/cssStyles';
// config
import { ICON, NAVBAR } from '../../../config';

// ----------------------------------------------------------------------

export interface ListItemStyleProps extends ListItemButtonProps {
  active: boolean;
  depth: number;
}

export const ListItemStyle = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== 'active',
})<ListItemStyleProps>(({ active, depth, theme }) => ({
  position: 'relative',
  textTransform: 'capitalize',
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(1.5),
  marginBottom: theme.spacing(0.5),
  color: theme.palette.text.secondary,
  borderRadius: theme.shape.borderRadius,
  height: NAVBAR.DASHBOARD_ITEM_ROOT_HEIGHT,
  // Active item
  ...(active && {
    color: theme.palette.primary.main,
    backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
  }),
  // Active item
  ...(active &&
    depth !== 1 && {
      color: theme.palette.text.primary,
      backgroundColor: 'transparent',
    }),
  // Sub item
  ...(depth && {
    ...(depth > 1 && {
      height: NAVBAR.DASHBOARD_ITEM_SUB_HEIGHT,
    }),
    ...(depth > 2 && {
      paddingLeft: theme.spacing(depth),
    }),
  }),
}));

// ----------------------------------------------------------------------

interface ListItemTextStyleProps extends ListItemTextProps {
  isCollapse?: boolean;
}

export const ListItemTextStyle = styled(ListItemText, {
  shouldForwardProp: (prop) => prop !== 'isCollapse',
})<ListItemTextStyleProps>(({ isCollapse, theme }) => ({
  transition: theme.transitions.create(['width', 'opacity'], {
    duration: theme.transitions.duration.shorter,
  }),
  ...(isCollapse && {
    width: 0,
    opacity: 0,
  }),
}));

// ----------------------------------------------------------------------

export const ListItemIconStyle = styled(ListItemIcon)({
  width: ICON.NAVBAR_ITEM,
  height: ICON.NAVBAR_ITEM,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '& svg': { width: '100%', height: '100%' },
  color: '#F3F4EF',
});

// ----------------------------------------------------------------------

export const ListSubheaderStyle = styled(ListSubheader)(({ theme }) => ({
  ...theme.typography.overline,
  paddingTop: theme.spacing(3),
  paddingLeft: theme.spacing(2),
  paddingBottom: theme.spacing(1),
  transition: theme.transitions.create('opacity', {
    duration: theme.transitions.duration.shorter,
  }),
  background: 'transparent',
  color: '#fff',
}));
