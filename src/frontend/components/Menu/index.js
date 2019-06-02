import React from 'react';
import loadable from '@loadable/component';

export const Menu = loadable(() => import('./Menu'));

export const MenuLink = loadable(() => import('./MenuLink'), {
  fallback: (
    <div>
      <div style={{ width: '80px', height: '20px', backgroundColor: 'rgb(240,240,240)', margin: '5px' }} />
    </div>
  ),
});

export const MenuButton = loadable(() => import('./MenuButton'), {
  fallback: (
    <div style={{ width: '30px', height: '10px', backgroundColor: 'rgb(240,240,240)', borderRadius: '20px' }} />
  ),
});

export const MenuBody = loadable(() => import('./MenuBody'));

export const MenuHeader = loadable(() => import('./MenuHeader'));

export const SearchBarMenu = loadable(() => import('./SearchBarMenu'), {
  fallback: (
    <div style={{ width: '180px', height: '40px', backgroundColor: 'rgb(240,240,240)', borderRadius: '20px' }} />
  ),
});
