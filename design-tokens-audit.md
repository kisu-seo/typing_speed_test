# 디자인 토큰 검토 리포트

## 1. 색상(Colors) 토큰 검토

### ✅ 정의된 색상 토큰
| 토큰 | 값 | style-guide | CSS | 상태 |
|------|-----|----------|-----|------|
| neutral-900 | #121212 | ✅ | ✅ | 완벽 |
| neutral-800 | #262626 | ✅ | ✅ | 완벽 |
| neutral-500 | #717178 | ✅ | ✅ | 완벽 |
| neutral-400 | #949497 | ✅ | ✅ | 완벽 |
| neutral-0 | #FFFFFF | ✅ | ✅ (#ffffff) | 완벽 |
| blue-600 | #177DFF | ✅ | ✅ (#177dff) | 완벽 |
| blue-400 | #4CA6FF | ✅ | ✅ (#4ca6ff) | 완벽 |
| red-500 | #D64D5B | ✅ | ✅ (#d64d5b) | 완벽 |
| green-500 | #4DD67B | ✅ | ✅ (#4dd67b) | 완벽 |
| yellow-400 | #F4DC73 | ✅ | ✅ (#f4dc73) | 완벽 |

**결과: 모든 색상 토큰 정상 적용**

---

## 2. 타이포그래피(Typography) 토큰 검토

### 📋 Text Preset 사용 현황

| Preset | Font | Size | Weight | Line Height | Letter Spacing | CSS 적용 위치 | 상태 |
|--------|------|------|--------|-------------|--------|------------|------|
| Preset 1 | Sora Bold | 40px | 700 | 136% | 0.4px | ❌ 미사용 | 미정의 |
| Preset 1 (Mobile) | Sora Bold | 24px | 700 | 120% | 0.32px | ❌ 미사용 | 미정의 |
| Preset 1 (Regular) | Sora Regular | 40px | 400 | 136% | 0.4px | ❌ 미사용 | 미정의 |
| Preset 1 (Regular) (Mobile) | Sora Regular | 32px | 400 | 136% | 0.4px | ❌ 미사용 | 미정의 |
| Preset 2 | Sora Bold | 24px | 700 | 100% | 0px | ❌ 미사용 | 미정의 |
| Preset 3 | Sora Regular | 20px | 400 | 120% | -0.6px | ❌ 미사용 | 미정의 |
| Preset 3 (Mobile) | Sora Regular | 16px | 400 | 120% | -0.48px | ✅ #personal-best-display | 적용됨 |
| Preset 3 (SemiBold) | Sora SemiBold | 20px | 600 | 120% | -0.3px | ❌ 미사용 | 미정의 |
| Preset 4 | Sora Regular | 18px | 400 | 120% | -0.6px | ❌ 미사용 | 미정의 |
| Preset 5 | Sora Regular | 16px | 400 | 120% | -0.48px | ❌ 미사용 | 미정의 |
| Preset 6 | Sora Regular | 12px | 400 | 120% | 0px | ❌ 미사용 | 미정의 |

**문제점:**
- ⚠️ **11개 프리셋 중 1개만 적용** (Preset 3 Mobile)
- ⚠️ 나머지 10개 프리셋은 CSS 변수로 정의되지 않음
- ⚠️ 타이포그래피 일관성 부재

### 🔍 CSS에 임의로 정의된 타이포그래피

| 요소 | Font-Size | Font-Weight | Line-Height | Letter-Spacing | 설계안 대응 |
|-----|-----------|-------------|-------------|--------|----------|
| body | 기본 (16px 가정) | 400 | 1.5 | 기본값 | 미정의 |
| .stat-label | 12px | 600 | 기본값 | 0.5px | Preset 6 (0px)과 불일치 |
| .stat-value | 28px | 700 | 기본값 | 기본값 | **미정의 프리셋** |
| .results-heading | 32px | 700 | 기본값 | -0.5px | **미정의 프리셋** |
| .passage-container | 20px | 400 | 1.6 | -0.5px | Preset 3와 유사하지만 line-height 다름 |
| .btn-start | 16px | 700 | 기본값 | 기본값 | **미정의 프리셋** |
| .select-wrapper select | 14px | 600 | 기본값 | 기본값 | **미정의 프리셋** |

---

## 3. 간격(Spacing) 토큰 검토

### ✅ 정의된 간격 토큰
모든 15개 간격 토큰이 정상 정의됨 (spacing-0 ~ spacing-1800)

