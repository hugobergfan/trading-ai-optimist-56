
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "@/components/ui/navbar-menu";
import { cn } from "@/lib/utils";

export function NavbarDemo() {
  return (
    <div className="relative w-full flex items-center justify-center">
      <Navbar className="top-2" />
      <p className="text-black dark:text-white">
        The Navbar will show on top of the page
      </p>
    </div>
  );
}

export function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div
      className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50", className)}
    >
      <Menu setActive={setActive}>
        <MenuItem setActive={setActive} active={active} item="Services">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink to="/web-dev">Web Development</HoveredLink>
            <HoveredLink to="/interface-design">Interface Design</HoveredLink>
            <HoveredLink to="/seo">Search Engine Optimization</HoveredLink>
            <HoveredLink to="/branding">Branding</HoveredLink>
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Products">
          <div className="text-sm grid grid-cols-2 gap-10 p-4">
            <ProductItem
              title="Trading Bot"
              href="/"
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
              description="Advanced AI-powered trading solutions for serious investors."
            />
            <ProductItem
              title="Market Analysis"
              href="/components"
              src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
              description="Real-time market analysis and trend prediction."
            />
            <ProductItem
              title="Performance Reports"
              href="/"
              src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
              description="Detailed performance reporting and analytics dashboard."
            />
            <ProductItem
              title="Strategy Builder"
              href="/"
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
              description="Create and backtest custom trading strategies with ease."
            />
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Pricing">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink to="/">Hobby</HoveredLink>
            <HoveredLink to="/">Individual</HoveredLink>
            <HoveredLink to="/">Team</HoveredLink>
            <HoveredLink to="/">Enterprise</HoveredLink>
          </div>
        </MenuItem>
      </Menu>
    </div>
  );
}
