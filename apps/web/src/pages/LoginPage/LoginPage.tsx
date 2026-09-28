import React, { useState } from 'react'
import { AuthTemplate } from '../../components/templates/AuthTemplate/AuthTemplate'
import { LoginForm, type LoginFormData } from '../../components/organisms/LoginForm/LoginForm'

export interface LoginPageProps {
  onLoginSubmit?: (data: LoginFormData) => void
  onNavigateToRegister?: () => void
  onNavigateToForgotPassword?: () => void
  onSocialLogin?: (provider: 'github' | 'gmail') => void
}

export const LoginPage: React.FC<LoginPageProps> = ({
  onLoginSubmit,
  onNavigateToRegister,
  onNavigateToForgotPassword,
  onSocialLogin,
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | undefined>()

  const handleLoginSubmit = async (data: LoginFormData) => {
    setIsLoading(true)
    setErrorMessage(undefined)

    try {
      if (onLoginSubmit) {
        await onLoginSubmit(data)
      } else {
        // Logica padrao para demonstracao
        console.log('Login efetuado com sucesso:', data)
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Falha ao autenticar. Tente novamente.'
      setErrorMessage(message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSocialLogin = (provider: 'github' | 'gmail') => {
    if (onSocialLogin) {
      onSocialLogin(provider)
    } else {
      console.log(`Iniciando login com ${provider}`)
    }
  }

  return (
    <AuthTemplate
      brandTitle="Code Connect"
      bannerSrc="/banner.png"
      bannerAlt="Code Connect - Garota programando com código verde ao fundo"
    >
      <LoginForm
        onSubmit={handleLoginSubmit}
        onRegisterClick={onNavigateToRegister}
        onForgotPassword={onNavigateToForgotPassword}
        onSocialLogin={handleSocialLogin}
        isLoading={isLoading}
        errorMessage={errorMessage}
      />
    </AuthTemplate>
  )
}
