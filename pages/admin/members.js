// pages/admin/members.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Members = () => {
  const [members, setMembers] = useState([]);

  // 컴포넌트가 마운트되면 회원 목록을 API로부터 가져오기
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get('/api/members'); // 회원 목록 API 호출
        setMembers(response.data); // 받은 회원 목록 상태에 저장
      } catch (error) {
        console.error('회원 목록을 가져오는 데 실패했습니다:', error);
      }
    };

    fetchMembers();
  }, []); // 컴포넌트가 마운트될 때 한 번만 실행

  return (
    <div>
      <h1>회원 목록</h1>
      <table>
        <thead>
          <tr>
            <th>이름</th>
            <th>이메일</th>
            <th>가입일</th>
            {/* 추가적으로 필요한 회원 정보 열을 추가하세요 */}
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <tr key={member._id}>
              <td>{member.name}</td>
              <td>{member.email}</td>
              <td>{new Date(member.createdAt).toLocaleDateString()}</td>
              {/* 추가적인 회원 정보 필드를 여기서 표시할 수 있습니다 */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Members;
// pages/admin/members.js
export default function MembersPage() {
  console.log('Members page is loaded!');
  return <h1>회원 목록 페이지</h1>;
}
// pages/admin/members.js
export default function MembersPage() {
  return <h1>회원 목록 페이지</h1>;
}
