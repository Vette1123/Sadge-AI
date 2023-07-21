import { Settings } from 'lucide-react'

import { checkSubscription } from '@/lib/subscription'
import { Heading } from '@/components/heading'
import { SubscriptionButton } from '@/components/subscription-button'

const SettingsPage = async () => {
  const isPro = await checkSubscription()

  return (
    <>
      <Heading
        title="Settings"
        description="Manage account settings."
        icon={Settings}
        iconColor="text-gray-700"
        bgColor="bg-gray-700/10"
      />
      <div className="space-y-4 px-4 lg:px-8">
        <div className="text-sm text-muted-foreground">
          {isPro
            ? 'You are currently on a Pro plan.'
            : 'You are currently on a free plan.'}
        </div>
        <SubscriptionButton isPro={isPro} />
      </div>
    </>
  )
}

export default SettingsPage
