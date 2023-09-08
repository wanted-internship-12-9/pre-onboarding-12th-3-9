import { useEffect, useState } from 'react';

import { useDebounce } from '../useDebounce';
import { API_PATH } from '../../apis/apiConfig';
import { getCacheData, setCacheData } from '../../utils/cacheStorage';
import { axiosInstance } from '../../apis/axiosInstance';

export const useSearchResult = <T>(keyword: string) => {
  const [data, setData] = useState<T | null>(null);
  const debouncedKeyword = useDebounce(keyword, 500);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getSearchResult(debouncedKeyword);
        setData(response);
      } catch (error) {
        console.error(error);
      }
    };
    if (debouncedKeyword.length === 0) {
      setData(null);
      return;
    }
    fetchData();
  }, [debouncedKeyword, setData]);

  const getSearchResult = async (keyword: string) => {
    const cachedResponse = await getCacheData(API_PATH.SICK, keyword);
    if (cachedResponse) {
      return await cachedResponse.json();
    } else {
      console.info('CALLING API : getSearchResult');
      const { data } = await axiosInstance.get(`${API_PATH.SICK}?q=${keyword}`);
      setCacheData(API_PATH.SICK, keyword, data);
      return data;
    }
  };
  return data;
};
