import { useCallback, useEffect, useState } from 'react';
// @mui
import { alpha, styled } from '@mui/material/styles';
import { Avatar, Typography, ListItemText, ListItemAvatar, MenuItem, Box, Select, Link } from '@mui/material';
// utils
import { fToNow } from '../../../utils/formatTime';
// _mock_
import { _contacts } from '../../../_mock';
// components
import Iconify from '../../../components/Iconify';
import Scrollbar from '../../../components/Scrollbar';
import MenuPopover from '../../../components/MenuPopover';
import BadgeStatus from '../../../components/BadgeStatus';
import { IconButtonAnimate } from '../../../components/animate';
import { Whitelist } from '../../../models/models';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
import axiosInstance from '../../../utils/axios';
import { BACKEND_URL } from '../../../utils/endpoints';
import { sampleWlIds } from '../../../samples/whitelist-mapper';
import { getCookie } from 'cookies-next';
import MyAvatar from '../../../components/MyAvatar';
import { PATH_DASHBOARD } from '../../../routes/paths';
import NextLink from 'next/link';
import CollectionAvatar from '../../../components/CollectionAvatar';

// ----------------------------------------------------------------------

const ITEM_HEIGHT = 70;
const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginTop: 5,
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: '#1D291B',
  color:'#1D291B',
  transition: theme.transitions.create('opacity', {
    duration: theme.transitions.duration.shorter,
  }),
}));

const RootStyle2 = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginTop: 5,
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: '#293228',
  color:'#293228',
  transition: theme.transitions.create('opacity', {
    duration: theme.transitions.duration.shorter,
  }),
}));

