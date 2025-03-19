
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
    <div className='absolute top-2 left-1/2 max-w-full -translate-x-1/2'>
      <Dock className='items-end pb-3'>
        {data.map((item, idx) => (
          <DockItem
            key={idx}
            className='aspect-square rounded-full bg-gray-200 dark:bg-neutral-800'
          >
            <DockLabel>{item.title}</DockLabel>
            <DockIcon>{item.icon}</DockIcon>
          </DockItem>
        ))}
      </Dock>
    </div>
  );
}
