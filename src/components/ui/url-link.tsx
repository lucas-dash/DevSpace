import { linkUrlChecker } from '@/lib/helperFunc';
import { Button, buttonVariants } from './button';
import Link from 'next/link';
import { Facebook, Instagram, LinkIcon, TwitterIcon } from 'lucide-react';
import { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import { VariantProps } from 'class-variance-authority';

type ButtonVariant = VariantProps<typeof buttonVariants>['variant'];
type ButtonSize = VariantProps<typeof buttonVariants>['size'];

type UrlLinkProps = {
  url: string;
  icon?: boolean;
  variant?: ButtonVariant;
  size?: ButtonSize;
} & HTMLAttributes<HTMLButtonElement>;

export default function UrlLink({
  url,
  icon = false,
  variant = 'link',
  size = 'default',
  className,
  ...props
}: UrlLinkProps) {
  const socialIcons: { [key: string]: React.ElementType } = {
    'twitter.com': TwitterIcon,
    'facebook.com': Facebook,
    'instagram.com': Instagram,
  };

  const getSocialIcon = (url: string) => {
    const Icon = Object.keys(socialIcons).find((domain) => url.includes(domain))
      ? socialIcons[
          Object.keys(socialIcons).find((domain) =>
            url.includes(domain)
          ) as keyof typeof socialIcons
        ]
      : LinkIcon;
    return <Icon size={20} className="mr-1" />;
  };

  return (
    <Button
      variant={variant}
      size={size}
      asChild
      className={cn(className, '')}
      {...props}
    >
      <Link href={linkUrlChecker(url)} rel="noreferrer" target="_blank">
        {icon && getSocialIcon(url)}
        {url}
      </Link>
    </Button>
  );
}
