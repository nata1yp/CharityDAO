import { useEffect } from "react";
const ModelViewer = require("@metamask/logo");

export default function MetaMaskIcon({ pageIsloading }) {
  useEffect(() => {
    if (!pageIsloading) {
      if (typeof window.ethereum !== "undefined") {
        loadMetamaskIcon();
      }
    }
  }, [pageIsloading]);

  const loadMetamaskIcon = () => {
    const viewer = ModelViewer({
      pxNotRatio: true,
      width: 75,
      height: 75,
      followMouse: false,
      slowDrift: false,
    });

    const container = document.getElementById("logo-container");
    container.appendChild(viewer.container);

    viewer.lookAt({ x: 100, y: 100 });
    viewer.setFollowMouse(true);
    viewer.stopAnimation();
  };

  return <div id="logo-container" />;
}
