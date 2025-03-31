import { createRouter, createWebHistory } from 'vue-router';
import BrowserView from '@/views/BrowserView.vue';
import BookmarksBrowserView from '@/components/browser/views/BookmarksBrowserView.vue';
import FileBrowserView from '@/components/browser/views/FileBrowserView.vue';
import HiddenBrowserView from '@/components/browser/views/HiddenBrowserView.vue';
import TrashBrowserView from '@/components/browser/views/TrashBrowserView.vue';
import SettingsBrowserView from '@/components/browser/views/SettingsBrowserView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'welcome',
      component: () => import ('../views/WelcomeView.vue'),
    },
    {
      path: '/browser',
      component: BrowserView,
      children: [
        {
          path: 'bookmarks',
          component: BookmarksBrowserView,
        },
        {
          path: 'file',
          component: FileBrowserView,
        },
        {
          path: 'hidden',
          component: HiddenBrowserView,
        },
        {
          path: 'trash',
          component: TrashBrowserView,
        },
        {
          path: 'settings',
          component: SettingsBrowserView,
        },
      ],
    },
  ],
});

export default router
