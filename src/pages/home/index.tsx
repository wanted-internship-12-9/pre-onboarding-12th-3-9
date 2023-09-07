import React from 'react';

import { TypeSearchResult } from '../../types';
import { useSearchResult } from '../../hooks/useSearchResult';
import { useInput } from '../../hooks/useInput';
import * as S from './Home.style';

const Home = () => {
  const [value, handleInputChange, handleInputClear] = useInput('');
  const searchResult = useSearchResult<TypeSearchResult[]>(value);
  return (
    <S.Container>
      <S.Title>
        국내 모든 임상시험 검색하고 <br /> 온라인으로 참여하기
      </S.Title>
      <S.SearchWrapper>
        <S.Input
          type="text"
          placeholder="질환명을 입력해 주세요."
          value={value}
          onChange={handleInputChange}
        />
        <S.SearchButtonWrapper>
          {!!value.length && <S.ClearButton onClick={handleInputClear}>X</S.ClearButton>}
          <S.SearchingButton />
        </S.SearchButtonWrapper>
      </S.SearchWrapper>
      <S.RecommendList>
        <S.RecommendedData>{value}</S.RecommendedData>
        <S.SubTitle>추천 검색어</S.SubTitle>
        <S.RecommendWrapper>
          {searchResult ? (
            searchResult.map(data => (
              <S.RecommendedData
                key={data.sickCd}
                // ref={element => setRecommendListRef(element, index)}
                // tabIndex={index}
                // onKeyDown={event => handleRecommendedListKeyDown(event, index)}
              >
                <S.RecommendListIcon />
                <S.RecommendedListText>{data.sickNm}</S.RecommendedListText>
              </S.RecommendedData>
            ))
          ) : (
            <S.RecommendedData>검색어 없음</S.RecommendedData>
          )}
        </S.RecommendWrapper>
      </S.RecommendList>
    </S.Container>
  );
};

export default Home;
