/**
 * Normalizes the port
 * @param val - Port
 * @returns Normalized port
 */
export const normalizePort = (val: string | number) => {
  if (typeof val === "string") {
    const port = parseInt(val, 10);
    if (isNaN(port)) {
      // named pipe
      return val;
    } else {
      return port;
    }
  } else if (typeof val === "number") {
    if (val >= 0) {
      // port number
      return val;
    }
  }

  return false;
};
