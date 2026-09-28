import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { LoginPage } from './LoginPage'

describe('LoginPage (Page)', () => {
  it('deve renderizar o banner e o formulário de login', () => {
    render(<LoginPage />)

    expect(screen.getByAltText(/code connect/i)).toHaveAttribute('src', '/banner.png')
    expect(screen.getByLabelText(/e-mail/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/senha/i)).toBeInTheDocument()
  })

  it('deve encaminhar os dados do formulário para onLoginSubmit', async () => {
    const onLoginSubmit = vi.fn().mockResolvedValue(undefined)
    render(<LoginPage onLoginSubmit={onLoginSubmit} />)

    fireEvent.change(screen.getByLabelText(/e-mail/i), {
      target: { value: 'ana@exemplo.com' },
    })
    fireEvent.change(screen.getByLabelText(/senha/i), { target: { value: '123456' } })
    fireEvent.click(screen.getByRole('button', { name: 'Entrar' }))

    await waitFor(() => expect(onLoginSubmit).toHaveBeenCalledTimes(1))
    expect(onLoginSubmit).toHaveBeenCalledWith({
      email: 'ana@exemplo.com',
      password: '123456',
      rememberMe: false,
    })
  })

  it('deve exibir a mensagem de erro e reabilitar o botão quando o login falhar', async () => {
    const onLoginSubmit = vi.fn().mockRejectedValue(new Error('E-mail ou senha inválidos'))
    render(<LoginPage onLoginSubmit={onLoginSubmit} />)

    fireEvent.click(screen.getByRole('button', { name: 'Entrar' }))

    expect(await screen.findByRole('alert')).toHaveTextContent('E-mail ou senha inválidos')
    await waitFor(() =>
      expect(screen.getByRole('button', { name: 'Entrar' })).not.toBeDisabled(),
    )
  })

  it('deve encaminhar o login social com o provedor selecionado', () => {
    const onSocialLogin = vi.fn()
    render(<LoginPage onSocialLogin={onSocialLogin} />)

    fireEvent.click(screen.getByRole('button', { name: 'Entrar com GitHub' }))

    expect(onSocialLogin).toHaveBeenCalledWith('github')
  })

  it('deve propagar as navegações de cadastro e recuperação de senha', () => {
    const onNavigateToRegister = vi.fn()
    const onNavigateToForgotPassword = vi.fn()
    render(
      <LoginPage
        onNavigateToRegister={onNavigateToRegister}
        onNavigateToForgotPassword={onNavigateToForgotPassword}
      />,
    )

    fireEvent.click(screen.getByRole('button', { name: /cadastre-se/i }))
    fireEvent.click(screen.getByRole('button', { name: /esqueceu a senha/i }))

    expect(onNavigateToRegister).toHaveBeenCalledTimes(1)
    expect(onNavigateToForgotPassword).toHaveBeenCalledTimes(1)
  })

  it('não deve lançar erro quando nenhuma prop de callback for informada', () => {
    expect(() => render(<LoginPage />)).not.toThrow()
  })
})