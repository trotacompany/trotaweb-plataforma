import NavRail from "../components/NavRail.tsx";
import NavRailItem from "../components/NavRailItem.tsx";
interface NavRailPrincipalProps {
  url: string;
}
export default function NavRailPrincipal(
  { url }: NavRailPrincipalProps,
) {
  const menuItems = [
    { href: "/inicio", icon: "home", label: "Inicio" },
    { href: "/paquetes", icon: "deployed_code", label: "Paquetes" },
    { href: "/cuenta", icon: "settings", label: "Cuenta" },
  ];
  return (
    <NavRail
      items={
        <>
          {menuItems.map((item) => (
            <a href={item.href} tabIndex={-1} key={item.href}>
              <NavRailItem
                icon={item.icon}
                class={url === item.href ? "active" : ""}
              >
                {item.label}
              </NavRailItem>
            </a>
          ))}
        </>
      }
    />
  );
}
