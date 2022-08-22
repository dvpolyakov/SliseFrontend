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

import { findWhitelistById, findWhitelistId, demoWhitelists } from '../../../samples/whitelist-mapper';
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
  color: '#1D291B',
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
  color: '#293228',
  transition: theme.transitions.create('opacity', {
    duration: theme.transitions.duration.shorter,
  }),
}));

const RootButton = styled('button')(() => ({}));

// ----------------------------------------------------------------------
type Props = {
  isCollapse: boolean | undefined;
};
export default function WhitelistsPopover({ isCollapse }: Props) {
  const [open, setOpen] = useState<HTMLElement | null>(null);
  const [whitelists, setWhitelists] = useState<Whitelist[]>([]);
  const [whitelist, setWhitelist] = useState<Whitelist | null>(null);
  const jwt = getCookie('jwt-token');
  const isMountedRef = useIsMountedRef();
  const color = '#1D291B';

  const getWhitelists = useCallback(async () => {
    console.log('fetching');
    const sampleWls = demoWhitelists;
    let whitelists: Whitelist[];
    const jwt = getCookie('jwt-token');
    if (jwt) whitelists = await fetchWhitelists(jwt as string);
    else {
      whitelists = sampleWls;

      const id = localStorage.getItem('whitelistId');
      if(id) {
        console.log(id);
        whitelists = [whitelists.find(x => x.id === id)!, ...whitelists.filter(x => x.id !== id)];
        setWhitelists(whitelists);
        setWhitelist(findWhitelistById(whitelists, id));
      }
      else {
        setWhitelists(whitelists);
        setWhitelist(findWhitelistById(whitelists, whitelists?.[0]?.id));
      }
      window.localStorage.setItem('whitelistId', id ?? whitelists?.[0]?.id);
      window.localStorage.setItem('whitelistLink', whitelists?.[0]?.link!);
      return;
    }

    setWhitelists(whitelists);
    setWhitelist(findWhitelistById(whitelists, whitelists?.[0]?.id));
    window.localStorage.setItem('whitelistId', whitelists?.[0]?.id);
    window.localStorage.setItem('whitelistLink', whitelists?.[0]?.link!);
  }, [isMountedRef]);


  const fetchWhitelists = async (jwt: string): Promise<Whitelist[]> => {
    let wls: Whitelist[] = [];
    try {
      const response = await axiosInstance.get(`${process.env.BACKEND_URL}analytics/whitelists`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log(1);
      wls = response.data.data;
    } catch {
    }

    return wls;
  };

  const setCollection = (id: string) => {
    const wl = demoWhitelists.find(x => x.id === id);

    setWhitelist(wl!);
    window.localStorage.setItem('whitelistId',wl!.id);
    window.location.reload();
  }

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleChange = (event: any) => {
    const wl: any = findWhitelistId(whitelists, event.target.value);
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
          <CollectionAvatar logo={whitelist?.logo}/>

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
        {/*<RootStyle2>
          <CollectionAvatar logo={whitelist?.logo} />
          <Box
            sx={{
              ml: 2,
              color: '#1D291B',
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
        </RootStyle2>*/}
        <Scrollbar
          sx={{ height: ITEM_HEIGHT * (jwt == undefined ? whitelists.length * 1.5 : 1.2), backgroundColor: '#1D291B' }}>
          {whitelists.map((wl, idx) => (
            idx == 0 ?
              <div onClick={() => setCollection(wl.id)}>
                <RootStyle2
                >
                  <CollectionAvatar logo={wl?.logo}/>
                  <Box
                    sx={{
                      ml: 2,
                      color: '#1D291B',
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
                    <Typography variant="body2" noWrap sx={{ color: '#919EAB' }}>
                      {wl?.networkType}
                    </Typography>
                  </Box>
                </RootStyle2>
              </div>
              :
              <div onClick={() => setCollection(wl.id)}>
                <RootStyle
                >
                  <CollectionAvatar logo={wl?.logo}/>
                  <Box
                    sx={{
                      ml: 2,
                      color: '#1D291B',
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
                    <Typography variant="body2" noWrap sx={{ color: '#919EAB' }}>
                      {wl?.networkType}
                    </Typography>
                  </Box>
                </RootStyle>
              </div>
          ))}

          {jwt == undefined ? (
            <Link href={'/auth/login'} underline="none" color="inherit">
              <RootStyle>
                <img src="/assets/plus.svg" alt="Add yours" width="20" height="20" style={{ marginRight: 8 }}/>
                <Box
                  sx={{
                    ml: 2,
                    color: '#1D291B',
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
            </Link>
          ) : (
            <></>
          )}
        </Scrollbar>
      </MenuPopover>
    </>
  );
}