### 📊 CSS 사용 현황
| 토큰 | 사용 위치 | 상태 |
|-----|---------|------|
| spacing-0 | ✅ | 정의만 됨 (미사용) |
| spacing-25 | ✅ | margin-bottom (.stat-label) |
| spacing-50 | ✅ | margin-bottom (.stat-label) |
| spacing-75 | ✅ | gap (.passage-overlay) |
| spacing-100 | ✅ | margin-bottom (.results-heading), gap (.btn-primary) |
| spacing-125 | ❌ | 정의만 됨 (미사용) |
| spacing-150 | ✅ | padding (.select-wrapper select), padding (.btn-start), gap (.passage-overlay) |
| spacing-200 | ✅ | padding (.app-header), padding (.stats-panel), padding (.control-panel), etc. |
| spacing-250 | ✅ | padding (.select-wrapper select), padding (.result-card) |
| spacing-300 | ✅ | gap (.app-container), gap (.app-main), padding (.btn-primary) |
| spacing-400 | ✅ | padding (.select-wrapper select), padding (.btn-start), margin (.results-header) |
| spacing-500 | ✅ | padding (#results-screen) |
| spacing-600 | ❌ | 정의만 됨 (미사용) |
| spacing-800 | ❌ | 정의만 됨 (미사용) |
| spacing-1000 | ❌ | 정의만 됨 (미사용) |
| spacing-1200 | ❌ | 정의만 됨 (미사용) |
| spacing-1400 | ❌ | 정의만 됨 (미사용) |
| spacing-1600 | ❌ | 정의만 됨 (미사용) |
| spacing-1800 | ❌ | 정의만 됨 (미사용) |

**결과: 기본 간격은 잘 정의되어 있으나, 큰 간격은 미사용**

---

## 4. 라디우스(Radius) 토큰 검토

### ✅ 정의된 라디우스 토큰
모든 10개 라디우스 토큰이 정상 정의됨

### 📊 CSS 사용 현황
| 토큰 | 사용 위치 | 상태 |
|-----|---------|------|
| radius-0 | ✅ | 정의만 됨 (미사용) |
| radius-4 | ❌ | 정의만 됨 (미사용) |
| radius-6 | ❌ | 정의만 됨 (미사용) |
| radius-8 | ❌ | 정의만 됨 (미사용) |
| radius-10 | ❌ | 정의만 됨 (미사용) |
| radius-12 | ✅ | border-radius (.select-wrapper, .btn-start, .btn-primary) |
| radius-16 | ✅ | border-radius (.result-card) |
| radius-20 | ✅ | border-radius (.passage-outer-container, .passage-overlay) |
| radius-24 | ✅ | border-radius (#results-screen) |
| radius-full | ❌ | 정의만 됨 (미사용) |

**결과: 중간~큰 라디우스만 사용, 작은 라디우스는 미사용**

---

## 5. 주요 문제점 및 권장사항

### 🔴 **즉시 개선 필요**

#### 1. 타이포그래피 토큰 미정의
**문제:** 10개의 Text Preset이 CSS에 정의되지 않음
- 타이포그래피 일관성 부재
- 설계안과 구현체 불일치

**해결안:**
```css
/* Text Preset 1 */
.text-preset-1 {
  font-family: 'Sora', sans-serif;
  font-size: 40px;
  font-weight: 700;
  line-height: 136%;
  letter-spacing: 0.4px;
}

/* Text Preset 1 Mobile */
.text-preset-1-mobile {
  font-family: 'Sora', sans-serif;
  font-size: 24px;
  font-weight: 700;
  line-height: 120%;
  letter-spacing: 0.32px;
}

/* ... 이하 동일 */
```

#### 2. 임의로 정의된 타이포그래피
**문제:** `.stat-label`, `.stat-value`, `.results-heading` 등이 프리셋 없이 정의됨

| 요소 | 현재 | 권장 프리셋 |
|-----|------|----------|
| .stat-label | 12px, 600 | Preset 6 사용 (font-weight 600으로 조정 필요) |
| .stat-value | 28px, 700 | **신규 프리셋 필요** |
| .results-heading | 32px, 700 | Preset 1 (Regular) Mobile과 유사 (미세 조정) |
| .passage-container | 20px, 400 | Preset 3 (line-height 120% → 160% 수정) |
| .btn-start | 16px, 700 | **신규 프리셋 필요** 또는 Preset 5 확장 |

---

### 🟡 **개선 권장**

#### 3. 색상 사용 자동화 부재
**문제:** 일부 색상이 임의 값으로 지정됨
- 예: `rgba(255, 255, 255, 0.05)`, `rgba(23, 125, 255, 0.4)` 등

**권장:** 투명도 토큰 추가
```css
--neutral-0-alpha-05: rgba(255, 255, 255, 0.05);
--blue-600-alpha-40: rgba(23, 125, 255, 0.4);
```

#### 4. 미사용 토큰
- **Spacing:** spacing-125, 600, 800, 1000, 1200, 1400, 1600, 1800
- **Radius:** radius-4, 6, 8, 10, full

**권장:** 
- 소규모 프로젝트이므로 필수 토큰만 유지
- 또는 향후 확장을 위해 모두 보관

---

## 6. 요약

| 범주 | 정의 | 사용 | 일관성 | 평가 |
|-----|------|------|--------|------|
| **색상** | 10/10 ✅ | 10/10 ✅ | ✅ | **A** |
| **타이포그래피** | 1/11 ❌ | 1/11 ❌ | ❌ | **F** |
| **간격** | 15/15 ✅ | 11/15 ⚠️ | ✅ | **B+** |
| **라디우스** | 10/10 ✅ | 6/10 ⚠️ | ✅ | **B+** |

### 🎯 **최우선 개선 항목**
1. **11개 Text Preset을 CSS 변수로 정의** (필수)
2. **임의 타이포그래피를 프리셋에 매핑** (필수)
3. 색상 투명도 토큰화 (선택)
4. 미사용 토큰 정리 (선택)
