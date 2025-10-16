export interface MenuItemType {
  id: string;
  position: string;
  title: string;
}

export interface SubmenuItem {
  id: string;
  title: string;
  url: string;
  menuID: string;
}

export interface ProcessedMenuItem {
  id: string;
  position: number;
  title: string;
  to?: string;
  submenus?: SubmenuItem[];
}