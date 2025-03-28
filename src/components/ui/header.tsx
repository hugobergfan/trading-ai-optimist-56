import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { Menu, MoveRight, X } from "lucide-react";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";

// Custom NavigationMenuLink that works with React Router
const RouterNavigationMenuLink = ({
  href,
  children,
  className
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) => {
  return <RouterLink to={href} className={className}>
      {children}
    </RouterLink>;
};
function Header1() {
  const navigationItems = [{
    title: "Home",
    href: "/",
    description: ""
  }, {
    title: "Product",
    description: "Managing a small business today is already tough.",
    items: [{
      title: "Reports",
      href: "/reports"
    }, {
      title: "Statistics",
      href: "/statistics"
    }, {
      title: "Dashboards",
      href: "/dashboards"
    }, {
      title: "Recordings",
      href: "/recordings"
    }]
  }, {
    title: "Company",
    description: "Managing a small business today is already tough.",
    items: [{
      title: "About us",
      href: "/about"
    }, {
      title: "Fundraising",
      href: "/fundraising"
    }, {
      title: "Investors",
      href: "/investors"
    }, {
      title: "Contact us",
      href: "/contact"
    }]
  }];
  const [isOpen, setOpen] = useState(false);
  return <header className="w-full z-40 fixed top-0 left-0 bg-background">
            <div className="container relative mx-auto min-h-20 flex gap-4 flex-row lg:grid lg:grid-cols-3 items-center">
                <div className="justify-start items-center gap-4 lg:flex hidden flex-row">
                    <NavigationMenu className="flex justify-start items-start">
                        <NavigationMenuList className="flex justify-start gap-4 flex-row">
                            {navigationItems.map(item => <NavigationMenuItem key={item.title}>
                                    {item.href ? <>
                                            <NavigationMenuLink asChild>
                                                <RouterLink to={item.href}>
                                                    <Button variant="ghost" className="text-base font-extralight">{item.title}</Button>
                                                </RouterLink>
                                            </NavigationMenuLink>
                                        </> : <>
                                            <NavigationMenuTrigger className="text-sm font-extralight">
                                                {item.title}
                                            </NavigationMenuTrigger>
                                            <NavigationMenuContent className="!w-[450px] p-4">
                                                <div className="flex flex-col lg:grid grid-cols-2 gap-4">
                                                    <div className="flex flex-col h-full justify-between">
                                                        <div className="flex flex-col">
                                                            <p className="text-base">{item.title}</p>
                                                            <p className="text-muted-foreground text-sm">
                                                                {item.description}
                                                            </p>
                                                        </div>
                                                        <Button size="sm" className="mt-10">
                                                            Book a call today
                                                        </Button>
                                                    </div>
                                                    <div className="flex flex-col text-sm h-full justify-end">
                                                        {item.items?.map(subItem => <RouterLink to={subItem.href} key={subItem.title} className="flex flex-row justify-between items-center hover:bg-muted py-2 px-4 rounded">
                                                                <span>{subItem.title}</span>
                                                                <MoveRight className="w-4 h-4 text-muted-foreground" />
                                                            </RouterLink>)}
                                                    </div>
                                                </div>
                                            </NavigationMenuContent>
                                        </>}
                                </NavigationMenuItem>)}
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
                <div className="flex lg:justify-center">
                    <p className="text-3xl font-extralight text-[#00b2ff]">Finox.ai</p>
                </div>
                <div className="In sign in you should go to a sign in page. In get started you should go to a get started page">
                    
                    <div className="border-r hidden md:inline"></div>
                    <Button variant="outline">Sign in</Button>
                    <Button>Get started</Button>
                </div>
                <div className="flex w-12 shrink lg:hidden items-end justify-end">
                    <Button variant="ghost" onClick={() => setOpen(!isOpen)}>
                        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </Button>
                    {isOpen && <div className="absolute top-20 border-t flex flex-col w-full right-0 bg-background shadow-lg py-4 container gap-8">
                            {navigationItems.map(item => <div key={item.title}>
                                    <div className="flex flex-col gap-2">
                                        {item.href ? <RouterLink to={item.href} className="flex justify-between items-center">
                                                <span className="text-lg">{item.title}</span>
                                                <MoveRight className="w-4 h-4 stroke-1 text-muted-foreground" />
                                            </RouterLink> : <p className="text-lg">{item.title}</p>}
                                        {item.items && item.items.map(subItem => <RouterLink key={subItem.title} to={subItem.href} className="flex justify-between items-center">
                                                    <span className="text-muted-foreground">
                                                        {subItem.title}
                                                    </span>
                                                    <MoveRight className="w-4 h-4 stroke-1" />
                                                </RouterLink>)}
                                    </div>
                                </div>)}
                        </div>}
                </div>
            </div>
        </header>;
}
export { Header1 };