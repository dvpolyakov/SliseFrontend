import PropTypes from 'prop-types';
import orderBy from 'lodash/orderBy';
// @mui
import {alpha, styled} from '@mui/material/styles';
import {
  Avatar,
  Box,
  Card,
  CardHeader,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Tooltip,
  Typography
} from '@mui/material';
// utils
// _mock_
import {_appAuthors} from '../_mock';
// components
import TopHolders from './TopHolders';
import LinearProgress, {linearProgressClasses} from '@mui/material/LinearProgress';

// ----------------------------------------------------------------------

const IconWrapperStyle = styled('div')(({theme}) => ({
  width: 40,
  height: 40,
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.primary.main,
  backgroundColor: alpha(theme.palette.primary.main, 0.08),
}));

// ----------------------------------------------------------------------
TopHolders.propTypes = {
  data: PropTypes.arrayOf(PropTypes.any),
};
const BorderLinearProgress = styled(LinearProgress)(({theme}) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: '#fff',
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#000000' : '#308fe8',
  },
}));

export default function MutualHolders({data}) {
  const displayAuthor = orderBy(_appAuthors, ['favourite'], ['desc']);
  console.log(data);
  if (!data) {
    return <></>
  }
  return (
    <Card sx={{maxHeight: '357px'}}>
      <CardHeader title="Mutual Holders" sx={{paddingBottom: '10px'}}/>
      <TableContainer size="small" sx={{maxHeight: '300px'}}>
        <Table size="medium" stickyHeader sx={{height: "max-content"}}>
          <TableBody sx={{maxHeight: '357px'}}>
            {Array.from(data).map((row) => (
              <TableRow key={row.address}>
                <TableCell size='small' style={{width: '50%'}}> <Stack direction="row" alignItems="flex-start" spacing={1}>
                  <a style={{textDecoration: 'none', color: 'inherit'}} target={'_blank'}
                     href={`https://etherscan.io/address/${row.address}`} underline="none">
                    {row.holdings === null || row.holdings?.logo === null ?
                      <Avatar sx={{width: 24, height: 24}} alt='avatar name' src='https://i.ibb.co/WFD2Kj6/IMG.png'/>
                      :
                      <Avatar sx={{width: 24, height: 24}} alt={row.name} src={row.holdings?.logo}/>
                    }
                  </a>
                  <a style={{textDecoration: 'none', color: 'inherit'}} target={'_blank'}
                     href={`https://etherscan.io/address/${row.address}`} underline="none">
                    <Typography>{row.name}</Typography>
                  </a>
                </Stack>
                </TableCell>
                {row.holdings === null || row.prercent === null ?
                  <TableCell><Box sx={{width: '100%'}}><BorderLinearProgress variant="determinate"
                                                                             value={0}></BorderLinearProgress></Box></TableCell>
                  :
                  <TableCell>
                    <Tooltip title={row.totalholdings} placement="top">
                      <Box sx={{width: '100%'}} alt>
                        <BorderLinearProgress variant="determinate" value={(row.percent)}>
                        </BorderLinearProgress>
                      </Box>
                    </Tooltip>
                  </TableCell>
                }

                {/* <TableCell>{fNumber(row.holdings)}</TableCell> */}
                {/* <TableCell align="right">
                    <MoreMenuButton />
                  </TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

    </Card>
  );
}

// ----------------------------------------------------------------------

AuthorItem.propTypes = {
  author: PropTypes.shape({
    avatar: PropTypes.string,
    favourite: PropTypes.number,
    name: PropTypes.string,
  }),
  index: PropTypes.number,
};

function AuthorItem({author, index}) {
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Avatar alt={author.name} src={author.avatar}/>
      <Box sx={{flexGrow: 1}}>
        <Typography variant="subtitle2">{author.name}</Typography>


      </Box>


    </Stack>
  );
}
