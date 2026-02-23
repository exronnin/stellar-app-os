'use client';

import { Button } from '@/components/atoms/Button';
import { Text } from '@/components/atoms/Text';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/molecules/Card';
import { getErrorPresentation } from '@/lib/errorHandling';

interface ErrorBoundaryFallbackProps {
  error: Error & { digest?: string };
  onRetry: () => void;
}

export function ErrorBoundaryFallback({ error, onRetry }: ErrorBoundaryFallbackProps): React.ReactNode {
  const presentation = getErrorPresentation(error);

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl items-center justify-center p-4 sm:p-6 lg:p-10">
      <Card className="w-full max-w-xl">
        <CardHeader className="space-y-3">
          <Text variant="small" className="font-semibold uppercase tracking-wide text-muted-foreground">
            {presentation.type} error
          </Text>
          <CardTitle>{presentation.title}</CardTitle>
          <Text variant="muted" role="alert" aria-live="assertive">
            {presentation.message}
          </Text>
        </CardHeader>

        <CardContent className="flex flex-col gap-4">
          <Button
            onClick={onRetry}
            size="lg"
            className="min-h-11 w-full sm:w-auto"
            aria-label="Try the failed operation again"
          >
            Try Again
          </Button>

          {error.digest ? (
            <Text variant="small" className="text-muted-foreground">
              Reference: {error.digest}
            </Text>
          ) : null}
        </CardContent>
      </Card>
    </main>
  );
}
