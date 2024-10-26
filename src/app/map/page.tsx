// src/app/map/page.tsx
"use client";

import dynamic from "next/dynamic";
import React from "react";

// NaverMap 컴포넌트를 동적 로딩하고, ssr을 비활성화하여 클라이언트에서만 로드
const NaverMap = dynamic(() => import("../../components/NaverMap"), {
  ssr: false,
});

export default function MapPage() {
  return (
    <div>
      <h1>네이버 지도 페이지</h1>
      <NaverMap />
    </div>
  );
}
