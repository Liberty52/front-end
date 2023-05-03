import { Stack } from "@mui/material";
import { useLocation } from "react-router";
import { items } from "./Config";
import { SideNavItem } from "./side-nav-item";

const SideNav = () => {
  const pathname = useLocation();
  return (
    <>
      <Stack
        component="ul"
        spacing={0.5}
        sx={{
          listStyle: "none",
          p: 0,
          m: 0,
        }}
      >
        {items.map((item) => {
          const active = item.path ? pathname === item.path : false;

          return (
            <SideNavItem
              active={active}
              disabled={item.disabled}
              external={item.external}
              icon={item.icon}
              key={item.title}
              path={item.path}
              title={item.title}
            />
          );
        })}
      </Stack>
    </>
  );
};

export default SideNav;
