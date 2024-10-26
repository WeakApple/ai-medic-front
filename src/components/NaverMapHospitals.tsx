// src/components/NaverMapHospitals.tsx
"use client";

import React, { useEffect, useState } from "react";

declare global {
  interface Window {
    naver: any;
  }
}

const NaverMapHospitals: React.FC = () => {
  const [map, setMap] = useState<any>(null);

  useEffect(() => {
    const loadNaverMapScript = () => {
      return new Promise<void>((resolve, reject) => {
        if (typeof window === "undefined" || window.naver?.maps) {
          resolve();
          return;
        }

        const script = document.createElement("script");
        script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVER_MAP_API_KEY}`;
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error("네이버 지도 스크립트 로드 실패"));
        document.head.appendChild(script);
      });
    };

    loadNaverMapScript()
      .then(() => {
        if (window.naver && window.naver.maps) {
          initMap();
        }
      })
      .catch((error) => console.error(error));
  }, []);

  const initMap = () => {
    const { naver } = window;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = new naver.maps.LatLng(
            position.coords.latitude,
            position.coords.longitude
          );

          const mapOptions = {
            center: userLocation,
            zoom: 15,
          };

          const mapInstance = new naver.maps.Map("map", mapOptions);
          setMap(mapInstance);

          new naver.maps.Marker({
            position: userLocation,
            map: mapInstance,
            icon: { content: '<div style="color: blue;">📍</div>' },
          });

          searchNearbyHospitals(userLocation, mapInstance);
        },
        (error) => {
          console.error("Geolocation error:", error);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const searchNearbyHospitals = (location: any, mapInstance: any) => {
    const { naver } = window;

    if (!naver?.maps?.services?.Places) {
      console.error("Places 객체를 찾을 수 없습니다.");
      return;
    }

    const ps = new naver.maps.services.Places();
    ps.nearbySearch(
      { location, radius: 1000, keyword: "병원" },
      (status: any, response: any) => {
        if (status === window.naver.maps.services.Status.OK && response?.items?.length) {
          response.items.forEach((place: any) => {
            new naver.maps.Marker({
              position: new naver.maps.LatLng(place.point.y, place.point.x),
              map: mapInstance,
              title: place.name,
            });
          });
        } else {
          console.error("병원 검색에 실패하였습니다.", status);
        }
      }
    );
  };

  return <div id="map" style={{ width: "100%", height: "100%" }} />;
};

export default NaverMapHospitals;
