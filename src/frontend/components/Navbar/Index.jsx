import React from 'react';
import loadable from '@loadable/component';

//TODO: especificar esqueleto para fallback
export const Navbar = loadable(() => import('./Navbar/Navbar'), { fallback: <div>Carregando Navbar....</div> });

//TODO: especificar esqueleto para fallback
export const NavLink = loadable(() => import('./NavLink/NavLink'), { fallback: <div>Carregando Link....</div> });

//TODO: especificar esqueleto para fallback
export const Dropbox = loadable(() => import('./Dropbox/Dropbox'), { fallback: <div>Carregando Dropbox....</div> });

//TODO: especificar esqueleto para fallback
export const Button = loadable(() => import('./Dropbox/Button'), { fallback: <div>Carregando Button....</div> });

//TODO: especificar esqueleto para fallback
export const SearchBar = loadable(() => import('./SearchBar/SearchBar'), {
  fallback: <div>Carregando SearchBar....</div>,
});
