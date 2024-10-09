'use client';

import ErrorPage from '@/components/ErrorPage/ErrorPage';

export default ({ reset }: { reset: () => void }) => <ErrorPage resetFn={reset} />;
