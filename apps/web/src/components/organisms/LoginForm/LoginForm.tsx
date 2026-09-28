import { useState, type FormEvent } from 'react'
import { Button, Typography, type SocialProvider } from '../../atoms'
import { CheckboxField, FormField, SocialAuthGroup } from '../../molecules'

export interface LoginFormData {
  email: string
  password: string
  rememberMe: boolean
}

export interface LoginFormProps {
  onSubmit?: (data: LoginFormData) => void | Promise<void>
  onRegisterClick?: () => void
  onForgotPassword?: () => void
  onSocialLogin?: (provider: SocialProvider) => void
  isLoading?: boolean
  errorMessage?: string
}

export function LoginForm({
  onSubmit,
  onRegisterClick,
  onForgotPassword,
  onSocialLogin,
  isLoading = false,
  errorMessage,
}: LoginFormProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    void onSubmit?.({ email, password, rememberMe })
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex w-full flex-col gap-5">
      <header className="flex flex-col gap-2 text-center">
        <Typography as="h1" variant="title">
          Bem-vindo de volta
        </Typography>
        <Typography variant="subtitle">
          Entre com sua conta para continuar conectando com a comunidade.
        </Typography>
      </header>

      <SocialAuthGroup onSocialLogin={onSocialLogin} disabled={isLoading} />

      {errorMessage && (
        <p
          role="alert"
          className="rounded-md border border-red-400/40 bg-red-400/10 px-4 py-3 text-sm text-red-300"
        >
          {errorMessage}
        </p>
      )}

      <FormField
        id="login-email"
        label="E-mail"
        type="email"
        name="email"
        autoComplete="email"
        placeholder="voce@exemplo.com"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        disabled={isLoading}
        required
      />

      <FormField
        id="login-password"
        label="Senha"
        type="password"
        name="password"
        autoComplete="current-password"
        placeholder="Sua senha"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        disabled={isLoading}
        required
      />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <CheckboxField
          id="login-remember-me"
          label="Lembrar de mim"
          name="rememberMe"
          checked={rememberMe}
          onChange={(event) => setRememberMe(event.target.checked)}
          disabled={isLoading}
        />
        <button
          type="button"
          onClick={onForgotPassword}
          disabled={isLoading}
          className="rounded text-sm font-semibold text-code-connect-accent transition-colors hover:underline focus-visible:ring-2 focus-visible:ring-code-connect-accent focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-60"
        >
          Esqueceu a senha?
        </button>
      </div>

      <Button type="submit" size="lg" fullWidth isLoading={isLoading}>
        Entrar
      </Button>

      <p className="text-center text-sm text-gray-400">
        Não possui uma conta?{' '}
        <button
          type="button"
          onClick={onRegisterClick}
          disabled={isLoading}
          className="rounded font-semibold text-code-connect-accent transition-colors hover:underline focus-visible:ring-2 focus-visible:ring-code-connect-accent focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-60"
        >
          Cadastre-se
        </button>
      </p>
    </form>
  )
}