// app/components/NaverMapHospitals.tsx
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
    const { naver } = window;

    // 사용자 위치 가져오기
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = new naver.maps.LatLng(
            position.coords.latitude,
            position.coords.longitude
          );

          // 지도 초기화
          const mapOptions = {
            center: userLocation,
            zoom: 15,
          };

          const mapInstance = new naver.maps.Map("map", mapOptions);
          setMap(mapInstance);

          // 사용자 위치 마커 표시
          new naver.maps.Marker({
            position: userLocation,
            map: mapInstance,
            icon: {
              content: '<div style="color: blue;">📍</div>',
            },
          });

          // 병원 검색 및 마커 추가
          searchNearbyHospitals(userLocation, mapInstance);
        },
        (error) => {
          console.error("Geolocation error:", error);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }, []);

  // 네이버 Place Search API를 사용하여 근처 병원 검색
  const searchNearbyHospitals = (location: any, mapInstance: any) => {
    const ps = new window.naver.maps.services.Places();

    ps.nearbySearch(
      {
        location,
        radius: 1000, // 1km 반경 내 검색
        keyword: "병원",
      },
      (status: any, response: any) => {
        if (status === window.naver.maps.services.Status.OK) {
          response.items.forEach((place: any) => {
            // 병원 위치에 마커 추가
            new naver.maps.Marker({
              position: new naver.maps.LatLng(place.point.y, place.point.x),
              map: mapInstance,
              title: place.name,
            });
          });
        } else {
          console.error("Place Search Error:", status);
        }
      }
    );
  };

  return <div id="map" style={{ width: "100%", height: "400px" }} />;
};

export default NaverMapHospitals;
