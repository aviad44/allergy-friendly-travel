
/**
 * Device information and capabilities module
 */

// Get device and connection information
export const getDeviceInfo = () => {
  const connection = 'connection' in navigator ? 
    (navigator as any).connection || 
    (navigator as any).mozConnection || 
    (navigator as any).webkitConnection : null;
  
  return {
    deviceMemory: 'deviceMemory' in navigator ? (navigator as any).deviceMemory : 'unknown',
    hardwareConcurrency: navigator.hardwareConcurrency || 'unknown',
    connection: connection ? {
      effectiveType: connection.effectiveType || 'unknown',
      saveData: connection.saveData || false,
      rtt: connection.rtt || 0,
      downlink: connection.downlink || 0
    } : 'unknown'
  };
};
