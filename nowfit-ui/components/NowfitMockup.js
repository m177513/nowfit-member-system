import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, Dumbbell, User } from "lucide-react";

export default function NowfitMockup() {
  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* 회원 카드 */}
      <Card className="rounded-2xl shadow-md">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <User className="w-6 h-6" />
            <h2 className="text-xl font-semibold">회원 관리</h2>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            신규 등록, 수정, 검색, 출석 체크까지 한 곳에서 관리
          </p>
          <Button className="mt-4 w-full">회원 목록 보기</Button>
        </CardContent>
      </Card>

      {/* PT 수업 카드 */}
      <Card className="rounded-2xl shadow-md">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <Dumbbell className="w-6 h-6" />
            <h2 className="text-xl font-semibold">PT 수업</h2>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            예약, 완료, 취소 상태 관리 + 잔여횟수 자동 차감
          </p>
          <Button className="mt-4 w-full">PT 수업 달력</Button>
        </CardContent>
      </Card>

      {/* 출석 및 운동 기록 카드 */}
      <Card className="rounded-2xl shadow-md">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <CalendarDays className="w-6 h-6" />
            <h2 className="text-xl font-semibold">출석 & 운동 기록</h2>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            출석 통계와 운동 히스토리 그래프까지 한번에!
          </p>
          <Button className="mt-4 w-full">통계 보기</Button>
        </CardContent>
      </Card>
    </div>
  );
}
