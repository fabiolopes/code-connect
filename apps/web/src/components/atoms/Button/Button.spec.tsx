import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Button } from './Button'

describe('Button (Atom)', () => {
  it('deve renderizar o conteúdo essencial do botão', () => {
    render(<Button>Clique aqui</Button>)

    const button = screen.getByRole('button', { name: /clique aqui/i })
    expect(button).toBeInTheDocument()
    expect(button).toHaveAttribute('type', 'button')
  })

  it('deve disparar o evento onClick quando acionado pelo usuário', () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Ação</Button>)

    fireEvent.click(screen.getByRole('button', { name: /ação/i }))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('deve refletir o estado desabilitado e não disparar o evento', () => {
    const handleClick = vi.fn()
    render(
      <Button disabled onClick={handleClick}>
        Desabilitado
      </Button>,
    )

    const button = screen.getByRole('button', { name: /desabilitado/i })
    expect(button).toBeDisabled()

    fireEvent.click(button)
    expect(handleClick).not.toHaveBeenCalled()
  })

  it('deve desabilitar o botão e exibir o spinner enquanto isLoading', () => {
    render(<Button isLoading>Entrar</Button>)

    const button = screen.getByRole('button', { name: /entrar/i })
    expect(button).toBeDisabled()
    expect(button).toHaveAttribute('aria-busy', 'true')
    expect(screen.getByTestId('button-spinner')).toBeInTheDocument()
  })

  it('deve aplicar as classes conforme a variant e o size informados', () => {
    const { rerender } = render(<Button variant="secondary" size="sm">S</Button>)
    expect(screen.getByRole('button')).toHaveClass('border-gray-600', 'h-9')

    rerender(
      <Button variant="primary" size="lg">
        G
      </Button>,
    )
    expect(screen.getByRole('button')).toHaveClass('bg-code-connect-accent', 'h-14')
  })

  it('deve aplicar w-full quando fullWidth for verdadeiro', () => {
    render(<Button fullWidth>Largo</Button>)
    expect(screen.getByRole('button')).toHaveClass('w-full')
  })
})