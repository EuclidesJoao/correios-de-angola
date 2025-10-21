// interfaces/index.ts
export interface ApiMenuItem {
  id: string;
  position: string;
  title: string;
}

export interface ProcessedMenuItem {
  id: string;
  position: number;
  title: string;
  submenus?: ProcessedMenuItem[];
}

export interface PageContent {
  protected: boolean;
  rendered: string;
}

export interface SubmenuResponse {
  id: string;
  position: string;
  title: string;
}