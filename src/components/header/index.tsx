import "./index.css";
import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Box,
  Menu,
  MenuItem,
  Typography,
  IconButton,
  useMediaQuery,
  useTheme,
  Paper,
  List,
  ListItem,
  ListItemText,
  Collapse,
  Button,
  Container,
} from "@mui/material";
import {
  Search as SearchIcon,
  Language as LanguageIcon,
  Menu as MenuIcon,
  ExpandMore,
  ExpandLess,
} from "@mui/icons-material";
import { LogoBrand, LogoBrandWhite } from "../logoBrand";
import {
  useGetMenusQuery,
  useGetSubmenusByIdQuery,
} from "../../features/menus/menusAPI";

// Base interface for all menu items from API
interface ApiMenuItem {
  id: string;
  position: string;
  title: string;
}

// Processed menu items for internal use
interface ProcessedMenuItem {
  id: string;
  position: number;
  title: string;
  submenus?: ProcessedMenuItem[];
}

export const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const {
    data: menuDatas,
    isLoading,
    error,
  } = useGetMenusQuery(undefined, {
    skip: !localStorage.getItem("access_token"),
  });

  const [menus, setMenus] = useState<ProcessedMenuItem[]>([]);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [anchorEl, setAnchorEl] = useState<{
    [key: string]: HTMLElement | null;
  }>({});
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedMobileMenu, setExpandedMobileMenu] = useState<string | null>(
    null
  );
  const headerRef = useRef<HTMLElement>(null);

  // Fetch submenus for active menu
  const { data: submenusData } = useGetSubmenusByIdQuery(activeMenu || "", {
    skip: !activeMenu,
  });

  useEffect(() => {
    if (menuDatas) {
      console.log("MENU DATAS: ", menuDatas);

      const sortedMenus = (menuDatas as ApiMenuItem[])
        .map((menu: ApiMenuItem) => ({
          id: menu.id,
          position: parseInt(menu.position?.trim() || "0"),
          title: menu.title?.trim() || "",
          submenus: [],
        }))
        .sort(
          (a: ProcessedMenuItem, b: ProcessedMenuItem) =>
            a.position - b.position
        );

      setMenus(sortedMenus);
      console.log("PROCESSED MENUS: ", sortedMenus);
    }
  }, [menuDatas]);

  // Update submenus when submenusData changes
  useEffect(() => {
    if (submenusData && activeMenu) {
      console.log("SUBMENUS DATA for menu", activeMenu, ":", submenusData);

      // Process submenus data - sort by position and clean titles
      const processedSubmenus: ProcessedMenuItem[] = (
        submenusData as unknown as ApiMenuItem[]
      )
        .map((submenu: ApiMenuItem) => ({
          id: submenu.id,
          position: parseInt(submenu.position?.trim() || "0"),
          title: submenu.title?.trim() || "",
        }))
        .sort(
          (a: ProcessedMenuItem, b: ProcessedMenuItem) =>
            a.position - b.position
        );

      setMenus((prevMenus) =>
        prevMenus.map((menu) =>
          menu.id === activeMenu
            ? { ...menu, submenus: processedSubmenus }
            : menu
        )
      );
    }
  }, [submenusData, activeMenu]);

  const handleMenuEnter = (
    menuId: string,
    event: React.MouseEvent<HTMLElement>
  ) => {
    console.log("Hovering menu:", menuId);
    setActiveMenu(menuId);
    setAnchorEl((prev) => ({ ...prev, [menuId]: event.currentTarget }));
  };

  const handleMenuLeave = () => {
    setTimeout(() => {
      if (!document.activeElement?.closest(".MuiPaper-root")) {
        setActiveMenu(null);
        setAnchorEl({});
      }
    }, 100);
  };

  const handleSubmenuEnter = () => {
    // Keep submenu open when hovering over it
  };

  const handleSubmenuLeave = () => {
    setActiveMenu(null);
    setAnchorEl({});
  };

  const handleMobileMenuToggle = (menuId: string) => {
    setExpandedMobileMenu(expandedMobileMenu === menuId ? null : menuId);
  };

  // Generate routes from menu titles
  const getRouteFromTitle = (title: string): string => {
    const routeMap: { [key: string]: string } = {
      Institucional: "/institucional",
      Serviços: "/servicos",
      Ferramentas: "/ferramentas",
      Informações: "/informacoes",
      Filatelia: "/filatelia",
      Tracking: "/tracking",
      "E-commerce": "/ecommerce",
      "Precisa de Ajuda?": "/ajuda",
      "Sobre Nós": "/sobre-nos",
      "Estrutura Organizacional": "/estrutura-organizacional",
      "Responsabilidade Social e Sustentabilidade": "/responsabilidade-social",
      "Notícias e Actualizações": "/noticias",
      "Parcerias Estratégicas": "/parcerias",
    };

    return routeMap[title] || `/${title.toLowerCase().replace(/\s+/g, "-")}`;
  };

  // Safe submenu filter
  const getSafeSubmenus = (
    submenus: ProcessedMenuItem[] | undefined
  ): ProcessedMenuItem[] => {
    if (!submenus) return [];
    return submenus;
  };

  // Fallback menu data
  const fallbackMenus: ProcessedMenuItem[] = [
    { id: "1", title: "Institucional", position: 1 },
    { id: "2", title: "Serviços", position: 2 },
    { id: "3", title: "Ferramentas", position: 3 },
    { id: "4", title: "Informações", position: 4 },
    { id: "5", title: "Filatelia", position: 5 },
    { id: "6", title: "Tracking", position: 6 },
    { id: "7", title: "E-commerce", position: 7 },
  ];

  const displayMenus = menus.length > 0 ? menus : fallbackMenus;

  // Debug: Log current state
  useEffect(() => {
    console.log("Current active menu:", activeMenu);
    console.log(
      "Current menus with submenus:",
      menus.filter((menu) => menu.submenus && menu.submenus.length > 0)
    );
  }, [activeMenu, menus]);

  // Desktop Navigation
  const renderDesktopMenu = () => (
    <Toolbar
      sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}
    >
      {/* Logo */}
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <NavLink to="/" style={{ textDecoration: "none" }}>
          <LogoBrand />
        </NavLink>
      </Box>

      {/* Navigation Menu */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        {displayMenus.map((menu) => {
          const safeSubmenus = getSafeSubmenus(menu.submenus);
          const hasSubmenus = safeSubmenus.length > 0;

          return (
            <Box
              key={menu.id}
              sx={{ position: "relative" }}
              onMouseEnter={(e) => handleMenuEnter(menu.id, e)}
              onMouseLeave={handleMenuLeave}
            >
              <Button
                component={NavLink}
                to={getRouteFromTitle(menu.title)}
                sx={{
                  color: "text.primary",
                  textTransform: "none",
                  padding: "8px 16px",
                  borderRadius: 1,
                  transition: "all 0.2s ease",
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  minWidth: "auto",
                  "&:hover": {
                    backgroundColor: "action.hover",
                    color: "primary.main",
                  },
                }}
                endIcon={
                  hasSubmenus ? <ExpandMore fontSize="small" /> : undefined
                }
              >
                {menu.title}
              </Button>

              {/* Dropdown Menu */}
              {hasSubmenus && (
                <Menu
                  anchorEl={anchorEl[menu.id]}
                  open={activeMenu === menu.id}
                  onClose={handleSubmenuLeave}
                  MenuListProps={{
                    onMouseEnter: handleSubmenuEnter,
                    onMouseLeave: handleSubmenuLeave,
                    sx: { py: 0 },
                  }}
                  PaperProps={{
                    sx: {
                      mt: 1,
                      minWidth: 200,
                      boxShadow: 3,
                      borderRadius: 1,
                    },
                  }}
                  transformOrigin={{ horizontal: "left", vertical: "top" }}
                  anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
                >
                  {safeSubmenus.map((submenu) => (
                    <MenuItem
                      key={submenu.id}
                      component={NavLink}
                      to={getRouteFromTitle(submenu.title)}
                      onClick={handleSubmenuLeave}
                      sx={{
                        py: 1.5,
                        px: 2,
                        borderBottom: "1px solid",
                        borderColor: "divider",
                        "&:last-child": { borderBottom: "none" },
                        "&:hover": {
                          backgroundColor: "action.hover",
                        },
                      }}
                    >
                      <ListItemText primary={submenu.title} />
                    </MenuItem>
                  ))}
                </Menu>
              )}
            </Box>
          );
        })}
      </Box>

      {/* Search and Language */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        {/* Language Selector */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton size="small" sx={{ color: "text.primary" }}>
            <LanguageIcon fontSize="small" />
          </IconButton>
          <Typography variant="body2" sx={{ color: "text.primary" }}>
            PT | EN
          </Typography>
        </Box>

        {/* Search */}
        <IconButton component={NavLink} to="/search">
          <SearchIcon />
        </IconButton>
      </Box>
    </Toolbar>
  );

  // Mobile Navigation
  const renderMobileMenu = () => (
    <Toolbar
      sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}
    >
      {/* Logo */}
      <NavLink to="/" style={{ textDecoration: "none" }}>
        <LogoBrandWhite />
      </NavLink>

      {/* Mobile Menu Button */}
      <IconButton
        edge="end"
        color="inherit"
        aria-label="menu"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        <MenuIcon />
      </IconButton>

      {/* Mobile Menu Drawer */}
      <Paper
        sx={{
          position: "absolute",
          top: "100%",
          left: 0,
          right: 0,
          zIndex: theme.zIndex.drawer,
          display: mobileMenuOpen ? "block" : "none",
          maxHeight: "80vh",
          overflow: "auto",
        }}
      >
        <List sx={{ py: 0 }}>
          {displayMenus.map((menu) => {
            const safeSubmenus = getSafeSubmenus(menu.submenus);
            const hasSubmenus = safeSubmenus.length > 0;

            return (
              <Box key={menu.id}>
                <ListItem
                  sx={{
                    borderBottom: "1px solid",
                    borderColor: "divider",
                    padding: 0,
                  }}
                >
                  <Button
                    component={NavLink}
                    to={getRouteFromTitle(menu.title)}
                    fullWidth
                    sx={{
                      justifyContent: "space-between",
                      textTransform: "none",
                      color: "text.primary",
                      padding: "12px 16px",
                      borderRadius: 0,
                    }}
                    onClick={(e) => {
                      if (hasSubmenus) {
                        e.preventDefault();
                        handleMobileMenuToggle(menu.id);
                      } else {
                        setMobileMenuOpen(false);
                      }
                    }}
                    endIcon={
                      hasSubmenus ? (
                        expandedMobileMenu === menu.id ? (
                          <ExpandLess />
                        ) : (
                          <ExpandMore />
                        )
                      ) : undefined
                    }
                  >
                    {menu.title}
                  </Button>
                </ListItem>

                {/* Mobile Submenu */}
                {hasSubmenus && (
                  <Collapse
                    in={expandedMobileMenu === menu.id}
                    timeout="auto"
                    unmountOnExit
                  >
                    <List
                      component="div"
                      disablePadding
                      sx={{ bgcolor: "background.default" }}
                    >
                      {safeSubmenus.map((submenu) => (
                        <ListItem key={submenu.id} sx={{ padding: 0 }}>
                          <Button
                            component={NavLink}
                            to={getRouteFromTitle(submenu.title)}
                            fullWidth
                            sx={{
                              justifyContent: "flex-start",
                              textTransform: "none",
                              color: "text.secondary",
                              padding: "8px 32px",
                              borderRadius: 0,
                              fontSize: "0.9rem",
                            }}
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {submenu.title}
                          </Button>
                        </ListItem>
                      ))}
                    </List>
                  </Collapse>
                )}
              </Box>
            );
          })}
        </List>

        {/* Mobile Footer Actions */}
        <Box sx={{ p: 2, borderTop: "1px solid", borderColor: "divider" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="body2">PT | EN</Typography>
            <IconButton
              component={NavLink}
              to="/search"
              onClick={() => setMobileMenuOpen(false)}
            >
              <SearchIcon />
            </IconButton>
          </Box>
        </Box>
      </Paper>
    </Toolbar>
  );
  return (
    <header className="">
      <div className="head container d-flex align-items-center justify-content-between">
        {isMobile ? renderMobileMenu() : renderDesktopMenu()}
      </div>
    </header>
  );
};
