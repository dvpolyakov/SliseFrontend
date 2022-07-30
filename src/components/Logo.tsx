import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import NextLink from 'next/link';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

const Logo = forwardRef(({ disabledLink = false, sx }, ref) => {
  const theme = useTheme();
  const PRIMARY_LIGHT = theme.palette.primary.light;
  const PRIMARY_MAIN = theme.palette.primary.main;
  const PRIMARY_DARK = theme.palette.primary.dark;

  const logo = (
    <Box ref={ref} sx={{ width: 48, height: 48, cursor: 'pointer', ...sx }}>
      <svg width="100" height="70" viewBox="0 0 6126 2166" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M0 1166L312.429 0H476.025L163.596 1166H0Z" fill="#DDFF55"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M237.812 1166L550.241 0H713.838L401.409 1166H237.812Z" fill="#DDFF55"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M475.812 1166L788.241 0H951.838L639.409 1166H475.812Z" fill="#DDFF55"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M713.812 1166L1026.24 0H1189.84L877.409 1166H713.812Z" fill="#DDFF55"/>
        <path d="M1678.8 658.974C1565.26 631.783 1454.92 623.786 1454.92 527.819C1454.92 463.841 1517.29 417.457 1632.43 417.457C1785.95 417.457 1816.33 499.029 1829.13 561.407H1957.06C1944.27 420.656 1835.52 305.495 1632.43 305.495C1440.53 305.495 1326.98 409.46 1326.98 537.416C1326.98 729.35 1512.49 743.745 1637.22 774.134C1753.96 802.925 1861.11 809.322 1861.11 927.682C1861.11 982.063 1806.74 1054.04 1667.61 1054.04C1462.91 1054.04 1430.93 962.87 1422.93 871.701H1295C1303 1047.64 1418.14 1166 1667.61 1166C1853.11 1166 1989.04 1068.43 1989.04 919.685C1989.04 718.154 1824.33 694.162 1678.8 658.974Z" fill="#F3F4EF"/>
        <path d="M2085.82 0V1143.61H2213.75V0H2085.82Z" fill="#F3F4EF"/>
        <path d="M2427.28 169.542C2464.06 169.542 2507.24 142.351 2507.24 92.7682C2507.24 43.1852 2464.06 15.9945 2427.28 15.9945C2392.1 15.9945 2347.32 43.1852 2347.32 92.7682C2347.32 142.351 2392.1 169.542 2427.28 169.542ZM2363.32 327.887V1143.61H2491.25V327.887H2363.32Z" fill="#F3F4EF"/>
        <path d="M2982.14 658.974C2868.59 631.783 2758.25 623.786 2758.25 527.819C2758.25 463.841 2820.62 417.457 2935.76 417.457C3089.28 417.457 3119.67 499.029 3132.46 561.407H3260.39C3247.6 420.656 3138.86 305.495 2935.76 305.495C2743.86 305.495 2630.32 409.46 2630.32 537.416C2630.32 729.35 2815.82 743.745 2940.56 774.134C3057.3 802.925 3164.44 809.322 3164.44 927.682C3164.44 982.063 3110.07 1054.04 2970.94 1054.04C2766.25 1054.04 2734.26 962.87 2726.27 871.701H2598.33C2606.33 1047.64 2721.47 1166 2970.94 1166C3156.45 1166 3292.38 1068.43 3292.38 919.685C3292.38 718.154 3127.66 694.162 2982.14 658.974Z" fill="#F3F4EF"/>
        <path d="M3746.99 1054.04C3569.49 1054.04 3481.53 916.486 3481.53 769.336H4126C4126 479.835 4001.26 305.495 3745.39 305.495C3507.12 305.495 3353.6 463.841 3353.6 735.748C3353.6 991.66 3503.92 1166 3751.79 1166C3954.89 1166 4071.63 1044.44 4113.21 892.494H3985.27C3970.88 948.475 3910.11 1054.04 3746.99 1054.04ZM3745.39 417.457C3898.92 417.457 3998.07 526.219 3998.07 657.374H3481.53C3481.53 526.219 3591.87 417.457 3745.39 417.457Z" fill="#F3F4EF"/>
      </svg>
    </Box>
  );

  if (disabledLink) {
    return <>{logo}</>;
  }

  return <NextLink href="/">{logo}</NextLink>;
});

Logo.propTypes = {
  disabledLink: PropTypes.bool,
  sx: PropTypes.object,
};

export default Logo;