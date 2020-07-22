/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import * as React from 'react';
import { Grid } from '@material-ui/core';
import Sidebar from './SideBar';
import Header from './Header';
import QueryConsoleIcon from './SvgIcons/QueryConsoleIcon';
import SwaggerIcon from './SvgIcons/SwaggerIcon';

const navigationItems = [
  // { id: 1, name: 'Cluster Manager', link: '/' },
  { id: 1, name: 'Query Console', link: '/', icon: <QueryConsoleIcon/> },
  { id: 2, name: 'Swagger REST API', link: 'help', target: '_blank', icon: <SwaggerIcon/> }
];

const Layout = (props) => {
  const hash = `/${window.location.hash.split('/')[1]}`;
  const routeObj = navigationItems.find((obj)=>{ return obj.link === hash;});

  const [selectedId, setSelectedId] = React.useState(routeObj?.id || 1);
  const sidebarOpenState = !(localStorage.getItem('pinot_ui:sidebarState') === 'false');
  const [openSidebar, setOpenSidebar] = React.useState(sidebarOpenState);

  const highlightSidebarLink = (id: number) => {
    setSelectedId(id);
  };

  const showHideSideBarHandler = () => {
    const newSidebarState = !openSidebar;
    localStorage.setItem('pinot_ui:sidebarState', newSidebarState.toString());
    setOpenSidebar(newSidebarState);
  };

  return (
    <Grid container direction="column">
      <Header
        highlightSidebarLink={highlightSidebarLink}
        showHideSideBarHandler={showHideSideBarHandler}
        openSidebar={openSidebar}
        {...props}
      />
      <Grid item xs={12}>
        <Grid container>
          <Grid item>
            <Sidebar
              list={navigationItems}
              showMenu={openSidebar}
              selectedId={selectedId}
              highlightSidebarLink={highlightSidebarLink}
            />
          </Grid>
          {props.children}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Layout;