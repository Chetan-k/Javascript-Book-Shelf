// Node modules
import DockMonitor from 'redux-devtools-dock-monitor';
import LogMonitor from 'redux-devtools-log-monitor';
import React from 'react';
import { createDevTools } from 'redux-devtools';

// Component definition
export default createDevTools(
  <DockMonitor
    changePositionKey="ctrl-q"
    defaultIsVisible={false}
    defaultPosition="right"
    defaultSize={0.3}
    fluid
    toggleVisibilityKey="ctrl-h"
  >
    <LogMonitor
      expandActionRoot={false}
      expandStateRoot={false}
      theme="monokai"
    />
  </DockMonitor>,
);
