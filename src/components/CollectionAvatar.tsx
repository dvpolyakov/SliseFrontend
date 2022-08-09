// hooks
import useAuth from '../hooks/useAuth';
// utils
import createAvatar from '../utils/createAvatar';
//
import Avatar, { Props as AvatarProps } from './Avatar';

type CollectionAvatar ={
  logo?: string
};

type CProps = CollectionAvatar & AvatarProps;

// ----------------------------------------------------------------------

export default function CollectionAvatar({ ...other }: CProps) {
  const { user } = useAuth();

  return (
    <Avatar
      src={other?.logo}
      alt={user?.displayName}
      color={user?.photoURL ? 'default' : createAvatar(user?.displayName).color}
      {...other}
    >
      {createAvatar(user?.displayName).name}
    </Avatar>
  );
}
