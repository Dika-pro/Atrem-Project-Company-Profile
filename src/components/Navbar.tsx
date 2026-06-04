import React from 'react'
import GooeyNav from './animations/GooeyNav'

export const Navbar: React.FC = () => {
  const navItems = [
    { id: 'company', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'learning', label: 'Learning' },
    { id: 'projects', label: 'Projects' },
  ]

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const offset = 100
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  return (
    <header className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
      <GooeyNav 
        items={navItems} 
        onItemClick={(item) => scrollToSection(item.id as string)}
        className="max-w-fit"
      />
    </header>
  )
}
