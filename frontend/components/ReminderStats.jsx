// Version: 4.5_04_05_005

import React, { useEffect, useState } from 'react';
import axios from 'axios';  
import { Card, CardContent } from './ui/card.jsx';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const ReminderStats = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    axios.get('/api/reminders/stats')
      .then(res => setStats(res.data))
      .catch(err => console.error('통계 로딩 오류:', err));
  }, []);

  if (!stats) return <p>통계를 불러오는 중입니다...</p>;

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-2xl font-bold">📊 최근 30일 알림 통계</h2>

      <Card>
        <CardContent className="p-4">
          <p>총 발송 수: {stats.최근30일.총발송}건</p>
          <p>성공: {stats.최근30일.총성공}건</p>
          <p>실패: {stats.최근30일.총실패}건</p>
          <p>대상 회원 수: {stats.최근30일.대상회원수}명</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold mb-2">📅 일별 발송 수</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stats.일자별통계}>
              <XAxis dataKey="날짜" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="발송수" fill="#3182ce" />
              <Bar dataKey="성공" fill="#38a169" />
              <Bar dataKey="실패" fill="#e53e3e" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReminderStats;
