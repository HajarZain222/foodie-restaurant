import AuthButton from "./AuthButton";
import NavbarClient from "./NavbarClient";

export default function Navbar() {
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/meals", label: "Meals" },
    { href: "/categories", label: "Categories" },
  ];

  return <NavbarClient navLinks={navLinks} authButton={<AuthButton />} />;
}