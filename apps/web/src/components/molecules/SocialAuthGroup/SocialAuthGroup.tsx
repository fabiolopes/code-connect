import {
  Divider,
  SocialButton,
  type SocialProvider,
} from '../../atoms'

export interface SocialAuthGroupProps {
  onSocialLogin?: (provider: SocialProvider) => void
  /** Rótulo do divisor exibido entre os botões e o formulário. */
  dividerLabel?: string
  disabled?: boolean
}

/** Logos sociais ficam em `apps/web/public/`. */
const PROVIDER_ICONS: Record<SocialProvider, string> = {
  github: '/Github.png',
  gmail: '/Gmail.png',
}

const PROVIDER_LABELS: Record<SocialProvider, string> = {
  github: 'Entrar com GitHub',
  gmail: 'Entrar com Gmail',
}

const PROVIDERS: SocialProvider[] = ['github', 'gmail']

export function SocialAuthGroup({
  onSocialLogin,
  dividerLabel = 'ou entre com',
  disabled = false,
}: SocialAuthGroupProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {PROVIDERS.map((provider) => (
          <SocialButton
            key={provider}
            provider={provider}
            iconSrc={PROVIDER_ICONS[provider]}
            label={PROVIDER_LABELS[provider]}
            disabled={disabled}
            onClick={() => onSocialLogin?.(provider)}
          />
        ))}
      </div>
      <Divider label={dividerLabel} />
    </div>
  )
}