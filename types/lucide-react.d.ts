declare module 'lucide-react' {
  import { ComponentType, SVGProps } from 'react';

  interface IconProps extends SVGProps<SVGSVGElement> {
    size?: number | string;
    color?: string;
    strokeWidth?: number | string;
  }

  type Icon = ComponentType<IconProps>;
  export type LucideIcon = ComponentType<IconProps>;

  // Navigation icons
  export const Home: Icon;
  export const Code2: Icon;
  export const Trophy: Icon;
  export const MessageSquare: Icon;
  export const ViewIcon: Icon;
  export const LineChart: Icon;
  export const Users: Icon;
  
  // User icons
  export const User: Icon;
  export const Settings: Icon;
  export const LogOut: Icon;
  
  // Auth icons
  export const Github: Icon;
  export const Mail: Icon;
  export const Bell: Icon;
  export const Menu: Icon;
  export const Search: Icon;
  export const X: Icon;

  // Theme icons
  export const Moon: Icon;
  export const Sun: Icon;

  // Feature icons
  export const ArrowRight: Icon;
  export const Calendar: Icon;
  export const Code: Icon;
  export const Globe: Icon;
  export const Star: Icon;
  export const Brain: Icon;

  // Add more icons as needed
}