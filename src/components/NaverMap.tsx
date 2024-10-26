// src/components/NaverMap.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";

const NaverMap = () => {
  const mapElement = useRef<HTMLDivElement>(null);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  // 네이버 지도 스크립트를 동적으로 로드하는 함수
  const loadNaverMapScript = () => {
    return new Promise<void>((resolve, reject) => {
      if (typeof window !== "undefined" && window.naver) {
        resolve(); // 스크립트가 이미 로드된 경우
        return;
      }

      const script = document.createElement("script");
      script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVER_MAP_API_KEY}`;
      script.async = true;
      script.onload = () => resolve(); // 로드 완료 시 resolve 호출
      script.onerror = () => reject(new Error("네이버 지도 스크립트 로드 실패"));
      document.head.appendChild(script);
    });
  };

  useEffect(() => {
    loadNaverMapScript()
      .then(() => setIsScriptLoaded(true))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    if (isScriptLoaded && mapElement.current && window.naver) {
      const map = new window.naver.maps.Map(mapElement.current, {
        center: new window.naver.maps.LatLng(37.5665, 126.9780),
        zoom: 10,
      });

      new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(37.5665, 126.9780),
        map,
      });
    }
  }, [isScriptLoaded]);

  return <div ref={mapElement} style={{ width: "100%", height: "400px" }} />;
};

export default NaverMap;
