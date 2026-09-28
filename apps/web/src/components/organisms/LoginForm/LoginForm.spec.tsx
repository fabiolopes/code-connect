import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { LoginForm } from './LoginForm'

describe('LoginForm (Organism)', () => {
  it('deve renderizar os campos essenciais, o botão e os provedores sociais', () => {
    render(<LoginForm />)

    expect(screen.getByLabelText(/e-mail/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/senha/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Entrar' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Entrar com GitHub' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Entrar com Gmail' })).toBeInTheDocument()
  })

  it('deve enviar os dados preenchidos ao submeter o formulário', () => {
    const handleSubmit = vi.fn()
    render(<LoginForm onSubmit={handleSubmit} />)

    fireEvent.change(screen.getByLabelText(/e-mail/i), {
      target: { value: 'ana@exemplo.com' },
    })
    fireEvent.change(screen.getByLabelText(/senha/i), { target: { value: '123456' } })
    fireEvent.click(screen.getByRole('checkbox', { name: /lembrar de mim/i }))
    fireEvent.click(screen.getByRole('button', { name: 'Entrar' }))

    expect(handleSubmit).toHaveBeenCalledTimes(1)
    expect(handleSubmit).toHaveBeenCalledWith({
      email: 'ana@exemplo.com',
      password: '123456',
      rememberMe: true,
    })
  })

  it('deve enviar rememberMe como false quando não marcado', () => {
    const handleSubmit = vi.fn()
    render(<LoginForm onSubmit={handleSubmit} />)

    fireEvent.click(screen.getByRole('button', { name: 'Entrar' }))

    expect(handleSubmit).toHaveBeenCalledWith({
      email: '',
      password: '',
      rememberMe: false,
    })
  })

  it('deve renderizar os provedores sociais após o botão de entrada', () => {
    render(<LoginForm />)

    const submitButton = screen.getByRole('button', { name: 'Entrar' })
    const githubButton = screen.getByRole('button', { name: 'Entrar com GitHub' })

    // O DOM reflects a ordem visual: os botões sociais vêm depois do "Entrar".
    expect(
      submitButton.compareDocumentPosition(githubButton) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy()
  })

  it('deve encaminhar o login social com o provedor correto', () => {
    const handleSocialLogin = vi.fn()
    render(<LoginForm onSocialLogin={handleSocialLogin} />)

    fireEvent.click(screen.getByRole('button', { name: 'Entrar com Gmail' }))

    expect(handleSocialLogin).toHaveBeenCalledWith('gmail')
  })

  it('deve disparar as navegações de cadastro e recuperação de senha', () => {
    const onRegisterClick = vi.fn()
    const onForgotPassword = vi.fn()
    render(
      <LoginForm
        onRegisterClick={onRegisterClick}
        onForgotPassword={onForgotPassword}
      />,
    )

    fireEvent.click(screen.getByRole('button', { name: /cadastre-se/i }))
    fireEvent.click(screen.getByRole('button', { name: /esqueceu a senha/i }))

    expect(onRegisterClick).toHaveBeenCalledTimes(1)
    expect(onForgotPassword).toHaveBeenCalledTimes(1)
  })

  it('deve exibir a mensagem de erro recebida', () => {
    render(<LoginForm errorMessage="E-mail ou senha inválidos" />)

    expect(screen.getByRole('alert')).toHaveTextContent('E-mail ou senha inválidos')
  })

  it('deve bloquear a interação e exibir o loading quando isLoading for verdadeiro', () => {
    render(<LoginForm isLoading />)

    const submitButton = screen.getByRole('button', { name: 'Entrar' })
    expect(submitButton).toBeDisabled()
    expect(submitButton).toHaveAttribute('aria-busy', 'true')
    expect(screen.getByLabelText(/e-mail/i)).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Entrar com GitHub' })).toBeDisabled()
  })

  it('deve aguardar uma promessa assíncrona retornada por onSubmit', async () => {
    const handleSubmit = vi.fn().mockResolvedValue(undefined)
    render(<LoginForm onSubmit={handleSubmit} />)

    fireEvent.click(screen.getByRole('button', { name: 'Entrar' }))

    await waitFor(() => expect(handleSubmit).toHaveBeenCalledTimes(1))
  })
})