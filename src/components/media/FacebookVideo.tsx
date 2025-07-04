import React, { useEffect, useRef } from "react";

interface FacebookVideoProps {
  videoUrl: string;
  width?: number;
  showText?: boolean;
  className?: string;
}

export default function FacebookVideo({
  videoUrl,
  width = 560,
  showText = false,
  className = ""
}: FacebookVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Cargar el SDK de Facebook solo una vez
    if (!(window as any).FB) {
      const script = document.createElement("script");
      script.async = true;
      script.defer = true;
      script.crossOrigin = "anonymous";
      script.src = "https://connect.facebook.net/es_LA/sdk.js#xfbml=1&version=v19.0";
      document.body.appendChild(script);
      script.onload = () => {
        if ((window as any).FB && containerRef.current) {
          (window as any).FB.XFBML.parse(containerRef.current);
        }
      };
    } else if ((window as any).FB && containerRef.current) {
      (window as any).FB.XFBML.parse(containerRef.current);
    }
  }, [videoUrl, showText]);

  return (
    <div
      ref={containerRef}
      className={`w-full flex justify-center ${className}`}
    >
      <div
        className="fb-video rounded-xl shadow-lg w-full max-w-3xl"
        data-href={videoUrl}
        data-width={width}
        data-show-text={showText}
      ></div>
    </div>
  );
} 