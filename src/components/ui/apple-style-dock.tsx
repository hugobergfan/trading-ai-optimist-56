
import { Link } from 'react-router-dom';
import {
  HomeIcon,
  HelpCircle,
  BadgeDollarSign,
  FileText,
  User,
} from 'lucide-react';

import { Dock, DockIcon, DockItem, DockLabel } from '@/components/ui/dock';

const data = [
  {
    title: 'Home',
    icon: (
      <HomeIcon className='h-full w-full text-neutral-600 dark:text-neutral-300' />
    ),
    href: '/',
  },
  {
    title: 'About',
    icon: (
      <User className='h-full w-full text-neutral-600 dark:text-neutral-300' />
    ),
    href: '/about',
  },
  {
    title: 'Why Us',
    icon: (
      <HelpCircle className='h-full w-full text-neutral-600 dark:text-neutral-300' />
    ),
    href: '/why-us',
  },
  {
    title: 'Pricing',
    icon: (
      <BadgeDollarSign className='h-full w-full text-neutral-600 dark:text-neutral-300' />
    ),
    href: '/pricing',
  },
  {
    title: 'Docs',
    icon: (
      <FileText className='h-full w-full text-neutral-600 dark:text-neutral-300' />
    ),
    href: '/docs',
  },
];

export function AppleStyleDock() {
  return (
    <div className='fixed top-2 left-1/2 max-w-full -translate-x-1/2 z-40'>
      <Dock className='items-end pb-3'>
        {data.map((item, idx) => (
          <Link to={item.href} key={idx} className="block">
            <DockItem
              className='cursor-pointer'
            >
              <DockLabel>{item.title}</DockLabel>
              <DockIcon>{item.icon}</DockIcon>
            </DockItem>
          </Link>
        ))}
      </Dock>
    </div>
  );
}
