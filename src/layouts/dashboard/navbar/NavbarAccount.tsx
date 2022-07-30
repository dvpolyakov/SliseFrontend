// next
import NextLink from 'next/link';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Link, ListItemIcon, MenuItem, Select, Typography } from '@mui/material';
// hooks
import useAuth from '../../../hooks/useAuth';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import MyAvatar from '../../../components/MyAvatar';
import { useCallback, useEffect, useState } from 'react';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
import axiosInstance from '../../../utils/axios';
import nft3 from 'src/assets/nft3.svg';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: theme.palette.grey[500_12],
  transition: theme.transitions.create('opacity', {
    duration: theme.transitions.duration.shorter,
  }),
}));

// ----------------------------------------------------------------------

type Props = {
  isCollapse: boolean | undefined;
};

export default function NavbarAccount({ isCollapse }: Props) {
  const { user } = useAuth();
  const [whitelists, setWhitelists] = useState([]);
  const [whitelist, setWhitelist] = useState('');
  const color = '#F3F4EF';
  const isMountedRef = useIsMountedRef();

  const getWhitelists = useCallback(async () => {
    const response = await axiosInstance.get('https://daoanalytics.herokuapp.com/api/analytics/getWhitelists');
    if (isMountedRef.current) {
      const stored = JSON.parse(localStorage.getItem('storedWhitelists')!);
      if (stored) {
        console.log(stored);
        response.data.data.push(...stored.whitelists);
      }
      setWhitelists(response.data.data);
      const existWhitelist = window.localStorage.getItem('whitelistId');
      if (!existWhitelist) {
        setWhitelist(response.data.data[0].name);
        window.localStorage.setItem('whitelistId', response.data.data[0].id);
      } else {
        setWhitelist(findWhitelistById(response.data.data, existWhitelist));
      }
    }

  }, [isMountedRef]);
  useEffect(() => {
    getWhitelists();
  }, [getWhitelists]);

  const findWhitelistId = (name: string) => {
    let id;
    whitelists.map((list: any) => {
      if (list.name === name)
        id = list.id;
    });
    return id;
  }

  const findWhitelistById = (data: any, id: any) => {
    let wl;
    data.map((list: any) => {
      if (list.id === id)
        wl = list.name;
    });
    return wl || '';
  }

  const handleChange = (event: any) => {
    /*  const sep = event.target.value.lastIndexOf(':');
      const name = event.target.value.substring(event.target.value, sep);
      const id = event.target.value.substring(sep,event.target.value.length);*/
    const wl: any = findWhitelistId(event.target.value);
    setWhitelist(event.target.value);
    window.localStorage.setItem('whitelistId', wl);
    window.location.reload();
  };

  return (
    <NextLink href={PATH_DASHBOARD.user.account} passHref>
      <Link underline="none" color="inherit">
        <RootStyle
          sx={{
            ...(isCollapse && {
              bgcolor: 'transparent',
            }),
          }}
        >
          <MyAvatar />

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
            <Select sx={{ color: color, width:'150px' }}
              value={whitelist}
              onChange={handleChange}
            >
              {whitelists.map((whitelist: any) => {
                return (
                  <MenuItem color={color} key={whitelist.id} value={whitelist.name}>
                    {whitelist.name}
                  </MenuItem>
                )
              })}

            </Select>
           
          </Box>
        </RootStyle>
      </Link>
    </NextLink>
  );
}