// ----------------------------------------------------------------------
type Props = {
  isCollapse: boolean | undefined;
};
export default function WhitelistsPopover({ isCollapse }: Props) {
  const [open, setOpen] = useState<HTMLElement | null>(null);
  const [whitelists, setWhitelists] = useState<Whitelist[]>([]);
  const [whitelist, setWhitelist] = useState<Whitelist>({ logo: 'https://nftcalendar.io/storage/uploads/2022/05/18/red_0518202219120762854507cfef1.jpg', networkType: 'Ethereum', name: 'IKIGAI', id: '1' });
  const isMountedRef = useIsMountedRef();
  const color = '#1D291B';

  const getWhitelists = useCallback(async () => {
    console.log('fetching');
    const sampleWls = sampleWlIds;
    const existsWl = getCookie('whitelists');
    let whitelists: Whitelist[]
    if (existsWl)
      whitelists = JSON.parse(existsWl.toString());
    else {
      const jwt = getCookie('jwt-token');
      if (jwt)
        whitelists = await fetchWhitelists(jwt as string);
      else
        whitelists = [];
    }
    sampleWls.push(...whitelists);
    setWhitelists(sampleWls);
    setWhitelist(findWhitelistById(sampleWls, sampleWls[0].id));
    window.localStorage.setItem('whitelistId', sampleWls[0].id);
    console.log(sampleWls.length);
  }, [isMountedRef]);

  const findWhitelistId = (name: string) => {
    let id;
    whitelists.map((list: any) => {
      if (list.name === name)
        id = list.id;
    });
    return id;
  }

  const findWhitelistById = (data: Whitelist[], id: any): Whitelist => {
    let wl: Whitelist = {
      name: 'BAYC',
      networkType: 'Ethereum',
      id: '1',
      logo: ''
    };
    data.map((list: any) => {
      if (list.id === id)
        wl = list
    });
    return wl;
  }

  const fetchWhitelists = async (jwt: string): Promise<Whitelist[]> => {
    let wls: Whitelist[] = [];
    try {
      const response = await axiosInstance.get(`${BACKEND_URL}analytics/whitelists`, {
        headers: {
          'Authorization': `Bearer ${jwt}`
        }
      });
      console.log(1);
      wls = response.data.data;
    } catch {

    }

    return wls;
  }

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleChange = (event: any) => {
    const wl: any = findWhitelistId(event.target.value);
    setWhitelist(event.target.value);
    window.localStorage.setItem('whitelistId', wl);
    window.location.reload();
  };

  useEffect(() => {
    getWhitelists();
  }, [getWhitelists]);

  return (
    <>
      <Link onClick={handleOpen} underline="none" color="inherit">
        <RootStyle
          sx={{
            ...(isCollapse && {
              bgcolor: '#1D291B',
              backgroundColor: 'black',
            }),
          }}
        >
          <CollectionAvatar logo={whitelist.logo}/>

          <Box
            sx={{
              ml: 2,
              transition: (theme) =>
                theme.transitions.create('width', {
                  duration: theme.transitions.duration.shorter,
                }),
              ...(isCollapse && {
                ml: 0,
                width: 0,
              }),
            }}
          >
            <Typography variant="subtitle2" sx={{ color: '#FFFFFF' }} noWrap>
              {whitelist?.name}
            </Typography>
            <Typography variant="body2" noWrap sx={{ color: '#919EAB' }}>
              {whitelist?.networkType}
            </Typography>
          </Box>
        </RootStyle>
      </Link>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        color={color}
        sx={{
          color: '#1D291B',
          mt: 1.5,
       /*   ml: 0.75,*/
          width: 240,
          '& .MuiMenuItem-root': {
            px: 1.5,
            height: ITEM_HEIGHT,
            borderRadius: 0.75,
          },
        }}
      >
          <Scrollbar sx={{ height: ITEM_HEIGHT * (whitelists.length + 1), backgroundColor: '#1D291B' }}>
            {whitelists.map((wl, idx) => (
              idx == 0 ?
              <RootStyle2
              >
                <CollectionAvatar logo={wl.logo}/>
                <Box
                  sx={{
                    ml: 2,
                    color:'#1D291B',
                    transition: (theme) =>
                      theme.transitions.create('width', {
                        duration: theme.transitions.duration.shorter,
                      }),
                    ...(isCollapse && {
                      ml: 0,
                      width: 0,
                    }),
                  }}
                >
                  <Typography variant="subtitle2" sx={{ color: '#FFFFFF' }} noWrap>
                    {wl?.name}
                  </Typography>
                  {/* <Typography variant="body2" noWrap sx={{ color: '#919EAB' }}>
                  {wl?.networkType}
                </Typography>*/}
                </Box>
              </RootStyle2>
                :
                <RootStyle
                >
                  <CollectionAvatar logo={wl.logo}/>
                  <Box
                    sx={{
                      ml: 2,
                      color:'#1D291B',
                      transition: (theme) =>
                        theme.transitions.create('width', {
                          duration: theme.transitions.duration.shorter,
                        }),
                      ...(isCollapse && {
                        ml: 0,
                        width: 0,
                      }),
                    }}
                  >
                    <Typography variant="subtitle2" sx={{ color: '#FFFFFF' }} noWrap>
                      {wl?.name}
                    </Typography>
                    {/* <Typography variant="body2" noWrap sx={{ color: '#919EAB' }}>
                  {wl?.networkType}
                </Typography>*/}
                  </Box>
                </RootStyle>
            ))}

            <RootStyle
            >
              <img src="/assets/plus.svg" alt="Add yours" width="20" height="20" style={{marginRight:8}} />
              <Box
                sx={{
                  ml: 2,
                  color:'#1D291B',
                  transition: (theme) =>
                    theme.transitions.create('width', {
                      duration: theme.transitions.duration.shorter,
                    }),
                  ...(isCollapse && {
                    ml: 0,
                    width: 0,
                  }),
                }}
              >
                <Typography variant="subtitle2" sx={{ color: '#FFFFFF' }} noWrap>
                 Add Yours
                </Typography>
                {/* <Typography variant="body2" noWrap sx={{ color: '#919EAB' }}>
                  {wl?.networkType}
                </Typography>*/}
              </Box>
            </RootStyle>
          </Scrollbar>
      </MenuPopover>
    </>
  );
}
