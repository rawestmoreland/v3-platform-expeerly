'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Heading } from '@/components/ui/atoms/Heading';
import { Text } from '@/components/ui/atoms/Text';
import { PrimaryPink } from '@/components/ui/atoms/button/PrimaryPink';
import { Card, CardContent } from '@/components/ui/composites/Card';
import { ComboboxField } from '@/components/ui/composites/ComboboxField';
import { InputField } from '@/components/ui/molecules/InputField';
import type { InterestCategoryRecord } from '@/lib/data/interest-categories-dev';
import type { LanguageOptionRecord } from '@/lib/data/language-options-dev';
import { getLanguageOptionLabel } from '@/lib/data/language-options-dev';
import { getLocale, t } from '@/lib/i18n';
import { pickLocalized } from '@/lib/i18n/content';
import { completeCampaignOnboarding } from '@/lib/supabase/actions';
import type { CurrentReviewerProfile } from '@/lib/supabase/auth';

export type ReviewerOnboardingWelcomeProps = {
  profile: CurrentReviewerProfile;
  interestCategories: InterestCategoryRecord[];
  languageOptions: LanguageOptionRecord[];
};

/** First-login welcome step for reviewers whose profile isn't approved yet. */
export function ReviewerOnboardingWelcome({
  profile,
  interestCategories,
  languageOptions,
}: ReviewerOnboardingWelcomeProps) {
  const router = useRouter();
  const locale = getLocale();
  const prefillName = [profile.first_name, profile.last_name].filter(Boolean).join(' ');
  const prefillCity =
    typeof profile.authUser.user_metadata?.city === 'string'
      ? profile.authUser.user_metadata.city
      : '';
  const [displayName, setDisplayName] = useState(prefillName);
  const [city, setCity] = useState(prefillCity);
  const [socialLinkedin, setSocialLinkedin] = useState(profile.social_linkedin ?? '');
  const [socialInstagram, setSocialInstagram] = useState(profile.social_instagram ?? '');
  const [socialFacebook, setSocialFacebook] = useState(profile.social_facebook ?? '');
  const [socialTiktok, setSocialTiktok] = useState(profile.social_tiktok ?? '');
  const [spokenLanguageCodes, setSpokenLanguageCodes] = useState<string[]>(
    profile.spoken_language_codes ?? [],
  );
  const [interestCategoryIds, setInterestCategoryIds] = useState<string[]>(
    profile.interest_unique_category_ids ?? [],
  );
  const [error, setError] = useState<string | undefined>();
  const [isSaving, setIsSaving] = useState(false);

  const languageComboboxOptions = languageOptions.map((language) => ({
    value: language.code,
    label: getLanguageOptionLabel(language, locale),
  }));

  const categoryComboboxOptions = interestCategories.map((category) => ({
    value: category.uniqueCategoryId,
    label: pickLocalized(category.displayName, locale, 'title') ?? category.slugs.en,
  }));

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!displayName.trim() || !city.trim()) {
      setError(t('app.reviewerOnboarding.form.requiredError'));
      return;
    }
    setError(undefined);
    setIsSaving(true);
    const result = await completeCampaignOnboarding({
      displayName,
      city,
      socialLinkedin,
      socialInstagram,
      socialFacebook,
      socialTiktok,
      spokenLanguageCodes,
      interestUniqueCategoryIds: interestCategoryIds,
    });
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

            <div className='grid gap-4 sm:grid-cols-2'>
              <InputField
                label={t('app.reviewerOnboarding.form.socialLinkedinLabel')}
                placeholder={t('app.reviewerOnboarding.form.socialLinkedinPlaceholder')}
                value={socialLinkedin}
                onChange={(event) => setSocialLinkedin(event.target.value)}
              />
              <InputField
                label={t('app.reviewerOnboarding.form.socialInstagramLabel')}
                placeholder={t('app.reviewerOnboarding.form.socialInstagramPlaceholder')}
                value={socialInstagram}
                onChange={(event) => setSocialInstagram(event.target.value)}
              />
              <InputField
                label={t('app.reviewerOnboarding.form.socialFacebookLabel')}
                placeholder={t('app.reviewerOnboarding.form.socialFacebookPlaceholder')}
                value={socialFacebook}
                onChange={(event) => setSocialFacebook(event.target.value)}
              />
              <InputField
                label={t('app.reviewerOnboarding.form.socialTiktokLabel')}
                placeholder={t('app.reviewerOnboarding.form.socialTiktokPlaceholder')}
                value={socialTiktok}
                onChange={(event) => setSocialTiktok(event.target.value)}
              />
            </div>

            <ComboboxField
              label={t('app.reviewerOnboarding.form.spokenLanguagesLabel')}
              placeholder={t('app.reviewerOnboarding.form.spokenLanguagesPlaceholder')}
              options={languageComboboxOptions}
              values={spokenLanguageCodes}
              onValuesChange={setSpokenLanguageCodes}
            />

            <ComboboxField
              label={t('app.reviewerOnboarding.form.interestCategoriesLabel')}
              placeholder={t('app.reviewerOnboarding.form.interestCategoriesPlaceholder')}
              options={categoryComboboxOptions}
              values={interestCategoryIds}
              onValuesChange={setInterestCategoryIds}
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
