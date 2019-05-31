import React from 'react';
import loadable from '@loadable/component';

//TODO: especificar esqueleto para fallback
export const Menu = loadable(() => import('./Menu'), { fallback: <div>Carregando Menu....</div> });

//TODO: especificar esqueleto para fallback
export const MenuLink = loadable(() => import('./MenuLink'), { fallback: <div>Carregando Menu....</div> });

//TODO: especificar esqueleto para fallback
export const MenuButton = loadable(() => import('./MenuButton'), { fallback: <div>Carregando Menu....</div> });

//TODO: especificar esqueleto para fallback
export const MenuBody = loadable(() => import('./MenuBody'), { fallback: <div>Carregando Menu....</div> });

//TODO: especificar esqueleto para fallback
export const MenuHeader = loadable(() => import('./MenuHeader'), { fallback: <div>Carregando Menu....</div> });

//TODO: especificar esqueleto para fallback
export const SearchBarMenu = loadable(() => import('./SearchBarMenu'), { fallback: <div>Carregando Menu....</div> });
