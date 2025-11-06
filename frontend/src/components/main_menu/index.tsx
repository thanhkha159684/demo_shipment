'use client';

import React, { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Box,
} from '@mui/material';
import {
  People,
  ShoppingCart,
  PersonAdd,
  LocalShipping,
  ExpandLess,
  ExpandMore,
} from '@mui/icons-material';

interface MenuItem {
  key: string;
  icon: React.ReactNode;
  label: string;
  href?: string;
  children?: MenuItem[];
}

const menuItems: MenuItem[] = [
  {
    key: 'user-management',
    icon: <People />,
    label: 'User Management',
    href: '/users',
  },
  {
    key: 'order-management',
    icon: <ShoppingCart />,
    label: 'Order Management',
    href: '/orders',
  },
  {
    key: 'customer-management',
    icon: <PersonAdd />,
    label: 'Customer Management',
    href: '/customers',
  },
  {
    key: 'shipment-management',
    icon: <LocalShipping />,
    label: 'Shipment Management',
    href: '/shipments',
  },
];

export default function MainMenu() {
  const router = useRouter();
  const pathname = usePathname();
  const [openKeys, setOpenKeys] = useState<string[]>([]);

  const handleClick = (item: MenuItem) => {
    if (item.href) {
      router.push(item.href);
    }
  };

  const handleToggle = (key: string) => {
    setOpenKeys(prev =>
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
    );
  };

  const isSelected = (item: MenuItem) => {
    return item.href === pathname;
  };

  const renderMenuItem = (item: MenuItem, level = 0): React.ReactNode => {
    const hasChildren = item.children && item.children.length > 0;
    const isOpen = openKeys.includes(item.key);
    const selected = isSelected(item);

    return (
      <Box key={item.key}>
        <ListItemButton
          selected={selected && !hasChildren}
          onClick={() =>
            hasChildren ? handleToggle(item.key) : handleClick(item)
          }
          sx={{
            pl: 2 + level * 2,
            color: 'white',
            '&:hover': {
              bgcolor: 'rgba(255, 255, 255, 0.1)',
            },
            '&.Mui-selected': {
              bgcolor: '#1890ff',
              '&:hover': {
                bgcolor: '#1890ff',
              },
            },
          }}
        >
          {item.icon && (
            <ListItemIcon sx={{ color: 'white', minWidth: 36 }}>
              {item.icon}
            </ListItemIcon>
          )}
          <ListItemText primary={item.label} />
          {hasChildren &&
            (isOpen ? (
              <ExpandLess sx={{ color: 'white' }} />
            ) : (
              <ExpandMore sx={{ color: 'white' }} />
            ))}
        </ListItemButton>
        {hasChildren && (
          <Collapse in={isOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {item.children!.map(child => renderMenuItem(child, level + 1))}
            </List>
          </Collapse>
        )}
      </Box>
    );
  };

  return (
    <List
      component="nav"
      sx={{
        width: '100%',
        color: 'white',
        '& .MuiListItemIcon-root': {
          color: 'white',
        },
      }}
    >
      {menuItems.map(item => renderMenuItem(item))}
    </List>
  );
}
