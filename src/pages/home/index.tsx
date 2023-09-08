import React, { useRef } from 'react';

import { TypeSearchResult } from '../../types';
import { useSearchResult } from '../../hooks/useSearchResult';
import { useInput } from '../../hooks/useInput';
import * as S from './Home.style';
import { KEYBOARD_EVENT } from '../../constants';

const Home = () => {
  const [value, handleInputChange, handleInputClear] = useInput<string>('');
  const searchResult = useSearchResult<TypeSearchResult[]>(value);
  const inputRef = useRef<HTMLInputElement>(null);
  const recommendItems: HTMLDivElement[] = [];

  const setRecommendItems = (element: HTMLDivElement) => {
    if (!element) return;
    recommendItems.push(element);
  };
  const isEmptyRecommendItems = () => recommendItems?.length === 0;

  const handleInputKeyDown = (event: React.KeyboardEvent) => {
    if (isEmptyRecommendItems()) return;
    switch (event.key) {
      case KEYBOARD_EVENT.DOWN:
      case KEYBOARD_EVENT.TAB:
        if (event.nativeEvent.isComposing) return;
        event.preventDefault();
        recommendItems[0].focus();
        break;
      case KEYBOARD_EVENT.ESC:
        handleInputClear();
        break;
      default:
        return;
    }
  };
  const handleRecommendedListKeyDown = (event: React.KeyboardEvent, index: number) => {
    switch (event.key) {
      case KEYBOARD_EVENT.DOWN:
      case KEYBOARD_EVENT.TAB:
        event.preventDefault();
        if (index !== recommendItems.length - 1) {
          recommendItems[index + 1].focus();
          return;
        }
        recommendItems[0].focus();
        break;
      case KEYBOARD_EVENT.UP:
        if (index !== 0) {
          recommendItems[index - 1].focus();
          return;
        }
        inputRef.current?.focus();
        break;
      case KEYBOARD_EVENT.ESC:
        handleInputClear();
        break;
      default:
        return;
    }
  };

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
          onKeyDown={handleInputKeyDown}
          ref={inputRef}
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
            searchResult.map((data, index) => (
              <S.RecommendedData
                key={data.sickCd}
                tabIndex={index}
                ref={element => element && setRecommendItems(element)}
                onKeyDown={event => handleRecommendedListKeyDown(event, index)}
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
