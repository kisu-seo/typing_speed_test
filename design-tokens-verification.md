# 디자인 토큰 CSS 반영 상세 검토 결과

## 1. 색상(Colors) 토큰 - ✅ 완벽

### 변수 정의
| 토큰 | style-guide 값 | CSS 변수 | 상태 |
|-----|--------------|---------|------|
| neutral-900 | #121212 | --neutral-900: #121212 | ✅ |
| neutral-800 | #262626 | --neutral-800: #262626 | ✅ |
| neutral-500 | #717178 | --neutral-500: #717178 | ✅ |
| neutral-400 | #949497 | --neutral-400: #949497 | ✅ |
| neutral-0 | #FFFFFF | --neutral-0: #ffffff | ✅ |
| blue-600 | #177DFF | --blue-600: #177dff | ✅ |
| blue-400 | #4CA6FF | --blue-400: #4ca6ff | ✅ |
| red-500 | #D64D5B | --red-500: #d64d5b | ✅ |
| green-500 | #4DD67B | --green-500: #4dd67b | ✅ |
| yellow-400 | #F4DC73 | --yellow-400: #f4dc73 | ✅ |

**평가:** 모든 색상 토큰 정의 완벽 (10/10)

### 하드코딩된 색상값
- ⚠️ `rgba(255, 255, 255, 0.05)`, `rgba(255, 255, 255, 0.1)` 등 투명도 포함 rgba 값 다수 사용
- ⚠️ `rgba(23, 125, 255, 0.4)` - blue-600 기반이나 변수화 안됨
- ⚠️ `rgba(18, 18, 18, 0.4)` - neutral-900 기반이나 변수화 안됨

---

## 2. 타이포그래피(Typography) 토큰 - ⚠️ 부분 문제

### Text Preset 변수 정의 검토

#### Preset 1 (및 변형들)
| Preset | 필요 속성 | 정의 상태 |
|--------|---------|---------|
| Preset 1 | font-size, weight, line-height, letter-spacing | ✅ 완벽 |
| Preset 1 (Mobile) | font-size, weight, line-height, letter-spacing | ✅ 완벽 |
| Preset 1 (Regular) | font-size, weight, line-height, letter-spacing | ✅ 완벽 |
| Preset 1 (Regular) (Mobile) | font-size, weight, line-height, letter-spacing | ✅ 완벽 |

#### Preset 2-6
| Preset | 필요 속성 | 정의 상태 |
|--------|---------|---------|
| Preset 2 | size, weight, line-height, letter-spacing | ✅ 완벽 |
| Preset 3 | size, weight, line-height, letter-spacing | ✅ 완벽 |
| Preset 3 (Mobile) | size, weight, line-height, letter-spacing | ✅ 완벽 |
| Preset 3 (SemiBold) | size, weight, line-height, letter-spacing | ✅ 완벽 |
| Preset 4 | size, weight, line-height, letter-spacing | ✅ 완벽 |
| Preset 5 | size, weight, line-height, letter-spacing | ✅ 완벽 |
| Preset 6 | size, weight, line-height, letter-spacing | ✅ 완벽 |

**평가:** 모든 Text Preset 변수 정의 완벽 (11/11)

### 유틸리티 클래스 검토

✅ 모든 11개 유틸리티 클래스 정의됨:
- `.text-preset-1` ~ `.text-preset-6`
- `.text-preset-1-mobile`
- `.text-preset-1-regular`
- `.text-preset-1-regular-mobile`
- `.text-preset-3-mobile`
- `.text-preset-3-semibold`

✅ 모든 클래스가 올바른 변수 사용

❌ **사용되지 않는 유틸리티 클래스:** 11개 모두 HTML에서 미사용 (직접 인라인 스타일링만 사용 중)

### 하드코딩된 타이포그래피값

| 요소 | 값 | 토큰 적용 여부 |
|-----|-----|------------|
| .personal-best-badge | font-size: 14px | ❌ (토큰 없음) |
| .stat-value | font-size: 28px | ❌ (토큰 없음) |
| .select-wrapper select | font-size: 14px | ❌ (토큰 없음) |
| .overlay-subtext | font-size: 14px | ❌ (토큰 없음) |
| .btn-primary | font-size: 14px | ❌ (토큰 없음) |
| .result-label | font-size: 11px | ❌ (토큰 없음) |
| .result-value | font-size: 24px | ❌ (토큰 없음) |
| .stat-label | letter-spacing: 0.5px | ❌ (토큰 없음) |
| .result-label | letter-spacing: 1px | ❌ (토큰 없음) |
| various | line-height 직접 입력 | ⚠️ 변수 사용 중 |

**문제:** 14px, 28px, 24px, 11px 등이 하드코딩되어 있으나 style-guide에 정의된 프리셋과 정확히 매핑되지 않음

---

## 3. Spacing(간격) 토큰 - ✅ 완벽

### 변수 정의
모든 15개 spacing 토큰 정의됨:
- spacing-0 ~ spacing-1800 (0px ~ 140px)

✅ **정의:** 완벽 (15/15)

### 사용 현황
- ✅ 주요 요소에서 변수 사용 (padding, margin, gap)
- ⚠️ 직접 입력값: `16px`, `10px`, `5px`, `2px` 등 간헐적 사용

