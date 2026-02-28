import { appNav } from './AppNav';

export const appLayout = (content: string): string => `${appNav()}<main class="container">${content}</main>`;
