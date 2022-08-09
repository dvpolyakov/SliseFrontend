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
import { BACKEND_URL } from '../../../utils/endpoints';
import { getCookie } from 'cookies-next';
import Cookies from 'cookies';
import { Whitelist } from '../../../models/models';

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
  data: any;
};

export default function NavbarAccount() {
  const { user } = useAuth();
  const [whitelists, setWhitelists] = useState<Whitelist[]>([]);
  const [whitelist, setWhitelist] = useState('');
  const color = '#F3F4EF';
  const isMountedRef = useIsMountedRef();

  const fetchWhitelists = async (jwt: string): Promise<Whitelist[]> => {
    const response = await axiosInstance.get(`${BACKEND_URL}analytics/whitelists`, {
      headers: {
        'Authorization': `Bearer ${jwt}`
      }
    });
    console.log(1);
    const wls:Whitelist[] =  response.data.data;
    return wls;
  }

  const getWhitelists  = useCallback(async () => {
    const existsWl = getCookie('whitelists');
    let whitelists: Whitelist[]
    if(existsWl)
       whitelists = JSON.parse(existsWl.toString());
    else {
      const jwt = getCookie('jwt-token');
      whitelists = await fetchWhitelists(jwt as string);
    }
    console.log(11);
    setWhitelists(whitelists);
    setWhitelist(findWhitelistById(whitelists, whitelists[0].id));
    window.localStorage.setItem('whitelistId', whitelists[0].id);
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

        >
          <MyAvatar/>

          <Box
            sx={{
              ml: 2,
              transition: (theme) =>
                theme.transitions.create('width', {
                  duration: theme.transitions.duration.shorter,
                }),

            }}
          >
            <Select sx={{ color: color, width: '150px' }}
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

export async function getServerSideProps(context) {
  const jwt = context.req.headers.cookies['jwt-token'];
  console.log(1);
  console.log(jwt);
  const response = await getWhitelists(jwt as string);
  const data = response;
  return {
    props: { data }
  }
}

