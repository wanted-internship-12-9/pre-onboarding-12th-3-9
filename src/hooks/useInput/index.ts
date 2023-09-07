import { ChangeEvent, useCallback, useState } from 'react';

export const useInput = <T>(initialValue: T) => {
  const [value, setValue] = useState<T>(initialValue);
  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value as T);
  }, []);
  const handleInputClear = useCallback(() => {
    setValue('' as T);
  }, []);
  return [value, handleInputChange, handleInputClear] as const;
};
