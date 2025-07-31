"use client";

import React, { useEffect } from 'react'
import Image from "next/image";
import { UserButton } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const Header = () => {
  const path = usePathname();

  useEffect(() => {
    console.log(path);
  }, [path]);

  return (
    <div className='flex p-4 items-center justify-between bg-secondary shadow-sm'>
      <Image src={'/logo.png'} alt="Logo" width={45} height={130} />

      <ul className='hidden md:flex gap-10 ml-10'>
        <li>
          <Link
            href="/dashboard"
            className={`hover:text-primary hover:font-bold transition-all ${
              path === '/dashboard' ? 'text-primary font-bold' : ''
            }`}
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/faqs"
            className={`hover:text-primary hover:font-bold transition-all ${
              path === '/dashboard/questions' ? 'text-primary font-bold' : ''
            }`}
          >
            FAQ
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/upgrade"
            className={`hover:text-primary hover:font-bold transition-all ${
              path === '/dashboard/upgrade' ? 'text-primary font-bold' : ''
            }`}
          >
            Upgrade
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/how"
            className={`hover:text-primary hover:font-bold transition-all ${
              path === '/dashboard/how' ? 'text-primary font-bold' : ''
            }`}
          >
            How it Works?
          </Link>
        </li>
      </ul>

      <UserButton />
    </div>
  );
};

export default Header;
