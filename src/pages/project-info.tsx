import { Button, Card, CardContent, Grid, MenuItem, NoSsr, Stack, TextField, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { getCookie } from 'cookies-next';
import React, { useCallback, useEffect, useState } from 'react';
import CopyClipboard from 'src/components/CopyClipboard';
import Page from 'src/components/Page';
import SvgIconStyle from 'src/components/SvgIconStyle';
import { UploadAvatar } from 'src/components/upload';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import Layout from 'src/layouts';
import axiosInstance from 'src/utils/axios';
import ProjectInfoEditor from 'src/widgets/ProjectInfoEditor';
import SwitchCard from 'src/widgets/SwitchCard';
import { BACKEND_URL } from '../utils/endpoints';
import { bool } from 'yup';
import { useSnackbar } from 'notistack';

interface WhitelistInfo {
  description?: string;
  discord?: string
  blockchain?: string
  mintPrice?: number
  collectionName: string
  totalSupply: number
  registrationActive: boolean
  twitter?: string
  mintDate?: Date,
  logo?: string;
}

const ProjectInfo = () => {
  const [file, setFile] = useState<File | null>(null);
  const [value, setValue] = useState<Date | null>(null);
  const [collectionName, setCollectionName] = useState<string | null>(null);
  const [discord, setDiscord] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [blockchain, setBlockchain] = useState<string | null>(null);
  const [mintPrice, setMintPrice] = useState<number | null>(null);
  const [totalSupply, setTotalSupply] = useState<number | null>(null);
  const [registrationActive, setregistrationActive] = useState<boolean | null>(null);
  const [twitter, setTwitter] = useState<string | null>(null);
  const [mintDate, setMintDate] = useState<Date | null>(null);
  const [logo, setLogo] = useState<string | null>(null);
  const [link, setLink] = useState<string | null>(null);
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar } = useSnackbar();

  const getProjectSettings = useCallback(async () => {
    const jwt = getCookie('jwt-token');
    if (jwt) {
      const currentWl = localStorage.getItem('whitelistId');
      const response = await axiosInstance.get(`${BACKEND_URL}analytics/whitelistInfo?whitelistId=${currentWl}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      if (response.data.data) {
        setCollectionName(response.data.data.collectionName);
        setLogo(response.data.data.logo);
        setBlockchain(response.data.data.blockchain);
        setDiscord(response.data.data.discord);
        setDescription(response.data.data.description);
        setMintDate(response.data.data.mintDate);
        setMintPrice(response.data.data.mintPrice);
        setregistrationActive(response.data.data.registrationActive);
        setTotalSupply(response.data.data.totalSupply);
        setTwitter(response.data.data.twitter);
        setLink(`https://app.slise.xyz/collection/${response.data.data.link}`);
      }
    }
  }, [isMountedRef]);

  const updateWhitelistInfo = async () => {
    let formData = new FormData();
    if(file)
      formData.append('file', file!);
    formData.append('registrationActive', registrationActive!.toString());
    formData.append('description', description!);
    formData.append('mintDate', mintDate!.toString());
    formData.append('collectionName', collectionName!);
    formData.append('twitter', twitter!);
    formData.append('discord', discord!);
    formData.append('mintPrice', mintPrice!.toString());
    formData.append('totalSupply', totalSupply!.toString());
    formData.append('blockchain', blockchain!.toString());
    const jwt = getCookie('jwt-token');
    const whitelistId = localStorage.getItem('whitelistId');
    const response = await axiosInstance.put(`${BACKEND_URL}analytics/whitelistInfo/${whitelistId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${jwt}`
      },
      data: formData
    });
    if(response.status === 200){
      enqueueSnackbar('Saved!');
    }
  }

  const onChangeCollectionName = (props: any) => {
    setCollectionName(props.target.value);
  }
  const onChangeMintDate = (props: any) => {
    console.log(props);
    setMintDate(props);
  }
  const onChangeTwitter = (props: any) => {
    setTwitter(props.target.value);
  }
  const onChangeDiscord = (props: any) => {
    setDiscord(props.target.value);
  }
  const onChangeMintPrice = (props: any) => {
    setMintPrice(props.target.value);
  }
  const onChangeTotalSupply = (props: any) => {
    setTotalSupply(props.target.value);
  }
  const onChangeDescription = (props: any) => {
    console.log(props);
    setDescription(props);
  }
  const onChangeBlockchain = (props: any) => {
    setBlockchain(props.target.value);
  }
  const onChangeRegistrationActive = (props: any) => {
    setregistrationActive(registrationActive !== true);
    console.log(registrationActive)
  }

  const setFileAndLogo = (file: File) => {
    setFile(file);
    setLogo(file.webkitRelativePath);
  }

  useEffect(() => {
    console.log('render')
    getProjectSettings();
  }, [getProjectSettings]);

  return (
    <Page
      sx={{
        minHeight: 'calc(100vh - 60px)',
        display: 'grid',
        gridTemplateRows: 'min-content 1fr min-content',
      }}
      title="Project Info"
    >
      <Typography align="left" variant="h3" mb={'14px'}>
        Project Info
      </Typography>
      <Grid container spacing={3}>
        <Grid item md={4}>
          <SwitchCard title="Registration is open" value={registrationActive}  onChange={onChangeRegistrationActive}/>
          <Card sx={{ mt: 4.25 }}>
            <CardContent sx={{ padding: 4.5 }}>
              <UploadAvatar
                file={logo || file}
                onDropAccepted={([e]) => setFile(e)}
                helperText={
                  <Typography component="p" sx={{ mt: 3, textAlign: 'center' }} color="GrayText" variant="caption">
                    Allowed *.jpeg, *.jpg, *.png, *.gif
                    <br/>
                    Max size of 3.1 MB
                  </Typography>
                }
              />
            </CardContent>
          </Card>
          <Card sx={{ mt: 4 }}>
            <CardContent sx={{ padding: '16px 24px 24px' }}>
              <Typography mb={1} variant="subtitle2">
                Blockchain
              </Typography>
              <TextField select fullWidth label="Select the chain" placeholder="Select the chain" value={blockchain} key={blockchain} onChange={onChangeBlockchain}>
                <MenuItem key={1} value="Ethereum">
                  Ethereum
                </MenuItem>
                <MenuItem key={2} value="Solana">
                  Solana
                </MenuItem>
                <MenuItem key={3} value="Polygon">
                  Polygon
                </MenuItem>
              </TextField>
            </CardContent>
          </Card>
          <Card sx={{ mt: 4 }}>
            <CardContent>
              <CopyClipboard value={link || ''} key={link} label="Public link"/>
            </CardContent>
          </Card>
        </Grid>
        <Grid item md={8}>
          <Card>
            <CardContent>
              <Grid container spacing={2}>
                <Grid mb={3} item md={6}>
                  <TextField autoFocus={true} type={'text'} fullWidth label="Collection Name" onChange={onChangeCollectionName}
                             value={collectionName} key={collectionName}/>
                </Grid>
                <Grid mb={3} item md={6}>
                  <DatePicker
                    label="Mint Date"
                    value={mintDate}
                    onChange={onChangeMintDate}
                    renderInput={(params) => <TextField {...params} fullWidth/>}
                  />
                </Grid>
                <Grid mb={3} item md={6}>
                  <TextField autoFocus={true} fullWidth label="Official Twitter" onChange={onChangeTwitter}
                             value={twitter} key={twitter}/>
                </Grid>
                <Grid mb={3} item md={6}>
                  <TextField autoFocus={true} fullWidth label="Official Discord Channel"
                             onChange={onChangeDiscord}
                             value={discord} key={discord}/>
                </Grid>
                <Grid mb={3} item md={6}>
                  <TextField autoFocus={true} fullWidth label="Mint Price" type={'number'}
                             onChange={onChangeMintPrice}
                             value={mintPrice} key={mintPrice}/>
                </Grid>
                <Grid mb={3} item md={6}>
                  <TextField autoFocus={true} fullWidth label="Total Supply" type={'number'}
                             onChange={onChangeTotalSupply}
                             value={totalSupply} key={totalSupply}/>
                </Grid>
              </Grid>
              <Typography variant="subtitle2" mb={0.75}>
                Description
              </Typography>
              <NoSsr defer>
                <ProjectInfoEditor description={description || ''} onChange={onChangeDescription}/>
              </NoSsr>
              <Stack direction="row" alignItems="center" justifyContent="flex-end">
                <Button
                  variant="contained"
                  sx={{
                    color: 'black',
                    backgroundColor: '#DDFF55',
                    ':hover': { opacity: '.6', backgroundColor: '#DDFF55' },
                  }}
                  onClick={updateWhitelistInfo}
                >
                  Save Info
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Stack alignItems="center">
            <Typography variant="subtitle2" mb={0.5}>
              Import your existing collection for analysis
            </Typography>
            <Typography variant="body2" mb={2.5}>
              You can import the list of wallets you collected as *.csv or a text file
            </Typography>
            <Button
              variant="contained"
              sx={{
                color: 'white',
                backgroundColor: '#131F0F',
                ':hover': { opacity: '.6', backgroundColor: '#131F0F' },
              }}
              startIcon={<SvgIconStyle src={`/assets/icons/ic_upload.svg/`} sx={{ width: 20, height: 20 }}/>}
            >
              Import from file
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Page>
  );
};

ProjectInfo.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

export default ProjectInfo;
