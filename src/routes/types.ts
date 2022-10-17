export interface RouteConfig {
  component: React.ReactNode;
  path?: string;
  requireAuth?: boolean;
  redirectPath?: string;
  routes?: RouteConfig[];
}
