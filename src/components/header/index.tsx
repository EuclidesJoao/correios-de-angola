import "./index.css";
import { useState, useEffect, useRef, useCallback } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Toolbar,
  Box,
  Paper,
  List,
  ListItem,
  ListItemText,
  Collapse,
  Button,
  IconButton,
  Typography,
  CircularProgress,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  Search as SearchIcon,
  Language as LanguageIcon,
  Menu as MenuIcon,
  ExpandMore,
  ExpandLess,
} from "@mui/icons-material";
import { LogoBrand, LogoBrandWhite } from "../logoBrand";
import { useGetMenusQuery } from "../../features/menus/menusAPI";
import { useGetSubmenusByIdQuery } from "../../features/menus/submenus.API";
import { ApiMenuItem, ProcessedMenuItem } from "../../interface";
import { useDispatch } from "react-redux";
import { setSelectedSlug } from "../../features/pageContent/pageSlice";

// === Constants ===
const HOVER_DELAY = 150;
const ROUTE_MAP: { [key: string]: string } = {
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

export const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menus, setMenus] = useState<ProcessedMenuItem[]>([]);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [anchorEl, setAnchorEl] = useState<{
    [key: string]: HTMLElement | null;
  }>({});
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedMobileMenu, setExpandedMobileMenu] = useState<string | null>(
    null
  );
  const [submenuCache, setSubmenuCache] = useState<{
    [key: string]: ProcessedMenuItem[];
  }>({});

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const { data: menuDatas } = useGetMenusQuery(undefined);
  const { data: submenusData, isFetching: isFetchingSubmenus } =
    useGetSubmenusByIdQuery(activeMenu || "", {
      skip: !activeMenu || !!submenuCache[activeMenu],
    });

  useEffect(() => {
    if (!menuDatas) return;

    const processedMenus = (menuDatas as ApiMenuItem[])
      .map((menu) => ({
        id: parseInt(menu.id?.trim() || "0").toString(),
        position: parseInt(menu.position?.trim() || "0"),
        title: menu.title?.trim() || "",
        submenus:
          submenuCache[parseInt(menu.id?.trim() || "0").toString()] || [],
      }))
      .filter((menu) => menu.id !== "47" && menu.id !== "51")
      .sort((a, b) => a.position - b.position);

    setMenus(processedMenus);
  }, [menuDatas, submenuCache]);

  useEffect(() => {
    if (
      submenusData &&
      activeMenu &&
      !submenuCache[activeMenu] &&
      !isFetchingSubmenus
    ) {
      const processedSubmenus: ProcessedMenuItem[] = (
        submenusData as ApiMenuItem[]
      )
        .map((submenu) => ({
          id: submenu.id,
          position: parseInt(submenu.position?.trim() || "0"),
          title: submenu.title || "",
        }))
        .sort((a, b) => a.position - b.position);

      setSubmenuCache((prev) => ({ ...prev, [activeMenu]: processedSubmenus }));

      setMenus((prev) =>
        prev.map((menu) =>
          menu.id === activeMenu
            ? { ...menu, submenus: processedSubmenus }
            : menu
        )
      );
    }
  }, [submenusData, activeMenu, submenuCache, isFetchingSubmenus]);

  const getRouteFromTitle = useCallback(
    (title: string): string =>
      ROUTE_MAP[title] || `/${title.toLowerCase().replace(/\s+/g, "-")}`,
    []
  );

  const clearCloseTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const startCloseTimer = useCallback(() => {
    clearCloseTimer();
    timerRef.current = setTimeout(() => setActiveMenu(null), HOVER_DELAY);
  }, [clearCloseTimer]);

  useEffect(() => () => clearCloseTimer(), [clearCloseTimer]);

  // === Event Handlers ===
  const handleMenuEnter = useCallback(
    (menuId: string, event: React.MouseEvent<HTMLElement>) => {
      clearCloseTimer();

      // Immediately close previous submenu if switching
      setActiveMenu((prev) => (prev !== menuId ? menuId : prev));

      setAnchorEl((prev) => ({ ...prev, [menuId]: event.currentTarget }));
    },
    [clearCloseTimer]
  );

  const handleCloseMenu = useCallback(() => {
    clearCloseTimer();
    setActiveMenu(null);
  }, [clearCloseTimer]);

  const handleSubmenuClick = useCallback(
    (title: string) => {
      if (title.trim() === "Cálculo de Tarifas") {
        navigate("/calculo-tarifas");
      } else {
        dispatch(setSelectedSlug(title));
      }

      handleCloseMenu();
    },
    [dispatch, handleCloseMenu, navigate]
  );

  const handleMenuLeave = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      const relatedTarget = event.relatedTarget as HTMLElement;
      // Only close when leaving all menus, not switching
      if (!relatedTarget?.closest(".menu-container")) {
        startCloseTimer();
      }
    },
    [startCloseTimer]
  );

  const handleSubmenuEnter = useCallback(
    () => clearCloseTimer(),
    [clearCloseTimer]
  );
  const handleSubmenuLeave = useCallback(
    () => startCloseTimer(),
    [startCloseTimer]
  );

  const handleMobileMenuToggle = useCallback(
    (menuId: string) => {
      setExpandedMobileMenu((prev) => (prev === menuId ? null : menuId));
      if (!submenuCache[menuId]) setActiveMenu(menuId);
    },
    [submenuCache]
  );

  // === Render Desktop ===
  const renderDesktopMenu = () => (
    <Toolbar
      sx={{
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
        gap: 2,
      }}
    >
      {/* Logo */}
      <Box sx={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
        <NavLink to="/" style={{ textDecoration: "none" }}>
          <LogoBrand />
        </NavLink>
      </Box>

      {/* Menus */}
      <Box
        className="menu-container"
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          flex: 1,
          justifyContent: "center",
          position: "relative",
        }}
      >
        {menus.map((menu) => {
          const submenus = menu.submenus || [];
          const hasSubmenus = submenus.length > 0;
          const isMenuActive = activeMenu === menu.id;

          return (
            <Box
              key={menu.id}
              sx={{ position: "relative" }}
              onMouseEnter={(e) => handleMenuEnter(menu.id, e)}
              onMouseLeave={handleMenuLeave}
            >
              <Button
                component="button"
                aria-haspopup={hasSubmenus ? "true" : "false"}
                sx={{
                  color: "text.primary",
                  textTransform: "none",
                  padding: "8px 16px",
                  borderRadius: 1,
                  "&:hover": {
                    backgroundColor: "action.hover",
                    color: "primary.main",
                  },
                  "&.active": { color: "primary.main", fontWeight: "bold" },
                }}
                endIcon={
                  isMenuActive ? <ExpandMore fontSize="small" /> : undefined
                }
              >
                {menu.title}
                {isMenuActive && isFetchingSubmenus && hasSubmenus && (
                  <CircularProgress size={16} sx={{ ml: 1 }} />
                )}
              </Button>

              {hasSubmenus && (
                <Box
                  sx={{
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    zIndex: theme.zIndex.modal,
                  }}
                >
                  <Paper
                    sx={{
                      display: isMenuActive ? "block" : "none",
                      mt: 1,
                      minWidth: 200,
                      boxShadow: 3,
                      borderRadius: 1,
                      border: "1px solid",
                      borderColor: "divider",
                      overflow: "hidden",
                    }}
                    onMouseEnter={handleSubmenuEnter}
                    onMouseLeave={handleSubmenuLeave}
                  >
                    <List sx={{ py: 0 }}>
                      {submenus.map((submenu) => (
                        <ListItem
                          key={submenu.id}
                          disablePadding
                          sx={{
                            borderBottom: "1px solid",
                            borderColor: "divider",
                            "&:last-child": { borderBottom: "none" },
                          }}
                        >
                          <Button
                            onClick={() => handleSubmenuClick(submenu.title)}
                            sx={{
                              textTransform: "none",
                              color: "text.primary",
                              justifyContent: "flex-start",
                              width: "100%",
                              borderRadius: 0,
                              px: 2,
                              py: 1.5,
                              textAlign: "left",
                              "&:hover": {
                                backgroundColor: "action.hover",
                              },
                            }}
                          >
                            <ListItemText
                              primary={submenu.title}
                              primaryTypographyProps={{ variant: "body2" }}
                            />
                          </Button>
                        </ListItem>
                      ))}
                    </List>
                  </Paper>
                </Box>
              )}
            </Box>
          );
        })}
      </Box>

      {/* Language + Search */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton size="small" sx={{ color: "text.primary" }}>
            <LanguageIcon fontSize="small" />
          </IconButton>
          <Typography variant="body2">PT | EN</Typography>
        </Box>
        <IconButton component={NavLink} to="/search">
          <SearchIcon />
        </IconButton>
      </Box>
    </Toolbar>
  );

  // === Render Mobile ===
  const renderMobileMenu = () => (
    <Toolbar
      sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}
    >
      <NavLink to="/" style={{ textDecoration: "none" }}>
        <LogoBrandWhite />
      </NavLink>

      <IconButton onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
        <MenuIcon />
      </IconButton>

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
          {menus.map((menu) => {
            const submenus = menu.submenus || [];
            const hasSubmenus = submenus.length > 0;
            const isExpanded = expandedMobileMenu === menu.id;

            return (
              <Box key={menu.id}>
                <ListItem
                  sx={{
                    borderBottom: "1px solid",
                    borderColor: "divider",
                    p: 0,
                  }}
                >
                  <Button
                    component={hasSubmenus ? "button" : NavLink}
                    to={hasSubmenus ? undefined : getRouteFromTitle(menu.title)}
                    fullWidth
                    sx={{
                      justifyContent: "space-between",
                      textTransform: "none",
                      color: "text.primary",
                      p: "12px 16px",
                    }}
                    onClick={(e: React.MouseEvent<HTMLElement>) => {
                      if (hasSubmenus) {
                        e.preventDefault();
                        handleMobileMenuToggle(menu.id);
                      } else {
                        setMobileMenuOpen(false);
                      }
                    }}
                    endIcon={
                      hasSubmenus ? (
                        isExpanded ? (
                          <ExpandLess />
                        ) : (
                          <ExpandMore />
                        )
                      ) : undefined
                    }
                  >
                    {menu.title}
                    {isExpanded && isFetchingSubmenus && hasSubmenus && (
                      <CircularProgress size={16} sx={{ mr: 1 }} />
                    )}
                  </Button>
                </ListItem>

                {hasSubmenus && (
                  <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {submenus.map((submenu) => (
                        <ListItem key={submenu.id} sx={{ p: 0 }}>
                          <Button
                            component={NavLink}
                            to={getRouteFromTitle(submenu.title)}
                            fullWidth
                            sx={{
                              justifyContent: "flex-start",
                              textTransform: "none",
                              color: "text.secondary",
                              p: "8px 32px",
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
    <header className="header">
      <div className="head container d-flex align-items-center justify-content-between">
        {isMobile ? renderMobileMenu() : renderDesktopMenu()}
      </div>
    </header>
  );
};
