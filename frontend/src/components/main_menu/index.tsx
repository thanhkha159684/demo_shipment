'use client';

import React, { useState } from 'react';
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Box,
} from '@mui/material';
import {
  PieChart,
  Computer,
  Inventory,
  Mail,
  Apps,
  ExpandLess,
  ExpandMore,
} from '@mui/icons-material';

interface MenuItem {
  key: string;
  icon: React.ReactNode;
  label: string;
  children?: MenuItem[];
}

const menuItems: MenuItem[] = [
  { key: '1', icon: <PieChart />, label: 'Option 1' },
  { key: '2', icon: <Computer />, label: 'Option 2' },
  { key: '3', icon: <Inventory />, label: 'Option 3' },
  {
    key: 'sub1',
    label: 'Navigation One',
    icon: <Mail />,
    children: [
      { key: '5', icon: null, label: 'Option 5' },
      { key: '6', icon: null, label: 'Option 6' },
      { key: '7', icon: null, label: 'Option 7' },
      { key: '8', icon: null, label: 'Option 8' },
    ],
  },
  {
    key: 'sub2',
    label: 'Navigation Two',
    icon: <Apps />,
    children: [
      { key: '9', icon: null, label: 'Option 9' },
      { key: '10', icon: null, label: 'Option 10' },
      {
        key: 'sub3',
        label: 'Submenu',
        icon: null,
        children: [
          { key: '11', icon: null, label: 'Option 11' },
          { key: '12', icon: null, label: 'Option 12' },
        ],
      },
    ],
  },
];

export default function MainMenu() {
  const [selectedKey, setSelectedKey] = useState('1');
  const [openKeys, setOpenKeys] = useState<string[]>([]);

  const handleClick = (key: string) => {
    setSelectedKey(key);
  };

  const handleToggle = (key: string) => {
    setOpenKeys(prev =>
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
    );
  };

  const renderMenuItem = (item: MenuItem, level = 0): React.ReactNode => {
    const hasChildren = item.children && item.children.length > 0;
    const isOpen = openKeys.includes(item.key);
    const isSelected = selectedKey === item.key;

    return (
      <Box key={item.key}>
        <ListItemButton
          selected={isSelected && !hasChildren}
          onClick={() =>
            hasChildren ? handleToggle(item.key) : handleClick(item.key)
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
