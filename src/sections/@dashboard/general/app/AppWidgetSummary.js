import PropTypes from 'prop-types';
// @mui
import {alpha, styled, useTheme} from '@mui/material/styles';
import {Box, Card, Stack, Typography, Button} from '@mui/material';
import KeyIcon from '@mui/icons-material/Key';
// utils
import {fNumber} from '../../../../utils/formatNumber';
// components
import Iconify from '../../../../components/Iconify';

// ----------------------------------------------------------------------

const IconWrapperStyle = styled('div')(({ theme }) => ({
  width: 24,
  height: 24,
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.success.main,
  backgroundColor: alpha(theme.palette.success.main, 0.16),
}));
const IconStyle = styled(Iconify)(({ theme }) => ({
  width: 20,
  textAlign:'center',
  height: 20,
  marginLeft: '47%',
  marginBottom: '0px',
}));
// ----------------------------------------------------------------------

AppWidgetSummary.propTypes = {
  chartColor: PropTypes.string.isRequired,
  chartData: PropTypes.arrayOf(PropTypes.number).isRequired,
  percent: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  total: PropTypes.any,
  icon: PropTypes.string.isRequired,
};

export default function  AppWidgetSummary({ title, percent, total, chartColor, chartData, icon, color }) {
  const theme = useTheme();

  const chartOptions = {
    colors: [chartColor],
    chart: { sparkline: { enabled: true } },
    plotOptions: { bar: { columnWidth: '68%', borderRadius: 2 } },
    tooltip: {
      x: { show: false },
      y: {
        formatter: (seriesName) => fNumber(seriesName),
        title: {
          formatter: () => '',
        },
      },
      marker: { show: false },
    },
  };

  return (
    <Card sx={{ display: 'flex', alignItems: 'center', justifyContent:'center', p: 3 }}>
      <Box sx={{ flexGrow: 1 }}>
      <IconStyle icon={icon} backgroundColor={color}/>
        <Typography textAlign="center" sx={{marginBottom:'5px'}} variant="subtitle2">{title}</Typography>

     
        {total === null ? <Box textAlign='center'><Button align='center' variant='contained' textAlign='center' startIcon={<KeyIcon />} sx={{ boxShadow:'none',backgroundColor:'#DFE3E8', color:'black', ':hover':{opacity: '.6', backgroundColor:'#DFE3E8'}}}>Connect
</Button></Box> : <Typography textAlign="center" variant="h3">{fNumber(total)}</Typography>}

      </Box>

      {/*<ReactApexChart type="bar" series={[{ data: chartData }]} options={chartOptions} width={60} height={36} />*/}
    </Card>
  );
}
