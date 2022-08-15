import { Card, CardContent, Stack, SxProps } from '@mui/material';
import React, { PropsWithChildren } from 'react';

type Props = PropsWithChildren<{ gridArea: string; sx?: SxProps; stackSx?: SxProps; cardContentSx?: SxProps }>;

function DashboardWidgetWrapper({ children, gridArea, sx, stackSx, cardContentSx }: Props) {
  return (
    <Card sx={{ gridArea, ...sx }}>
      <CardContent sx={{ padding: '16px !important', ...cardContentSx }}>
        <Stack direction="column" alignItems="center" sx={{ ...stackSx }}>
          {children}
        </Stack>
      </CardContent>
    </Card>
  );
}

export default DashboardWidgetWrapper;
