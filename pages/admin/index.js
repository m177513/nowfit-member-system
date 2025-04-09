// pages/admin/index.js
import React from 'react';
import Link from 'next/link';

const AdminHome = () => {
  return (
    <div>
      <h1>관리자 대시보드</h1>
      <div className="buttons">
        <Link href="./members">
          <button style={{ padding: '10px 20px', fontSize: '16px', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            회원 목록
          </button>
        </Link>
        {/* 추가적인 버튼들 */}
      </div>
    </div>
  );
};

export default AdminHome;
