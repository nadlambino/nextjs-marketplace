import { Divider, MenuItem } from '@mui/material';
import React, { MouseEventHandler } from 'react';

export type Item = {
  callback: MouseEventHandler;
  label: string;
  icon?: React.ReactNode;
};

type HeaderMenuItemProps = {
  items: Item[];
  label?: string;
};

export default function HeaderMenuItem({ items, label }: HeaderMenuItemProps) {
  return (
    <>
      {label && <Divider className="menu-item-label">{label}</Divider>}
      {items.map((item, i) => (
        <MenuItem
          key={i}
          dense
          className="menu-item"
          role="button"
          onClick={item.callback}
        >
          {item.icon}
          {item.label}
        </MenuItem>
      ))}
    </>
  );
}
