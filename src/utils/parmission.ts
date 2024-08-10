/**
 * 角度・加速度センサーのパーミッションをリクエストする関数
 */
export const requestPermission = async () => {
  // @ts-expect-error only safari propaty
  if (typeof DeviceMotionEvent.requestPermission === "function") {
    try {
      // @ts-expect-error only safari propaty
      const permissionState = await DeviceMotionEvent.requestPermission();
      if (permissionState !== "granted") {
        console.warn("Device Motion permission denied.");
      }
    } catch (error) {
      console.error("Error requesting Device Motion permission:", error);
    }
  }

  // @ts-expect-error only safari propaty
  if (typeof DeviceOrientationEvent.requestPermission === "function") {
    try {
      const permissionState =
        // @ts-expect-error only safari propaty
        await DeviceOrientationEvent.requestPermission();
      if (permissionState !== "granted") {
        console.warn("Device Orientation permission denied.");
      }
    } catch (error) {
      console.error("Error requesting Device Orientation permission:", error);
    }
  }
};
