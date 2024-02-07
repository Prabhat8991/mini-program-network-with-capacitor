import React, { useState, useEffect } from 'react';
import { Network } from '@capacitor/network';

const NetworkStatusComponent = () => {
  const [networkInfo, setNetworkInfo] = useState({
    connected: false,
    connectionType: null,
    connectionStrength: null
  });

  useEffect(() => {
    const networkStatusChangeListener = Network.addListener('networkStatusChange', status => {
      console.log('Network status changed', status);
      setNetworkInfo({
        connected: status.connected,
        connectionType: status.connectionType,
        connectionStrength: status.connectionStrength
      });
    });

    return () => {
      networkStatusChangeListener.remove();
    };
  }, []);

  const logCurrentNetworkStatus = async () => {
    const status = await Network.getStatus();
    console.log('Network status:', status);
    setNetworkInfo({
      connected: status.connected,
      connectionType: status.connectionType,
    });
  };

  useEffect(() => {
    logCurrentNetworkStatus();
  }, []);

  return (
    <div>
      <h1>Network Status</h1>
      <p>Connected: {networkInfo.connected ? 'Yes' : 'No'}</p>
      <p>Type: {networkInfo.connectionType}</p>
    </div>
  );
};

export default NetworkStatusComponent;
