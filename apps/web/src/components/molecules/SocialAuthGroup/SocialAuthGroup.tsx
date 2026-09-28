import {
  SocialButton,
  Typography,
  type SocialProvider,
} from '../../atoms'

export interface SocialAuthGroupProps {
  onSocialLogin?: (provider: SocialProvider) => void
  /** Legenda exibida abaixo dos botões. */
  caption?: string
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
  caption = 'Ou entre com sua rede favorita',
  disabled = false,
}: SocialAuthGroupProps) {
  return (
    <div className="flex w-full flex-col items-center gap-3">
      <div className="flex items-center justify-center gap-6">
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
      {caption && (
        <Typography variant="caption" className="text-center">
          {caption}
        </Typography>
      )}
    </div>
  )
}