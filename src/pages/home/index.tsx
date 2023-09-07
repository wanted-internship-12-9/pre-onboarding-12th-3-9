import React from 'react';

import * as S from './Home.style';

const Home = () => {
  /**
   * 밑에서 나오는 키워드들은 다음과 같습니다.
   *  const debouncedKeyword = useDebounce(keyword, 250);
      const isEmpty = recommendList.length === 0;
      const isVisible = debouncedKeyword && !isEmpty;
   */
  return (
    <S.Container>
      <S.Title>
        국내 모든 임상시험 검색하고 <br /> 온라인으로 참여하기
      </S.Title>
      <S.SearchWrapper>
        <S.Input type="text" placeholder="질환명을 입력해 주세요." />
        <S.SearchButtonWrapper>
          {/**
           *  하기 코드의 원본은 다음과 같습니다.
           * {isVisible && <S.ClearButton onClick={handleInputClear}>X</S.ClearButton>}
           */}
          <S.ClearButton>X</S.ClearButton>
          <S.SearchingButton />
        </S.SearchButtonWrapper>
      </S.SearchWrapper>
      {/**
       *  {isVisible && ()}
       * 를 통해서 RecommendList를 보여줍니다.
       */}
      <S.RecommendList>
        <S.SubTitle>추천 검색어</S.SubTitle>
        {/**
         * 하기 코드의 원본은 다음과 같습니다.
         * {isEmpty && <S.RecommendedData>검색어 없음</S.RecommendedData>}
         * */}

        <S.RecommendedData>검색어 없음</S.RecommendedData>
        <S.RecommendWrapper>
          {/** 
             * //이 부분에 검색 데이터가 들어갑니다.
            {recommendList.map((data, index) => (
              <S.RecommendedData
                key={data.sickCd}
                ref={element => setRecommendListRef(element, index)}
                tabIndex={index}
                onKeyDown={event => handleRecommendedListKeyDown(event, index)}
              >
                <S.RecommendListIcon />
                <S.RecommendedListText>{data.sickNm}</S.RecommendedListText>
              </S.RecommendedData>
            ))}
            */}
        </S.RecommendWrapper>
      </S.RecommendList>
    </S.Container>
  );
};

export default Home;
