import { useEffect, useState } from 'react';

import { useDebounce } from '../useDebounce';
import { MOCK_API_PATH } from '../../apis/apiConfig';
import { getCacheData, setCacheData } from '../../utils/cacheStorage';
import { axiosInstance } from '../../apis/axiosInstance';

export const useSearchResult = <T>(keyword: string) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const debouncedKeyword = useDebounce(keyword, 500);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        const response = await getSearchResult(debouncedKeyword);
        setData(response);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [debouncedKeyword, setData, setIsLoading, setIsError]);

  const getSearchResult = async (keyword: string) => {
    const cachedResponse = await getCacheData(MOCK_API_PATH.SICK, keyword);
    if (cachedResponse) {
      return await cachedResponse.json();
    } else {
      console.info('CALLING API : getSearchResult');
      const { data } = await axiosInstance.get(`${MOCK_API_PATH.SICK}?q=${keyword}`);
      setCacheData(MOCK_API_PATH.SICK, keyword, data);
      return data;
    }
  };

  return [data, isLoading, isError] as const;
};
