'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Heading } from '@/components/ui/atoms/Heading';
import { Text } from '@/components/ui/atoms/Text';
import { PrimaryPink } from '@/components/ui/atoms/button/PrimaryPink';
import { Card, CardContent } from '@/components/ui/composites/Card';
import { InputField } from '@/components/ui/molecules/InputField';
import { t } from '@/lib/i18n';
import { completeCampaignOnboarding } from '@/lib/supabase/actions';
import type { CurrentReviewerProfile } from '@/lib/supabase/auth';

export type ReviewerOnboardingWelcomeProps = {
  profile: CurrentReviewerProfile;
};

/** First-login welcome step for reviewers whose profile isn't approved yet. */
export function ReviewerOnboardingWelcome({ profile }: ReviewerOnboardingWelcomeProps) {
  const router = useRouter();
  const prefillName = [profile.first_name, profile.last_name].filter(Boolean).join(' ');
  const prefillCity =
    typeof profile.authUser.user_metadata?.city === 'string'
      ? profile.authUser.user_metadata.city
      : '';
  const [displayName, setDisplayName] = useState(prefillName);
  const [city, setCity] = useState(prefillCity);
  const [error, setError] = useState<string | undefined>();
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!displayName.trim() || !city.trim()) {
      setError(t('app.reviewerOnboarding.form.requiredError'));
      return;
    }
    setError(undefined);
    setIsSaving(true);
    const result = await completeCampaignOnboarding({ displayName, city });
    setIsSaving(false);

    if (!result.ok) {
      setError(t('app.reviewerOnboarding.form.requiredError'));
      return;
    }

    router.refresh();
  };

  return (
    <div className='mx-auto flex w-full max-w-content flex-col gap-6'>
      <div>
        <Heading as='h1' variant='heading-2'>
          {t('app.reviewerOnboarding.title')}
        </Heading>
        <Text as='p' variant='body-small-muted' className='mt-2'>
          {t('app.reviewerOnboarding.description')}
        </Text>
      </div>

      <Card>
        <Heading as='h2' variant='title-1'>
          {t('app.reviewerOnboarding.form.title')}
        </Heading>
        <Text as='p' variant='body-small-muted' className='mt-1'>
          {t('app.reviewerOnboarding.form.description')}
        </Text>

        <CardContent>
          <form
            onSubmit={(event) => void handleSubmit(event)}
            className='flex flex-col gap-4'
          >
            <InputField
              label={t('app.reviewerOnboarding.form.displayNameLabel')}
              value={displayName}
              onChange={(event) => {
                setDisplayName(event.target.value);
                if (error) setError(undefined);
              }}
              state={error ? 'error' : 'default'}
            />
            <InputField
              label={t('app.reviewerOnboarding.form.cityLabel')}
              value={city}
              onChange={(event) => {
                setCity(event.target.value);
                if (error) setError(undefined);
              }}
              hint={error}
              state={error ? 'error' : 'default'}
            />
            <PrimaryPink
              type='submit'
              size='small'
              loading={isSaving}
              disabled={isSaving}
              className='self-start'
            >
              {t('app.reviewerOnboarding.form.submitCta')}
            </PrimaryPink>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
