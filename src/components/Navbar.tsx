'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { LuUser } from 'react-icons/lu';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { href: '/', label: 'Inicio' },
    { href: '/sales', label: 'Ventas' },
    { href: '/contact', label: 'Contacto' },
    { href: '/login', label: 'Sobre Nosotros', icon: LuUser },
  ];

  return (
    <nav
      className={`fixed top-0 w-full transition-all duration-300 z-50 flex items-center justify-between px-6 md:px-16 ${
        scrolled ? 'bg-nav py-2 shadow-md' : 'bg-transparent py-6'
      }`}
    >
      <div className="flex items-center gap-2 ml-2">
        <button
          onClick={() => router.push('/')}
          className="cursor-pointer bg-transparent border-none p-0"
          aria-label="Go to home"
        >
          <Image
            src="/logo.png"
            alt="Logo"
            width={150}
            height={150}
            className={`transition-all duration-300 ${
              scrolled ? 'h-14' : 'h-16'
            }`}
          />
        </button>
      </div>

      <div className="md:hidden">
        <button
          className="text-white text-3xl focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? '✕' : '☰'}
        </button>
      </div>

      <div
        className={`absolute top-full right-0 w-full md:w-auto text-white flex flex-col md:flex-row items-end text-right gap-4 p-4 transition-all duration-300
          md:static md:items-center md:gap-4 md:p-0 md:bg-transparent
          ${
            isMenuOpen
              ? `${scrolled ? 'bg-nav' : 'bg-transparent'} opacity-100 visible`
              : 'opacity-0 invisible md:opacity-100 md:visible'
          }`}
      >
        {links.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={`font-semibold text-white hover:underline transition-all duration-300 flex items-center gap-2 ${
              scrolled ? 'text-sm' : 'text-base'
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            {Icon ? <Icon className="w-5 h-5" /> : label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
