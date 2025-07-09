import { NavLink } from "react-router";

export default function NotesDisplayBtn({children, route}) {
  return (
    <NavLink
      to={route}
      className={({ isActive }) =>
        `flex items-center justify-center font-semibold
        border rounded-[var(--rounded-standard)] 
        py-4 pl-3.5 pr-4 gap-[10px] w-1/2 bg-white transition
        
        
        ${isActive 
          ? 'border-brand-orange text-brand-orange cursor-default' 
          : 'border-gray-300 text-text-color shadow-custom-size  shadow-gray-300 hover:bg-brand-orange/20 hover:border-brand-orange hover:text-brand-orange'
        }`
      }
    >
      {children}
    </NavLink>
  );
}