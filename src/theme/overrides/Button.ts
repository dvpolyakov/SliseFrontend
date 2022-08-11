import { Theme } from '@mui/material/styles';

// ----------------------------------------------------------------------

export default function Button(theme: Theme) {
  return {
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: 'none !important',
          '&:hover': {
            boxShadow: 'none !important',
          },
        },
        sizeLarge: {
          height: 48,
        },
        // contained
        containedInherit: {
          color: theme.palette.grey[800],
          boxShadow: 'none !important',
          '&:hover': {
            boxShadow: 'none !important',
            backgroundColor: theme.palette.grey[400],
          },
        },
        containedPrimary: {
          boxShadow: 'none !important',
        },
        containedSecondary: {
          boxShadow: 'none !important',
        },
        containedInfo: {
          boxShadow: 'none !important',
        },
        containedSuccess: {
          boxShadow: 'none !important',
        },
        containedWarning: {
          boxShadow: 'none !important',
        },
        containedError: {
          boxShadow: 'none !important',
        },
        // outlined
        outlinedInherit: {
          border: `1px solid ${theme.palette.grey[500_32]}`,
          boxShadow: 'none !important',
          '&:hover': {
            backgroundColor: theme.palette.action.hover,
          },
        },
        textInherit: {
          boxShadow: 'none !important',
          '&:hover': {
            backgroundColor: theme.palette.action.hover,
          },
        },
      },
    },
  };
}
