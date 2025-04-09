// Version: 4.5_04_05_001
import React from 'react';
import '../styles/global.css'; // 필요 시 스타일 파일 경로 수정

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
