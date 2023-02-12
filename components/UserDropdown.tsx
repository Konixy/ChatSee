import { useUser } from '@/userContext';
import React from 'react';
import Dropdown, { Option } from 'react-dropdown';
const options: Option[] = [
  {
    label: 'Settings',
    value: 'settings',
  },
  {
    label: 'Logout',
    value: 'logout',
    className: 'bg-red-300',
  },
];

const defaultAvatar = 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg';

export default function UserDropdown() {
  const { user } = useUser();
  return (
    <div>
      <Dropdown options={options} className={`bg-[url("${user?.avatarUrl || defaultAvatar}")] rounded-full`} value="" />
    </div>
  );
}