**직접 입력된 값:**
- Line 203: `padding: 16px 16px 32px 16px` → 변수로 변경 권장
- Line 207: `gap: 32px` → `var(--spacing-400)` 사용 가능
- Line 245: `margin-right: 10px` → `var(--spacing-125)` 사용 가능
- Line 356: `right: 16px` → `var(--spacing-200)` 사용 가능
- Line 362-364: `5px` 3개 → 토큰 없음 (radius-4 또는 신규 토큰 필요)
- Line 527: `2px` → `var(--spacing-25)` 또는 신규 토큰

---

## 4. Radius(라디우스) 토큰 - ✅ 완벽

### 변수 정의
모든 10개 radius 토큰 정의됨:
- radius-0, 4, 6, 8, 10, 12, 16, 20, 24, full

✅ **정의:** 완벽 (10/10)

### 사용 현황
- ✅ 주요 border-radius에서 변수 사용
- ⚠️ 직접 입력값: `5px` (border 스타일 정의용, 토큰 없음)

**직접 입력된 값:**
- Line 362-364: `.select-arrow`의 `5px` border 조정값 (하드코딩, 토큰 없음)

---

## 5. 색상 투명도 토큰 - ❌ 미정의

### 하드코딩된 rgba 색상값 (11개)

| 색상 | 투명도 | 위치 | 추천 변수명 |
|-----|------|------|----------|
| white (255,255,255) | 0.05 | border | --white-alpha-05 |
| white | 0.1 | background/border | --white-alpha-10 |
| white | 0.03 | background/border | --white-alpha-03 |
| white | 0.2 | border/hover | --white-alpha-20 |
| white | 0.02 | border | --white-alpha-02 |
| blue-600 (23,125,255) | 0.4 | shadow/gradient | --blue-600-alpha-40 |
| blue-600 | 0.1 | gradient | --blue-600-alpha-10 |
| blue-600 | 0.2 | border | --blue-600-alpha-20 |
| black (18,18,18) | 0.4 | background | --black-alpha-40 |
| black | 0.3 | shadow | --black-alpha-30 |

**현황:** 투명도 토큰 없음. 모두 inline rgba 값으로 하드코딩됨

---

## 6. 유틸리티 클래스 사용 현황

### 정의됨
✅ 11개 모두 정의

### 실제 사용
❌ HTML에서 사용 예시: **0개**
- 대신 CSS에서 직접 변수를 각 요소에 적용하는 방식 사용
- `.text-preset-*` 클래스들은 정의되었으나 미사용

### 권장사항
- 유틸리티 클래스를 HTML에서 활용하거나
- CSS에서만 사용할 거면 클래스 제거 가능

---

## 종합 평가

| 범주 | 변수 정의 | 실제 사용 | 하드코딩 | 평가 |
|-----|---------|---------|--------|------|
| **색상** | ✅ 10/10 | ✅ 거의 완벽 | ⚠️ rgba 투명도 | A- |
| **타이포그래피** | ✅ 11/11 | ⚠️ 부분 미사용 | ⚠️ 14px 등 | A |
| **Spacing** | ✅ 15/15 | ✅ 대부분 사용 | ⚠️ 10px, 16px | A |
| **Radius** | ✅ 10/10 | ✅ 대부분 사용 | ⚠️ 5px | A |
| **투명도** | ❌ 0/10 | ❌ 미정의 | ❌ 모두 하드코딩 | D |

---

## 개선 권장사항 (우선순위순)

### 🔴 높음
1. **색상 투명도 토큰 추가**
   ```css
   --white-alpha-02: rgba(255, 255, 255, 0.02);
   --white-alpha-03: rgba(255, 255, 255, 0.03);
   --white-alpha-05: rgba(255, 255, 255, 0.05);
   --white-alpha-10: rgba(255, 255, 255, 0.1);
   --white-alpha-20: rgba(255, 255, 255, 0.2);
   --blue-600-alpha-10: rgba(23, 125, 255, 0.1);
   --blue-600-alpha-40: rgba(23, 125, 255, 0.4);
   --blue-600-alpha-20: rgba(23, 125, 255, 0.2);
   --black-alpha-30: rgba(0, 0, 0, 0.3);
   --black-alpha-40: rgba(18, 18, 18, 0.4);
   ```

### 🟡 중간
2. **직접 입력된 spacing 값을 변수로 변경**
   - `16px` → `var(--spacing-200)`
   - `10px` → `var(--spacing-125)`
   - `32px` → `var(--spacing-400)`

3. **14px, 24px, 28px, 11px 타입의 font-size 정리**
   - 기존 프리셋에 정확히 매핑되지 않으므로 문서화 필요
   - 또는 신규 프리셋으로 style-guide 업데이트

### 🟢 낮음
4. **유틸리티 클래스 사용 결정**
   - 현재 정의만 되고 미사용 상태
   - HTML에서 사용하거나 CSS에서만 유지 중 선택

---

## 결론

**현황:** 기본 토큰(색상, 타이포그래피, 간격, 라디우스) 정의는 완벽하나, **색상 투명도** 토큰 미정의로 인한 하드코딩이 가장 큰 문제.

**즉시 조치:** 투명도 토큰 10개 추가 → 모든 rgba 값을 변수로 변경

**점진적 개선:** 직접 입력된 spacing 값 변수화, 타이포그래피 정리