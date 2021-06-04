import React from 'react'
import { render, screen } from '@testing-library/react'
import Demo from './Demo'

describe('Demo.tsx TestSuit', () => {
  it('should have title', () => {
    render(<Demo />)
    expect(screen.getByText(/Demo/)).toBeDefined()
  })
})
