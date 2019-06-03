import React from 'react';
import loadable from '@loadable/component';

export const Navbar = loadable(() => import('./Navbar/Navbar'), {
  fallback: <div style={{ height: '75px', backgroundColor: '#343a40', wifth: '100%' }} />,
});

export const NavLink = loadable(() => import('./NavLink/NavLink'));

export const Dropbox = loadable(() => import('./Dropbox/Dropbox'));

export const Button = loadable(() => import('./Dropbox/Button'));

export const SearchBar = loadable(() => import('./SearchBar/SearchBar'), {
  fallback: (
    <div style={{ width: '350px', height: '35px', borderRadius: '20px', backgroundColor: '#3d434b', margin: '10px' }} />
  ),
});
