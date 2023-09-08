# [ Week 3 ] Search Clinical Trial 9팀

> **동료학습**을 통해서 팀에서 생각한 원티드 프리온보딩 프론트엔드 인턴십 선발 과제의 **Best Practice**를 만들고 제출해주세요

<img src = https://camo.githubusercontent.com/431cb39804ef7c333ffa8b0dfec7e24581654e84e3c8bcf91f64a43158c3156c/68747470733a2f2f7374617469632e77616e7465642e636f2e6b722f696d616765732f6576656e74732f323930392f62333539313861362e6a7067 />

## 프로젝트 소개

- 3주차 과제 내용을 구현한 Search Clinical Trial 프로젝트입니다.

- 사용자가 검색어 입력 시 해당 검색어와 유사한 검색어들을 추천해줍니다.

- 배포 링크: [링크](https://pre-onboarding-12th-3-9.vercel.app/)

## 팀원 소개

|                    [팀장] [윤영서](https://github.com/YeongseoYoon)                     |                        [김동구](https://github.com/kimdonggu42)                        |                        [김차미](https://github.com/Chaam2)                        |                        [이현우](https://github.com/hyunwlee-dev)                        |                        [최현웅](https://github.com/hwinkr)                        |                        [이재호](https://github.com/JaydenLee1116)                        |
| :-------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------: |
| <img src="https://avatars.githubusercontent.com/YeongseoYoon" width="130" height="130"> | <img src="https://avatars.githubusercontent.com/kimdonggu42" width="130" height="130"> | <img src="https://avatars.githubusercontent.com/Chaam2" width="130" height="130"> | <img src="https://avatars.githubusercontent.com/hyunwlee-dev" width="130" height="130"> | <img src="https://avatars.githubusercontent.com/hwinkr" width="130" height="130"> | <img src="https://avatars.githubusercontent.com/JaydenLee1116" width="130" height="130"> |

## 개발 환경

### Developement

<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white"/> <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white"/> <img src="https://img.shields.io/badge/React Router-CA4245?style=for-the-badge&logo=React Router&logoColor=white"> <img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=Axios&logoColor=white"/>

### Styling

<img src="https://img.shields.io/badge/styled component-DB7093?style=for-the-badge&logo=styled-components&logoColor=white"/>

### Convention

<img src="https://img.shields.io/badge/husky-brown?style=for-the-badge&logo=npm"> <img src="https://img.shields.io/badge/lint staged-white?style=for-the-badge&logo=npm"> <img src="https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint"> <img src="https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=white">

## 프로젝트 실행 방법

```
$ git clone git@github.com:wanted-internship-12-9/pre-onboarding-12th-3-9.git
$ npm install
$ npm start
```

## 디렉토리 구조

```
📦 src
 ┣ 📂 apis
 ┣ 📂 constants
 ┣ 📂 hooks
 ┃ ┣ 📂 useDebounce
 ┃ ┣ 📂 useInput
 ┃ ┗ 📂 useSearchResult
 ┣ 📂 pages
 ┃ ┗ 📂 home
 ┣ 📂 styles
 ┣ 📂 types
 ┣ 📂 utils
 ┣ 📜 App.tsx
 ┗ 📜 index.tsx
```

## Best Practice 논의

### Assignment 1. API호출을 통해 검색어 추천 기능 구현

**결론 : useSearchResult 훅으로 요청 api 관리하기**

- axios api요청 재사용성을 고려하여 axios instance를 사용하였습니다.
- useSearchResult훅에서 반환하는 data state를 이용하여 fetch한 데이터를 반환합니다.
- 추천 검색어 로딩 UI의 경우, 로딩 UI로 인한 깜빡임이 부각되므로 isLoading state를 제거하였습니다.

|  이름  | 의견                                                                                                                                    |
| :----: | :-------------------------------------------------------------------------------------------------------------------------------------- |
| 김동구 | - axios instance를 생성하여 useGetQuery hook에서 api 호출                                                                               |
| 김차미 | - axios instance로 api호출 및 캐싱 관리 <br> - 검색창 영역인 SearchBar 컴포넌트와 추천리스트 영역인 SearchSuggestionBox 컴포넌트로 분리 |
| 윤영서 | - axios 사용해 데이터 페칭 <br> - useCallback 이용해 데이터페칭 커스텀 훅 메모이제이션                                                  |
| 이현우 | - axios 사용 <br> - useSearchInput 훅 사용                                                                                              |
| 최현웅 | - useDebounceSearch 훅을 사용 <br> - 훅 내부에서 debounce를 사용한 api 호출을 같이 처리                                                 |
| 이재호 | - axios 사용 <br> - useGetQuery 커스텀 훅 구현 및 사용                                                                                  |

### Assignment 2. API 호출별로 로컬 캐싱 구현 (+expire time)

**결론 : 데이터 특성을 고려하여 cacheStorage로 캐싱**

- cacheStorage 사용 이유
  - cacheStorage는 localStorage 및 sessionStorage 에 비해 용량이 크고 비동기로 처리됩니다.(블로킹이 없음)
  - 이번 프로젝트에선 데이터의 특성 상, DB 단의 데이터 자체가 자주 변경되지 않으므로 cacheStorage에 데이터를 캐싱하기로 결정하였습니다.
  - DB 단의 데이터가 자주 변경 되는 경우에 브라우저의 storage를 사용하는 경우 stale한 데이터를 보여줄 수도 있는 위험이 있지만, 데이터의 특성을 고려했을 때 자주 변하지 않는 데이터라고 판단해서 브라우저의 storage를 사용하기로 결정했습니다.
- cache api 및 cacheStorage를 사용하여 util함수로 getCacheData, setCacheData를 구현하였습니다.
  - 캐싱된 response의 header에 expireDate를 설정하여 만료여부를 확인할 수 있도록 하였습니다.
  - 캐시된 응답 없는 경우, expire header가 없는 경우, 만료된 캐시인 경우 null을 반환하여 새롭게 api를 요청하도록 구현하였습니다.

|  이름  | 의견                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| :----: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 김동구 | - API 호출 시 응답값과 현재 시간을 객체에 저장 <br> - 이미 검색했던 단어로 재검색 시 객체에 저장된 검색어의 date와 현재 date를 비교하여 5분이 지나지 않았다면 캐싱 데이터 반환, 지났다면 재호출                                                                                                                                                                                                                                                        |
| 김차미 | - 캐시스토리지에 저장 ( 로컬/세션 스토리지에 저장하기엔 5mb 용량제한때문에 관리가 어려울것이라 예상) <br> - 쿼리별 최초 api 호출 시 받아온 데이터를 캐시스토리지에 저장하고, 이후 api요청 시 캐시된 데이터가 있는지 확인 후 캐시된 데이터가 있으면 해당 데이터 리턴 <br> - 캐시데이터 저장 시 헤더에 expireDate를 저장 → 캐시된 데이터를 불러올 때 expireDate를 체크하여 만료된 경우 새롭게 api를 호출하고, 해당 데이터로 기존 캐싱데이터를 업데이트함 |
| 윤영서 | - Cache Storage 구현 <br> - api 최초 호출 시에는 캐시 스토리지에 저장. 저장시 fetch date도 함께 저장함. 이후의 api 요청시 캐시 스토리지에 값이 있다면 저장된 fetch date와 현재 시각을 비교한뒤 expire date보다 크다면(만료) 새로 api를 호출해 캐시 스토리지에 저장함. 그렇지 않다면 캐시 스토리지의 데이터를 그대로 사용                                                                                                                               |
| 이현우 | - 캐시스토리지 사용 <br> - expireDate를 넘기면 cacheStorage 덮어쓰기 <br> - 기존 cacheStorage에 저장되어 있는 내용일 경우 memoization된 값을 재사용       
| 최현웅 | - 세션스토리지 사용 <br> - 한번도 사용해보지 않아서 이번 기회에 적용해보았고, 실제 클론해야 하는 사이트의 검색어 캐싱도 세션 스토리지로 되어 있어서 구현해봄 <br> - 검색 키워드와, 그에 대한 추천 검색어를 함께 캐싱 하고 각 키워드마다 expire time을 설정해서 관리 <br> - 세션 스토리지 : 사용자가 현재 탭을 닫으면 캐싱이 함께 사라짐                                                                                                                |
| 이재호 | - Context API 사용 <br> - CacheContext와 CacheChangeContext로 분리 <br> - CacheContext: Map 자료구조 형태의 cache를 공유 <br> - CacheContext: cache를 key, value 형태로 업데이트하는 updateCache 함수를 공유 <br> - cache의 역할은 UI 렌더링과 무관하므로 useRef를 사용하여 관리 <br> - useGetQuery 커스텀 훅 내에 구현 <br> - 커스텀 훅의 인자로 config(expiredTime)을 받아서 expired time을 부여하고 stale cache 관리(기본값은 하루로 설정)          |

### Assignment 3. 입력 시 API 호출 횟수 최소화 전략

**🤔 고민**

> debounce 패턴을 적용한 커스텀 훅이 어디까지 처리해줘야 하는가?  
> 커스텀 훅이 사용자의 검색 키워드에 대한 처리만 해줘야 할지, 검색 키워드에 대한 api 요청과 결과를 함께 처리해줘야 할지에 대한 고민이 있었습니다.

- 관점 1 : debounce 훅이 검색한 **keyword만 처리**
  - debounce 훅은, debounce 패턴이 적용된 검색 키워드만 처리 후 반환
  - 훅을 호출하는 컴포넌트에서 debounce 패턴이 적용된 검색 키워드를 받아 api 호출에 사용
- 관점 2 : debounce 훅이 **keyword + api 호출 결과를 함께 처리**
  - debounce 처리 자체가 api 요청시에 적용하고 싶은거니까, api 호출과 그에 대한 결과를 함께 처리해도 되지 않을까?
  - **검색**이라는 관심사의 관점에서 봤을 때, 훅을 호출하는 컴포넌트는 검색 결과만 받으면 되지 않을까?
  - 확장성을 고려한다면, api 호출 함수가 다양해질 수 있으니 외부(훅을 호출 할 컴포넌트)에서 함수를 주입해주면 되지 않을까?

**결론 : API 호출과 debounce 로직을 분리해서 처리**

- 역할과 책임을 고려했을때 api호출 로직과 debounce로직을 분리하는 게 좋을 것 같다고 생각했습니다.
- 관점 2를 구현하기 위해서 콜백 함수를 함께 훅에 전달하려고 했으나 콜백 함수가 데이터를 패칭하는 비동기 함수이고, 비동기 프로세스가 브라우저에서 제어되어 debounce 패턴을 적용하기가 까다로워 **useDebounce훅은 keyword만 처리하는 형식**으로 구현하였습니다.
- `useSearchResult`훅 내부에서 `useDebounce`훅을 호출 후, api 결과만 받을 수 있도록 했습니다.

|  이름  | 의견                                                                                                                                                                                                                         |
| :----: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 김동구 | useDebounce hook에서 value와 delay를 전달받아 처리                                                                                                                                                                           |
| 김차미 | - useDebounce hook을 통해 디바운싱 로직 처리 <br> - debouncedKeyword state를 만들고 일정 시간동안 입력이 없으면 해당 키워드를 debouncedKeyword 상태로 업데이트 <br> - debouncedKeyword를 trim()메서드로 공백 제거 후 api요청 |
| 윤영서 | - useDebounce 훅 이용해 입력값디바운싱 처리 <br>- debouncedKeyword를 통해 debouncedKeyword를 trim()해 공백 제거 후 api 요청                                                                                                  |
| 이현우 |  - useDebounce hook을 사용하여 searchValue와 delay를 전달받아 디바운스를 처리 후 debouncedSearchValue를 반환                                                                                                                                                                                                                            |
| 최현웅 | - useDebounceSearch 훅을 사용 <br> - 훅 내부에서 debounce를 사용한 api 호출을 같이 처리                                                                                                                                      |
| 이재호 | - useEffect의 cleanup 함수를 사용하여 debounce 처리 <br> - 캐싱과 마찬가지로 useGetQuery 내부에서 구현                                                                                                                       |

### Assignment 4. 키보드만으로 추천 검색어 이동 기능 구현

**결론 : refList 형태로 관리**

```ts
const recommendItems: HTMLDivElement[] = [];
//...
const handleRecommendedListKeyDown = (event: React.KeyboardEvent, index: number) => {
  switch (event.key) {
      //...
  }
};
<S.RecommendedData
    key={data.sickCd}
    tabIndex={index}
    ref={element => element && setRecommendItems(element)}
    onKeyDown={event => handleRecommendedListKeyDown(event, index)}
>
```

- 키보드를 통해서 이동한 추천 검색어의 index를 상태로 관리하게 되면, 키보드 이동 마다 컴포넌트가 리렌더링 되므로 렌더링 측면에서 상당한 비용이 들게 됩니다.
- 따라서, DOM을 직접 조작하기로 결정 하였고 추천 검색어 리스트가 렌더링 되면 ref에 전달 한 콜백 함수가 실행되어 `recommendItems` 배열에 추천 검색어들을 추가합니다
- `onkeyDown` 이벤트 핸들러에 index를 전달 해주고, 이벤트 핸들러 내부에서 해당 index의 element를 focus하는 방식으로 구현하였습니다.

|  이름  | 의견                                                                                                                                                                                                                                                                                                                                                                |
| :----: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 김동구 | - 방향 키를 사용해 이동할 요소 검색어 ul에 ref 할당하고 검색창에서 아래 방향 키를 누르면 ref에 포커스 이벤트를 실행하여 검색어 ul로 이동되도록 함 <br> - 검색창에서 tabIndex state를 통해 키보드 이동 event 발생 시 마다 tabIndex 값을 증감시키고 상태 인덱스와 일치하는 li를 강조 표시하여 이동하는 것처럼 보이도록 함                                             |
| 김차미 | - focusedIndex state를 통해 현재 포커스된 li요소의 상태를 관리<br> - `if(e.nativeEvent.isComposing) return;` 처리를 통해 한국어 입력시 마지막 글자 한번 더 입력되는 이슈 해결                                                                                                                                                                                       |
| 윤영서 | - div element로 각 추천 검색어들을 불러온 뒤, 각각을 useRef()로 배열에 저장함. <br> - 이후, 키보드 상하키와 탭키를 눌렀을경우에 배열의 index를 증가 혹은 감소 시켜 focus() 되도록함. <br> - event.preventDefault()로, 두 번 이동되는 것 막음. <br> - input에서 바라탄언어(한국어 포함)의 입력인지 아닌지를 구별 위해 `event.nativeEvent.isComposing === false` 처리 |
| 이현우 | - ref를 사용하여 input과 결과 li DOM 불러와 keyDown조작                                                                                                                                                                                                                                                                                                                                                                   |
| 최현웅 | - ul에 useRef훅을 사용해서 직접 ul 내부에 있는 li DOM을 조작 <br> - focusIndex 상태를 만들어서 up, down, escape에 대한 분기 처리 <br> - 추천검색어로 이동하면, input에 함께 반영이 되면 좋겠다고 생각해서 isAutoSearch, autoSearchKeyword를 추가로 상태로 만들어서 관리함 <br> - 너무 많은 상태를 사용하다 보니 렌더링 효율이 떨어질 것 같음                        |
| 이재호 | - 검색어를 입력을 위한 input이 있는 SearchPage 컴포넌트에서 focusIndex 상태를 둠 <br> - input의 onKeyDown 이벤트 핸들러를 통해 방향키에 따라 focusIndex값을 +1 혹은 -1 <br> - focusIndex를 검색어 Item 컴포넌트에 전달하여 index값이 동일할 시, background-color 변경                                                                                               |

### Assignment 5. 기타 사항

**결론 : 추천 검색어 scrollBar 적용 및 msw 도입(development) && glitch로 배포서버 구현**

|  이름  | 의견                                                                                                                                                                                                                                                                                                                                         |
| :----: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 김동구 | - reverse를 사용하여 검색어가 위로 오도록 함 <br> - slice를 사용하여 7개의 검색어만 보이도록 함                                                                                                                                                                                                                                              |
| 김차미 | - 추천 검색어 리스트에서 리스트 항목 클릭 시 해당 항목으로 검색어 키워드 변경 <br> - 추천 검색어 최대 7개까지 노출                                                                                                                                                                                                                           |
| 윤영서 | - 추천 검색어 리스트에 스크롤바(수직 스크롤) 생성토록 함 <br> - 검색어에 포커스 되었을 시에 색상 변경토록함                                                                                                                                                                                                                                  |
| 이현우 |                                                                                                                                                                                                                                                                                                                                              |
| 최현웅 | - ul에 useRef훅을 사용해서 직접 ul 내부에 있는 li DOM을 조작 <br> - focusIndex 상태를 만들어서 up, down, escape에 대한 분기 처리 <br> - 추천검색어로 이동하면, input에 함께 반영이 되면 좋겠다고 생각해서 isAutoSearch, autoSearchKeyword를 추가로 상태로 만들어서 관리함 <br> - 너무 많은 상태를 사용하다 보니 렌더링 효율이 떨어질 것 같음 |
| 이재호 | - msw 사용하여 mock server 간편화 <br> - sessionStorage를 통해 검색 기록 저장 및 렌더링 <br> - 추천 검색어 최대 8개 노출                                                                                                                                                                                                                     |

## 데모 영상

|**키보드로 검색어 이동**|**스크롤**|
| :---: | :---: |
| <img width="400px" src="https://github.com/wanted-internship-12-9/pre-onboarding-12th-3-9/assets/86523545/622a1b2d-d0dc-49e8-8526-70fa450d72c7"/> | <img width="400px" src="https://github.com/wanted-internship-12-9/pre-onboarding-12th-3-9/assets/126763111/0b679aa1-9315-427a-8a4a-24743a73b422"/> |
| **캐싱** | **디바운스** |
| <img width="400px" src="https://github.com/wanted-internship-12-9/pre-onboarding-12th-3-9/assets/126763111/cb3c4fe3-c496-4f9d-be10-8bde82fb3a24"/> | <img width="400px" src="https://github.com/wanted-internship-12-9/pre-onboarding-12th-3-9/assets/126763111/58a1f6ca-d8ac-4640-805f-af6630f469dd"/> |

