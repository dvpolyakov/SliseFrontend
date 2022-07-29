import PropTypes from 'prop-types';
// next
// @mui
import {styled} from '@mui/material/styles';
// hooks
import useAuth from '../../../hooks/useAuth';
// routes
// components
import {useCallback, useEffect, useState} from 'react';
import axios from '../../../utils/axios';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import useIsMountedRef from "../../../hooks/useIsMountedRef";

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({theme}) => ({
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

NavbarAccount.propTypes = {
  isCollapse: PropTypes.bool,
  textColor: PropTypes.string,
};

export default function NavbarAccount({isCollapse, textColor}) {
  const {user} = useAuth();
  const [whitelists, setWhitelists] = useState([]);
  const [whitelist, setWhitelist] = useState('');
  const color = '#F3F4EF';
  const isMountedRef = useIsMountedRef();

  const getWhitelists = useCallback(async () => {
    const response = await axios.get('https://daoanalytics.herokuapp.com/api/analytics/getWhitelists');
    if (isMountedRef.current) {
      const stored = JSON.parse(window.localStorage.getItem('storedWhitelists'));
      if(stored){
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

  const findWhitelistId = (name) => {
    let id;
    whitelists.map((list) => {
      if (list.name === name)
        id = list.id;
    });
    return id;
  }

  const findWhitelistById = (data,id) => {
    let wl;
    data.map((list) => {
      if (list.id === id)
        wl = list.name;
    });
    return wl || '';
  }

  const handleChange = (event) => {
    /*  const sep = event.target.value.lastIndexOf(':');
      const name = event.target.value.substring(event.target.value, sep);
      const id = event.target.value.substring(sep,event.target.value.length);*/
    const wl = findWhitelistId(event.target.value);
    setWhitelist(event.target.value);
    window.localStorage.setItem('whitelistId', wl);
    window.location.reload(false);
  };

  if (!whitelists)
    return <></>

  return (
    <FormControl>
      <Select sx={{color: color}}
              value={whitelist}
              onChange={handleChange}
      >
        {whitelists.map((whitelist) => {
          return (
            <MenuItem key={whitelist.id} value={whitelist.name}>
              {whitelist.name}
            </MenuItem>
          )
        })}

      </Select>
    </FormControl>
  );
}
