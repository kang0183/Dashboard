'use strict';
const SEED_EQUIP = [
  {
    "id": 1,
    "year": 2026,
    "month": 1,
    "mgr": "엄태일",
    "content": "간이자동화_외용기조립기 - 진공발생기 개조",
    "status": "완료",
    "amt": 9.7,
    "note": "입생로랑WEST 쿠션 대응 건"
  },
  {
    "id": 2,
    "year": 2026,
    "month": 1,
    "mgr": "표인필",
    "content": "설비개선_겔마스크 카토너 투입부 제거를 통한 Capa 상승",
    "status": "완료",
    "amt": null,
    "note": "투입부 제거를 통한 Capa 상승, 기존 작업자 Upper 벨트 사용으로 Capa 하락"
  },
  {
    "id": 3,
    "year": 2026,
    "month": 1,
    "mgr": "표인필",
    "content": "설비개선_피딩라벨러 근접센서 적용을 통한 가동율 증가",
    "status": "완료",
    "amt": null,
    "note": "기존 라벨러 비접촉센서로 컨베이어 동일색상 적용시 센서 미감지 이슈 有"
  },
  {
    "id": 4,
    "year": 2026,
    "month": 1,
    "mgr": "심규철",
    "content": "아누아 캡슐 미스트 30ml Capa 향상을 위한 생산 이관 건",
    "status": "완료",
    "amt": null,
    "note": "전용 지그, 충전 노즐, 셔틀 컨베이어, 어태치 컨베이어 제작"
  },
  {
    "id": 5,
    "year": 2026,
    "month": 1,
    "mgr": "심규철",
    "content": "에스크 컴퍼니 캡핑 틀어짐 개선의 건",
    "status": "완료",
    "amt": null,
    "note": "캡핑 지그 변경을 통한 틀어짐 최소화"
  },
  {
    "id": 6,
    "year": 2026,
    "month": 1,
    "mgr": "심규철",
    "content": "패드 충전 헤드 개발의 건",
    "status": "완료",
    "amt": null,
    "note": "패드(레이온) 함침 지연으로 인한 BPM 저감, 충전 방식 변경 검토 중 ( 추가 확인 필요 )"
  },
  {
    "id": 7,
    "year": 2026,
    "month": 2,
    "mgr": "강정우",
    "content": "누액 방지를 위한 노즐 제작 건",
    "status": "완료",
    "amt": null,
    "note": "노즐 플레이트와 노즐 길이를 맞춰 설비로 떨어지는 누액 최소화"
  },
  {
    "id": 8,
    "year": 2026,
    "month": 2,
    "mgr": "강정우",
    "content": "고온충전기 프로그램 변경을 통한 Capa 상승",
    "status": "완료",
    "amt": null,
    "note": "고온3라인 캡 공급부 프로그램 수정을 통해 택타임 감소"
  },
  {
    "id": 9,
    "year": 2026,
    "month": 2,
    "mgr": "엄태일",
    "content": "튜브 가압탱크 적용 건",
    "status": "완료",
    "amt": null,
    "note": "가압호퍼 -> 가압탱크 적용하여 loss 감소"
  },
  {
    "id": 10,
    "year": 2026,
    "month": 2,
    "mgr": "심규철",
    "content": "평택_1 H테이핑기 Z축 범위 확대 개조의 건",
    "status": "완료",
    "amt": null,
    "note": "소형 아웃박스(더파운더즈,YSL) 사용을 위한 가이드 절곡 및 환봉 변경"
  },
  {
    "id": 11,
    "year": 2026,
    "month": 3,
    "mgr": "심규철",
    "content": "평택_1 에어로졸 펌프 실링기 도입의 건",
    "status": "완료",
    "amt": null,
    "note": "올리브영 캡슐 미스트 긴급 생산 대응의 건"
  },
  {
    "id": 12,
    "year": 2026,
    "month": 3,
    "mgr": "엄태일",
    "content": "내용기링프레스 6대 도입",
    "status": "완료",
    "amt": null,
    "note": ""
  },
  {
    "id": 13,
    "year": 2026,
    "month": 3,
    "mgr": "표인필",
    "content": "평택_2 켄뷰 아이패치 캡핑기 적용건",
    "status": "완료",
    "amt": null,
    "note": "켄뷰 아이패치 특이용기로 전용 컨베이어 제작을 통한 캡핑설비 적용"
  },
  {
    "id": 14,
    "year": 2026,
    "month": 4,
    "mgr": "심규철",
    "content": "전공장 중량저울 조건부 라벨 인쇄 개조 건",
    "status": "완료",
    "amt": 12.8,
    "note": "아웃박스 포장 시 반제품 누락 및 과투입 방지를 위한 설비 개조 건"
  }
];
const SEED_INWON = [
  {
    "id": 23,
    "year": 2026,
    "no": 23,
    "type": "자동화",
    "category": "파우더",
    "mgr": "김재훈",
    "name": "4Cavity 젤리돔타정기 도입",
    "equip": "젤리돔타정기",
    "headcount": 2,
    "amt": 440.0,
    "receiving": "2024-10",
    "months_elapsed": 19,
    "recovery_rate": 0.3287,
    "monthly": {
      "1": 11.24,
      "2": 17.22,
      "3": 16.28
    }
  },
  {
    "id": 24,
    "year": 2026,
    "no": 24,
    "type": "자동화",
    "category": "스틱밤",
    "mgr": "심규철",
    "name": "화성_5 조절형 멀티 홀더 개발",
    "equip": "멀티홀더",
    "headcount": 0,
    "amt": 140.0,
    "receiving": "2025-02",
    "months_elapsed": 15,
    "recovery_rate": 0.3934,
    "monthly": {
      "1": 2.89,
      "2": 1.06,
      "3": 1.12
    }
  },
  {
    "id": 25,
    "year": 2026,
    "no": 25,
    "type": "자동화",
    "category": "립글로즈",
    "mgr": "표인필",
    "name": "평택 2공장 립글로즈 충포장 3개라인 증설",
    "equip": "립글로즈충전기1",
    "headcount": 0,
    "amt": 360.0,
    "receiving": "2025-02",
    "months_elapsed": 15,
    "recovery_rate": 0.3304,
    "monthly": {
      "1": 10.58,
      "2": 3.37
    }
  },
  {
    "id": 26,
    "year": 2026,
    "no": 26,
    "type": "자동화",
    "category": "립글로즈",
    "mgr": "표인필",
    "name": "평택 2공장 립글로즈 충포장 3개라인 증설",
    "equip": "립글로즈충전기2",
    "headcount": 0,
    "amt": 360.0,
    "receiving": "2025-02",
    "months_elapsed": 15,
    "recovery_rate": 0.2776,
    "monthly": {
      "1": 19.13,
      "2": 3.57
    }
  },
  {
    "id": 27,
    "year": 2026,
    "no": 27,
    "type": "자동화",
    "category": "립글로즈",
    "mgr": "표인필",
    "name": "평택 2공장 립글로즈 충포장 3개라인 증설",
    "equip": "립글로즈충전기3",
    "headcount": 0,
    "amt": 291.0,
    "receiving": "2025-02",
    "months_elapsed": 15,
    "recovery_rate": 0.3324,
    "monthly": {
      "1": 8.38,
      "2": 1.14
    }
  },
  {
    "id": 30,
    "year": 2026,
    "no": 30,
    "type": "자동화",
    "category": "립글로즈",
    "mgr": "표인필",
    "name": "평택 2공장 립글로즈 충포장 3개라인 증설",
    "equip": "립글로즈 하면라벨러3",
    "headcount": 0,
    "amt": 39.5,
    "receiving": "2025-02",
    "months_elapsed": 15,
    "recovery_rate": 1.1373,
    "monthly": {
      "1": 3.72,
      "2": 0.54
    }
  },
  {
    "id": 31,
    "year": 2026,
    "no": 31,
    "type": "자동화",
    "category": "립글로즈",
    "mgr": "표인필",
    "name": "평택 2공장 립글로즈 충포장 3개라인 증설",
    "equip": "립글로즈 상면라벨러1",
    "headcount": 0,
    "amt": 34.0,
    "receiving": "2025-02",
    "months_elapsed": 15,
    "recovery_rate": 1.4311,
    "monthly": {
      "1": 4.38,
      "2": 1.5
    }
  },
  {
    "id": 32,
    "year": 2026,
    "no": 32,
    "type": "자동화",
    "category": "립글로즈",
    "mgr": "표인필",
    "name": "평택 2공장 립글로즈 충포장 3개라인 증설",
    "equip": "립글로즈 상면라벨러2",
    "headcount": 0,
    "amt": 34.0,
    "receiving": "2025-02",
    "months_elapsed": 15,
    "recovery_rate": 1.5014,
    "monthly": {
      "1": 7.8,
      "2": 1.58
    }
  },
  {
    "id": 33,
    "year": 2026,
    "no": 33,
    "type": "자동화",
    "category": "립글로즈",
    "mgr": "표인필",
    "name": "평택 2공장 립글로즈 충포장 3개라인 증설",
    "equip": "립글로즈 상면라벨러3",
    "headcount": 0,
    "amt": 34.0,
    "receiving": "2025-02",
    "months_elapsed": 15,
    "recovery_rate": 1.3231,
    "monthly": {
      "1": 3.45,
      "2": 0.55
    }
  },
  {
    "id": 37,
    "year": 2026,
    "no": 37,
    "type": "자동화",
    "category": "파우더",
    "mgr": "김재훈",
    "name": "파우더 자동조립기 및 단상자반전기 도입건",
    "equip": "파우더조립기(2대)",
    "headcount": 2,
    "amt": 66.0,
    "receiving": "2025-02",
    "months_elapsed": 15,
    "recovery_rate": 0.5046,
    "monthly": {}
  },
  {
    "id": 38,
    "year": 2026,
    "no": 38,
    "type": "자동화",
    "category": "파우더",
    "mgr": "김재훈",
    "name": "파우더 자동조립기 및 단상자반전기 도입건",
    "equip": "파우더조립기(2대)",
    "headcount": 2,
    "amt": 66.0,
    "receiving": "2025-02",
    "months_elapsed": 15,
    "recovery_rate": 0.4956,
    "monthly": {}
  },
  {
    "id": 39,
    "year": 2026,
    "no": 39,
    "type": "자동화",
    "category": "파우더",
    "mgr": "김재훈",
    "name": "파우더 자동조립기 및 단상자반전기 도입건",
    "equip": "파우더조립기(4대)",
    "headcount": 2,
    "amt": 82.0,
    "receiving": "2025-02",
    "months_elapsed": 15,
    "recovery_rate": 0.5679,
    "monthly": {}
  },
  {
    "id": 40,
    "year": 2026,
    "no": 40,
    "type": "자동화",
    "category": "파우더",
    "mgr": "김재훈",
    "name": "파우더 자동조립기 및 단상자반전기 도입건",
    "equip": "파우더조립기(1대)",
    "headcount": 1,
    "amt": 33.0,
    "receiving": "2025-02",
    "months_elapsed": 15,
    "recovery_rate": 0.5211,
    "monthly": {
      "2": 2.2,
      "3": 4.22
    }
  },
  {
    "id": 41,
    "year": 2026,
    "no": 41,
    "type": "자동화",
    "category": "립글로즈",
    "mgr": "표인필",
    "name": "파우더 자동조립기 및 단상자반전기 도입건",
    "equip": "방향정렬기(2대)_평택2",
    "headcount": 2,
    "amt": 48.0,
    "receiving": "2025-02",
    "months_elapsed": 15,
    "recovery_rate": 1.026,
    "monthly": {
      "2": 1.43
    }
  },
  {
    "id": 42,
    "year": 2026,
    "no": 42,
    "type": "자동화",
    "category": "립글로즈",
    "mgr": "표인필",
    "name": "파우더 자동조립기 및 단상자반전기 도입건",
    "equip": "방향정렬기(2대)_평택2",
    "headcount": 2,
    "amt": 48.0,
    "receiving": "2025-02",
    "months_elapsed": 15,
    "recovery_rate": 0.8067,
    "monthly": {
      "2": 1.51
    }
  },
  {
    "id": 43,
    "year": 2026,
    "no": 43,
    "type": "자동화",
    "category": "립글로즈",
    "mgr": "표인필",
    "name": "파우더 자동조립기 및 단상자반전기 도입건",
    "equip": "방향정렬기(2대)_평택2",
    "headcount": 2,
    "amt": 48.0,
    "receiving": "2025-02",
    "months_elapsed": 15,
    "recovery_rate": 0.7379,
    "monthly": {
      "2": 0.49
    }
  },
  {
    "id": 44,
    "year": 2026,
    "no": 44,
    "type": "자동화",
    "category": "기초",
    "mgr": "박진욱",
    "name": "파우더 자동조립기 및 단상자반전기 도입건",
    "equip": "방향정렬기(2대)_1공장",
    "headcount": 2,
    "amt": 48.0,
    "receiving": "2025-02",
    "months_elapsed": 15,
    "recovery_rate": 0.1669,
    "monthly": {}
  },
  {
    "id": 45,
    "year": 2026,
    "no": 45,
    "type": "자동화",
    "category": "기초",
    "mgr": "엄태일",
    "name": "파우더 자동조립기 및 단상자반전기 도입건",
    "equip": "방향정렬기_미니쿠션반전기",
    "headcount": 1,
    "amt": 24.0,
    "receiving": "2025-02",
    "months_elapsed": 15,
    "recovery_rate": 0.3523,
    "monthly": {
      "1": 2.0,
      "2": 3.6,
      "3": 0.7,
      "4": 0.3
    }
  },
  {
    "id": 51,
    "year": 2026,
    "no": 51,
    "type": "증설투자",
    "category": "기초",
    "mgr": "박진욱",
    "name": "평택_1_12노즐 기초 충/포장라인 증설",
    "equip": "기초 12노즐 출정기 충전기1",
    "headcount": 0,
    "amt": 350.0,
    "receiving": "2025-03",
    "months_elapsed": 14,
    "recovery_rate": 0.1905,
    "monthly": {
      "1": 18.16,
      "2": 16.27
    }
  },
  {
    "id": 52,
    "year": 2026,
    "no": 52,
    "type": "증설투자",
    "category": "기초",
    "mgr": "박진욱",
    "name": "평택_1_12노즐 기초 충/포장라인 증설",
    "equip": "기초 12노즐 봉합라벨러1",
    "headcount": 0,
    "amt": 17.0,
    "receiving": "2025-03",
    "months_elapsed": 14,
    "recovery_rate": 4.7872,
    "monthly": {
      "1": 22.28,
      "2": 20.02,
      "3": 14.44,
      "4": 20.91
    }
  },
  {
    "id": 53,
    "year": 2026,
    "no": 53,
    "type": "증설투자",
    "category": "기초",
    "mgr": "박진욱",
    "name": "평택_1_12노즐 기초 충/포장라인 증설",
    "equip": "기초 12노즐 충전기2",
    "headcount": 0,
    "amt": 350.0,
    "receiving": "2025-06",
    "months_elapsed": 11,
    "recovery_rate": 0.1515,
    "monthly": {
      "1": 19.76,
      "2": 9.73,
      "3": 20.45,
      "4": 16.62
    }
  },
  {
    "id": 54,
    "year": 2026,
    "no": 54,
    "type": "증설투자",
    "category": "기초",
    "mgr": "박진욱",
    "name": "평택_1_12노즐 기초 충/포장라인 증설",
    "equip": "기초 12노즐 봉합라벨러 2",
    "headcount": 0,
    "amt": 17.0,
    "receiving": "2025-06",
    "months_elapsed": 11,
    "recovery_rate": 4.1524,
    "monthly": {
      "1": 24.21,
      "2": 12.15,
      "3": 25.04,
      "4": 20.43
    }
  },
  {
    "id": 55,
    "year": 2026,
    "no": 55,
    "type": "증설투자",
    "category": "기초",
    "mgr": "박진욱",
    "name": "평택_1_6노즐 대용량 기초 충/포장라인 증설(22라인)",
    "equip": "기초 12노즐 봉합라벨러 3",
    "headcount": 0,
    "amt": 17.0,
    "receiving": "2025-04",
    "months_elapsed": 13,
    "recovery_rate": 1.1946,
    "monthly": {
      "1": 2.17,
      "2": 2.36,
      "3": 3.32
    }
  },
  {
    "id": 56,
    "year": 2026,
    "no": 56,
    "type": "증설투자",
    "category": "기초",
    "mgr": "박진욱",
    "name": "평택_1_6노즐 향수 기초 충/포장라인 증설",
    "equip": "향수 기초충전기1",
    "headcount": 2,
    "amt": 600.0,
    "receiving": "2025-05",
    "months_elapsed": 12,
    "recovery_rate": 0.3593,
    "monthly": {
      "1": 70.68,
      "2": 26.51,
      "3": 50.38,
      "4": 68.48
    }
  },
  {
    "id": 57,
    "year": 2026,
    "no": 57,
    "type": "증설투자",
    "category": "기초",
    "mgr": "박진욱",
    "name": "평택_1_6노즐 향수 기초 충/포장라인 증설",
    "equip": "향수 봉합라벨러1",
    "headcount": 0,
    "amt": 17.0,
    "receiving": "2025-05",
    "months_elapsed": 12,
    "recovery_rate": 0.5988,
    "monthly": {
      "1": 2.01,
      "2": 0.68,
      "3": 1.4,
      "4": 1.94
    }
  },
  {
    "id": 58,
    "year": 2026,
    "no": 58,
    "type": "증설투자",
    "category": "기초",
    "mgr": "박진욱",
    "name": "평택_1_6노즐 향수 기초 충/포장라인 증설",
    "equip": "향수 봉합라벨러2",
    "headcount": 0,
    "amt": 17.0,
    "receiving": "2025-05",
    "months_elapsed": 12,
    "recovery_rate": 0.1706,
    "monthly": {}
  },
  {
    "id": 60,
    "year": 2026,
    "no": 60,
    "type": "증설투자",
    "category": "기초",
    "mgr": "박진욱",
    "name": "평택_1_기초 패드 충/포장라인 증설(19라인)",
    "equip": "기초 패드 봉합라벨러2",
    "headcount": 0,
    "amt": 17.0,
    "receiving": "2025-02",
    "months_elapsed": 15,
    "recovery_rate": 0.9601,
    "monthly": {
      "1": 1.66,
      "2": 1.35
    }
  },
  {
    "id": 61,
    "year": 2026,
    "no": 61,
    "type": "자동화",
    "category": "파우더",
    "mgr": "표인필",
    "name": "평택_2 모노파우더 생산성향상 라인자동화",
    "equip": "용기공급 피더",
    "headcount": 1,
    "amt": 54.1,
    "receiving": "2025-02",
    "months_elapsed": 15,
    "recovery_rate": 0.0602,
    "monthly": {}
  },
  {
    "id": 62,
    "year": 2026,
    "no": 62,
    "type": "자동화",
    "category": "파우더",
    "mgr": "김재훈",
    "name": "화성_3_파우더 팬 클리닝 자동화_1차(1대)",
    "equip": "파우더 팬클리너장치",
    "headcount": 2,
    "amt": 145.0,
    "receiving": "2025-03",
    "months_elapsed": 14,
    "recovery_rate": 0.2455,
    "monthly": {
      "1": 3.9,
      "2": 6.89,
      "3": 10.09,
      "4": 2.84
    }
  },
  {
    "id": 63,
    "year": 2026,
    "no": 63,
    "type": "증설투자",
    "category": "스틱",
    "mgr": "심규철",
    "name": "화성_5 고온 충/포장 자동라인 개발_1대",
    "equip": "고온 2라인",
    "headcount": 0,
    "amt": 356.6,
    "receiving": "2025-03",
    "months_elapsed": 14,
    "recovery_rate": 0.4958,
    "monthly": {
      "1": 18.5,
      "2": 22.17
    }
  },
  {
    "id": 65,
    "year": 2026,
    "no": 65,
    "type": "자동화",
    "category": "에어쿠션",
    "mgr": "엄태일",
    "name": "에어쿠션 DN컴퍼니 이지듀 인라인 화",
    "equip": "자동라인 공정개선",
    "headcount": 4,
    "amt": null,
    "receiving": "2025-04",
    "months_elapsed": 13,
    "recovery_rate": null,
    "monthly": {
      "2": 3.1
    }
  },
  {
    "id": 67,
    "year": 2026,
    "no": 67,
    "type": "자동화",
    "category": "기초",
    "mgr": "박진욱",
    "name": "다이슨 품목 확대에 따른 간이자동화설비 제작",
    "equip": "다이슨",
    "headcount": 2,
    "amt": 70.0,
    "receiving": "2025-04",
    "months_elapsed": 13,
    "recovery_rate": 0.2153,
    "monthly": {
      "2": 3.14,
      "3": 2.82
    }
  },
  {
    "id": 68,
    "year": 2026,
    "no": 68,
    "type": "자동화",
    "category": "에어쿠션",
    "mgr": "엄태일",
    "name": "화성_5_에어쿠션 하면라벨러 도입 (4대)",
    "equip": "에어쿠션 하면라벨러 & 비전검사기 1",
    "headcount": 4,
    "amt": 49.1,
    "receiving": "2025-05",
    "months_elapsed": 12,
    "recovery_rate": 0.6947,
    "monthly": {
      "1": 10.0,
      "2": 4.8,
      "3": 2.3,
      "4": 0.1
    }
  },
  {
    "id": 69,
    "year": 2026,
    "no": 69,
    "type": "자동화",
    "category": "하이드로겔",
    "mgr": "박진욱",
    "name": "하이드로겔 마스크시트 포장라인 (1)",
    "equip": "하이드로겔 라벨러1",
    "headcount": 0,
    "amt": 17.0,
    "receiving": "2025-04",
    "months_elapsed": 13,
    "recovery_rate": 2.201,
    "monthly": {
      "3": 7.8
    }
  },
  {
    "id": 70,
    "year": 2026,
    "no": 70,
    "type": "자동화",
    "category": "하이드로겔",
    "mgr": "박진욱",
    "name": "하이드로겔 마스크시트 포장라인 (2)",
    "equip": "하이드로겔 라벨러2",
    "headcount": 0,
    "amt": 17.0,
    "receiving": "2025-04",
    "months_elapsed": 13,
    "recovery_rate": 2.451,
    "monthly": {
      "3": 7.8
    }
  },
  {
    "id": 71,
    "year": 2026,
    "no": 71,
    "type": "자동화",
    "category": "하이드로겔",
    "mgr": "박진욱",
    "name": "하이드로겔 마스크시트 포장라인 (2)",
    "equip": "하이드로겔 라벨러3",
    "headcount": 0,
    "amt": 17.0,
    "receiving": "2025-04",
    "months_elapsed": 13,
    "recovery_rate": 2.3637,
    "monthly": {
      "3": 7.8
    }
  },
  {
    "id": 72,
    "year": 2026,
    "no": 72,
    "type": "자동화",
    "category": "하이드로겔",
    "mgr": "박진욱",
    "name": "하이드로겔 마스크시트 포장라인 (4)",
    "equip": "하이드로겔 라벨러4",
    "headcount": 0,
    "amt": 17.0,
    "receiving": "2025-04",
    "months_elapsed": 13,
    "recovery_rate": 2.2658,
    "monthly": {
      "3": 7.8
    }
  },
  {
    "id": 73,
    "year": 2026,
    "no": 73,
    "type": "자동화",
    "category": "하이드로겔",
    "mgr": "박진욱",
    "name": "하이드로겔 마스크시트 포장라인 (5)",
    "equip": "하이드로겔 라벨러5",
    "headcount": 0,
    "amt": 17.0,
    "receiving": "2025-04",
    "months_elapsed": 13,
    "recovery_rate": 2.4154,
    "monthly": {
      "3": 7.8
    }
  },
  {
    "id": 74,
    "year": 2026,
    "no": 74,
    "type": "자동화",
    "category": "기초",
    "mgr": "박진욱",
    "name": "평택_2_하이드로겔마스크 파우치 투입자동화",
    "equip": "하이드로겔 파우치 투입자동화",
    "headcount": 0,
    "amt": 270.0,
    "receiving": "2025-05",
    "months_elapsed": 12,
    "recovery_rate": 0.0,
    "monthly": {}
  },
  {
    "id": 75,
    "year": 2026,
    "no": 75,
    "type": "자동화",
    "category": "에어쿠션",
    "mgr": "엄태일",
    "name": "화성_5_에어쿠션 내용기 오픈 (1대)",
    "equip": "어에쿠션 내용기공급기 1",
    "headcount": 1,
    "amt": 110.0,
    "receiving": "2025-06",
    "months_elapsed": 11,
    "recovery_rate": 0.2074,
    "monthly": {
      "1": 6.0,
      "2": 6.2,
      "3": 6.9,
      "4": 6.0
    }
  },
  {
    "id": 76,
    "year": 2026,
    "no": 76,
    "type": "자동화",
    "category": "에어쿠션",
    "mgr": "엄태일",
    "name": "화성_5_에어쿠션 내용기 오픈 (1대)",
    "equip": "에어쿠션 내용기공급기 2",
    "headcount": 1,
    "amt": 110.0,
    "receiving": "2025-06",
    "months_elapsed": 11,
    "recovery_rate": 0.2029,
    "monthly": {
      "1": 4.0,
      "2": 3.7,
      "3": 4.3,
      "4": 4.0
    }
  },
  {
    "id": 77,
    "year": 2026,
    "no": 77,
    "type": "자동화",
    "category": "에어쿠션",
    "mgr": "엄태일",
    "name": "화성_1_미니제품 용기공급 공정 자동화 (1대)",
    "equip": "에어쿠션 내용기공급기12(미니)",
    "headcount": 3,
    "amt": 150.0,
    "receiving": "2025-05",
    "months_elapsed": 12,
    "recovery_rate": 0.172,
    "monthly": {
      "1": 2.0,
      "2": 4.6,
      "3": 6.6,
      "4": 4.7
    }
  },
  {
    "id": 78,
    "year": 2026,
    "no": 78,
    "type": "자동화",
    "category": "립글로즈",
    "mgr": "표인필",
    "name": "평택_2_립글로즈 12노즐 연속 카토너 도입 (3개소라인)",
    "equip": "립글로즈 연속카토너 1",
    "headcount": 2,
    "amt": 275.0,
    "receiving": "2025-06",
    "months_elapsed": 11,
    "recovery_rate": 0.5963,
    "monthly": {
      "1": 24.87,
      "2": 8.85,
      "4": 1.0
    }
  },
  {
    "id": 79,
    "year": 2026,
    "no": 79,
    "type": "자동화",
    "category": "립글로즈",
    "mgr": "표인필",
    "name": "평택_2_립글로즈 12노즐 연속 카토너 도입 (3개소라인)",
    "equip": "립글로즈 연속카토너 2,3",
    "headcount": 4,
    "amt": 550.0,
    "receiving": "2025-11",
    "months_elapsed": 6,
    "recovery_rate": 0.1647,
    "monthly": {
      "1": 36.19,
      "2": 8.07,
      "3": 19.71,
      "4": 23.5
    }
  },
  {
    "id": 80,
    "year": 2026,
    "no": 80,
    "type": "자동화",
    "category": "하이드로겔",
    "mgr": "표인필",
    "name": "하이드로겔 포장라인 카토너설비 도입 및 개조",
    "equip": "하이드로겔 카토너 1,2",
    "headcount": 0,
    "amt": 53.0,
    "receiving": "2026-01",
    "months_elapsed": 4,
    "recovery_rate": 0.0,
    "monthly": {
      "3": 23.4,
      "4": 7.8
    }
  },
  {
    "id": 81,
    "year": 2026,
    "no": 81,
    "type": "자동화",
    "category": "쿠션",
    "mgr": "엄태일",
    "name": "화성_5_에어쿠션 하면라벨러 도입 (4대)",
    "equip": "에어쿠션 하면라벨러 & 비전검사기 2",
    "headcount": 0,
    "amt": 51.0,
    "receiving": "2025-10",
    "months_elapsed": 7,
    "recovery_rate": 0.1373,
    "monthly": {
      "1": 3.0,
      "2": 3.7,
      "3": 4.5,
      "4": 3.7
    }
  },
  {
    "id": 82,
    "year": 2026,
    "no": 82,
    "type": "자동화",
    "category": "스틱",
    "mgr": "심규철",
    "name": "화성_5 스틱밤 캡핑 자동 공급 자동화_2대",
    "equip": "스틱밤 캡핑자동공급기 1대",
    "headcount": 1,
    "amt": 69.0,
    "receiving": "2025-08",
    "months_elapsed": 9,
    "recovery_rate": 0.0094,
    "monthly": {
      "1": 0.65,
      "2": 0.2,
      "3": -0.02,
      "4": -0.02
    }
  },
  {
    "id": 84,
    "year": 2026,
    "no": 84,
    "type": "자동화",
    "category": "립글로즈",
    "mgr": "표인필",
    "name": "평택_2_립글로즈 용기/ 솔대 공급 자동화 (7개소라인, 2set)",
    "equip": "부자재 용기 솔대공급장치",
    "headcount": 5,
    "amt": 720.0,
    "receiving": "2025-09",
    "months_elapsed": 8,
    "recovery_rate": 0.2039,
    "monthly": {
      "1": 42.82,
      "2": 11.56,
      "3": 13.69,
      "4": 16.8
    }
  },
  {
    "id": 86,
    "year": 2026,
    "no": 86,
    "type": "자동화",
    "category": "파우더",
    "mgr": "김재훈",
    "name": "평택_2_파우더 팬 클리닝 자동화_1차(5대)",
    "equip": "팬클리너장치 3대",
    "headcount": 6,
    "amt": 450.0,
    "receiving": "2025-08",
    "months_elapsed": 9,
    "recovery_rate": 0.4404,
    "monthly": {
      "1": 68.73,
      "2": 63.6,
      "3": 60.0,
      "4": 81.02
    }
  },
  {
    "id": 87,
    "year": 2026,
    "no": 87,
    "type": "자동화",
    "category": "스틱",
    "mgr": "심규철",
    "name": "화성_5 클렌징밤 충/포장 자동라인 구축_1대",
    "equip": "고온충전 3라인",
    "headcount": 0,
    "amt": 450.0,
    "receiving": "2025-09",
    "months_elapsed": 8,
    "recovery_rate": 0.0,
    "monthly": {
      "2": 9.73,
      "3": 15.57,
      "4": 15.9
    }
  },
  {
    "id": 88,
    "year": 2026,
    "no": 88,
    "type": "자동화",
    "category": "기초",
    "mgr": "박진욱",
    "name": "단상자 플랩 구조 변경을 통한 자동화 (아누아)",
    "equip": "기초 1라인 (단상자 변경)",
    "headcount": 0,
    "amt": 0.0,
    "receiving": "2025-06",
    "months_elapsed": 11,
    "recovery_rate": null,
    "monthly": {
      "2": 5.27,
      "3": 2.04
    }
  },
  {
    "id": 89,
    "year": 2026,
    "no": 89,
    "type": "자동화",
    "category": "립글로즈",
    "mgr": "표인필",
    "name": "립글로즈 소용량 충전을 위한 설비개조",
    "equip": "립글로즈 소용량 충전개선",
    "headcount": 4,
    "amt": 67.8,
    "receiving": "2025-06",
    "months_elapsed": 11,
    "recovery_rate": 0.327,
    "monthly": {
      "1": 4.5
    }
  },
  {
    "id": 90,
    "year": 2026,
    "no": 90,
    "type": "자동화",
    "category": "에어쿠션",
    "mgr": "엄태일",
    "name": "화성_1_미니제품 포장라인 카토너 (1대)",
    "equip": "에어쿠션 카토너(미니)",
    "headcount": 3,
    "amt": 120.0,
    "receiving": "2025-11",
    "months_elapsed": 6,
    "recovery_rate": 0.1183,
    "monthly": {
      "1": 3.0,
      "2": 5.8,
      "3": 7.9,
      "4": 1.5
    }
  },
  {
    "id": 96,
    "year": 2026,
    "no": 96,
    "type": "자동화",
    "category": "파우더",
    "mgr": "김재훈",
    "name": "이동식 파우더 프레스",
    "equip": "자동 조립기2_비전기반 파우더 프레스",
    "headcount": 0,
    "amt": 65.0,
    "receiving": "2025-12",
    "months_elapsed": 5,
    "recovery_rate": 0.0,
    "monthly": {
      "2": 3.46,
      "3": 2.73,
      "4": 2.48
    }
  },
  {
    "id": 98,
    "year": 2026,
    "no": 98,
    "type": "자동화",
    "category": "하이드로겔",
    "mgr": "표인필",
    "name": "단상자, 파우치 피딩라벨러 개발건",
    "equip": "쿠션/하이드로겔 피딩라벨러",
    "headcount": 0,
    "amt": 25.8,
    "receiving": "2025-11",
    "months_elapsed": 6,
    "recovery_rate": 0.0,
    "monthly": {}
  },
  {
    "id": 100,
    "year": 2026,
    "no": 100,
    "type": "자동화",
    "category": "기초",
    "mgr": "엄태일",
    "name": "이동식 반전기",
    "equip": "이동식 반전기",
    "headcount": 0,
    "amt": 4.8,
    "receiving": "2025-10",
    "months_elapsed": 7,
    "recovery_rate": 1.0417,
    "monthly": {
      "1": 2.0,
      "2": 1.3,
      "3": 0.5,
      "4": 0.7
    }
  },
  {
    "id": 101,
    "year": 2026,
    "no": 101,
    "type": "자동화",
    "category": "립류",
    "mgr": "엄태일",
    "name": "립 하면라벨러 제작",
    "equip": "립류 하면라벨러",
    "headcount": 0,
    "amt": 29.5,
    "receiving": "2025-11",
    "months_elapsed": 6,
    "recovery_rate": 0.2814,
    "monthly": {
      "1": 3.0,
      "2": 9.0,
      "3": 3.0,
      "4": 5.5
    }
  },
  {
    "id": 102,
    "year": 2026,
    "no": 102,
    "type": "자동화",
    "category": "에어쿠션",
    "mgr": "엄태일",
    "name": "간이자동화_고정식프레스",
    "equip": "내용기 링프레스2호기",
    "headcount": 0,
    "amt": 2.5,
    "receiving": "2025-11",
    "months_elapsed": 6,
    "recovery_rate": null,
    "monthly": {
      "1": 15.0,
      "2": 9.0,
      "3": 2.0,
      "4": 1.7
    }
  },
  {
    "id": 119,
    "year": 2026,
    "no": 119,
    "type": "자동화",
    "category": "",
    "mgr": "",
    "name": "에어쿠션 고정식 프레스",
    "equip": "에어쿠션 고정식 프레스",
    "headcount": 0,
    "amt": 2.8,
    "receiving": "2025-10",
    "months_elapsed": 7,
    "recovery_rate": 0.0,
    "monthly": {}
  },
  {
    "id": 129,
    "year": 2026,
    "no": 129,
    "type": "자동화",
    "category": "에어쿠션",
    "mgr": "엄태일",
    "name": "간이자동화_외용기조립기진공발생기개조(제품: 입생로랑웨스트)",
    "equip": "외용기조립기 3호기",
    "headcount": 0,
    "amt": 9.5,
    "receiving": "",
    "months_elapsed": null,
    "recovery_rate": 0.2737,
    "monthly": {
      "1": 2.6,
      "2": 5.0,
      "3": 3.7,
      "4": 1.0
    }
  },
  {
    "id": 130,
    "year": 2026,
    "no": 130,
    "type": "자동화",
    "category": "튜브",
    "mgr": "엄태일",
    "name": "간이자동화_소용량매거진교체 (2월)",
    "equip": "튜브1, 2 호기",
    "headcount": 0,
    "amt": 17.0,
    "receiving": "",
    "months_elapsed": null,
    "recovery_rate": 0.0,
    "monthly": {
      "2": 4.4,
      "3": 6.7,
      "4": 4.0
    }
  },
  {
    "id": 131,
    "year": 2026,
    "no": 131,
    "type": "자동화",
    "category": "하이드로겔",
    "mgr": "표인필",
    "name": "피딩라벨러",
    "equip": "피딩라벨러 2대",
    "headcount": 0,
    "amt": null,
    "receiving": "",
    "months_elapsed": null,
    "recovery_rate": null,
    "monthly": {
      "2": 2.17,
      "3": 2.17,
      "4": 2.17
    }
  },
  {
    "id": 132,
    "year": 2026,
    "no": 132,
    "type": "자동화",
    "category": "에어쿠션",
    "mgr": "엄태일",
    "name": "간이자동화_내용기링프레스(6대)",
    "equip": "내용기 링프레스 1,7,8,9,10,12 호기",
    "headcount": 0,
    "amt": 18.0,
    "receiving": "2026년 0",
    "months_elapsed": null,
    "recovery_rate": null,
    "monthly": {
      "3": 5.3,
      "4": 1.5
    }
  },
  {
    "id": 133,
    "year": 2026,
    "no": 133,
    "type": "자동화",
    "category": "기초",
    "mgr": "심규철",
    "name": "아누아 캡슐 미스트 30ml 생산 이관(평택)",
    "equip": "",
    "headcount": 0,
    "amt": null,
    "receiving": "2026-02",
    "months_elapsed": null,
    "recovery_rate": null,
    "monthly": {
      "3": 19.98,
      "4": 13.39
    }
  },
  {
    "id": 133064,
    "year": 2026,
    "no": 133,
    "type": "자동화",
    "category": "기초",
    "mgr": "심규철",
    "name": "아누아 캡슐 미스트 30ml 라벨 자동 부착",
    "equip": "",
    "headcount": 0,
    "amt": null,
    "receiving": "2026-02",
    "months_elapsed": null,
    "recovery_rate": null,
    "monthly": {
      "4": 2.09
    }
  }
];
module.exports = { SEED_EQUIP, SEED_INWON };
