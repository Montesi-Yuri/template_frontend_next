import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Users } from 'lucide-react';
import { cn } from '../../lib/utils';
import { buttonVariants } from '../../components/ui/button';

const adminLinks = [
  {
    title: "Gestione Ruoli",
    href: "/dashboard/roles",
    icon: ShieldCheck,
    permission: "manage-roles"
  },
  {
    title: "Gestione Utenti",
    href: "/dashboard/users",
    icon: Users,
    permission: "manage-users"
  }
];

const Sidebar = () => {
  const user = { is_admin: true }; // Replace with actual user data
  const pathname = "/dashboard/roles"; // Replace with actual pathname

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      {user?.is_admin && (
        <>
          <div className="px-3 py-2">
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
              Amministrazione
            </h2>
            <div className="space-y-1">
              {adminLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    buttonVariants({ variant: "ghost" }),
                    "w-full justify-start",
                    pathname === link.href
                      ? "bg-muted hover:bg-muted"
                      : "hover:bg-transparent hover:underline"
                  )}
                >
                  <link.icon className="mr-2 h-4 w-4" />
                  {link.title}
                </Link>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar; 