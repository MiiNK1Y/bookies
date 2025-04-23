import { createRouter, createWebHistory } from 'vue-router';

import BrowserView from '@/views/BrowserView.vue';

import BrowserBookmarksView from '@/components/browser/views/BrowserBookmarksView.vue';
import BrowserTagsView from '@/components/browser/views/BrowserTagsView.vue';
import BrowserFileView from '@/components/browser/views/BrowserFileView.vue';
import BrowserHiddenView from '@/components/browser/views/BrowserHiddenView.vue';
import BrowserTrashView from '@/components/browser/views/BrowserTrashView.vue';
import BrowserSettingsView from '@/components/browser/views/BrowserSettingsView.vue';


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
          component: BrowserBookmarksView,
        },
        {
          path: 'tags',
          component: BrowserTagsView,
        },
        {
          path: 'file',
          component: BrowserFileView,
        },
        {
          path: 'hidden',
          component: BrowserHiddenView,
        },
        {
          path: 'trash',
          component: BrowserTrashView,
        },
        {
          path: 'settings',
          component: BrowserSettingsView,
        },
      ],
    },
  ],
});


export default router
