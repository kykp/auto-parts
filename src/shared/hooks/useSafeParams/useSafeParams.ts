import { useMemo } from 'react';

import { _perPage, _perPageList } from '@/app/types/config';

import { useEaseSearchParams } from '@/shared/hooks/useEaseSearchParams';
import { IUrlSanitizer, UrlSanitizer } from '@/shared/lib/urlSanitizer/urlSanitizer';

export interface MainParams {
  page: string,
  limit: string
  q: string
}

export interface RulesByParams {
  rules: (keyof IUrlSanitizer)[]
  values?: unknown[]
  safeValue?: unknown | null
}

type Rules = {
  [K in keyof MainParams]: RulesByParams
}

export type CustomRules<T> = {
  [K in keyof T]: RulesByParams
}

const callQuery = (
  queue: (keyof IUrlSanitizer)[],
  value: unknown,
  safeValue?: unknown
): boolean => {
  if (queue.length > 0) {
    const sanitizer = new UrlSanitizer;

    if (queue.length === 1) {
      return (sanitizer[queue[0]] as ((val: unknown, arr?: unknown) => IUrlSanitizer))(value, safeValue ?? null)
        .result;
    } else {
      const res = (sanitizer[queue[0]] as ((val: unknown, arr?: unknown) => IUrlSanitizer))(value, safeValue ?? null)
        .result;
      return res ? callQuery(queue.splice(1, queue.length), value, safeValue ?? null) : res;
    }
  }

  return false;
};

export const useSafeParams = <T,>(extraParams: CustomRules<T>) => {

  const params: Rules & CustomRules<T> = {
    page: { rules: ['isNumber'], safeValue: '1' },
    limit: { rules: ['hasInArray'], values: _perPageList, safeValue: _perPage },
    q: { rules: [], safeValue: '' },
    ...extraParams,
  };

  const [qs] = useEaseSearchParams<Partial<MainParams>>();

  return useMemo(() => {
    return Object.keys(params).reduce((acc, cur) => {
      const key = cur as keyof typeof params;

      if (key in qs) {
        const val = qs[key as keyof typeof qs] as string;

        if (params[key].rules.length > 0) {
          acc[key] = callQuery(params[key].rules, val, params[key].values)
            ? val
            : params[key].safeValue as string;
        } else {
          // TODO: Дописать здесь использование дефолтного санитайзера (и его реализацию в соотв. месте) для защиты от XSS
          acc[key] = val;
        }
      } else {
        acc[key] = params[key].safeValue as string;
      }

      return acc;
    }, {} as Record<keyof typeof params, string>);
  }, [qs]);
};
