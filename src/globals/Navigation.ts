import type { GlobalConfig } from 'payload'

export const Navigation: GlobalConfig = {
  slug: 'navigation',
  label: 'Menu',
  admin: {
    group: 'Site Settings',
  },
  access: {
    read: () => true, 
   },
  fields: [
    {
      name: 'mainMenu',
      type: 'array',
      label: 'Main Header Navigation',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          label: 'Menu Label (e.g. Shop, Categories, About)',
        },
        {
          name: 'type',
          type: 'select',
          defaultValue: 'custom',
          options: [
            { label: 'Custom URL', value: 'custom' },
            { label: 'Category Link', value: 'category' },
            { label: 'Page Link', value: 'page' },
          ],
        },
        {
          name: 'url',
          type: 'text',
          label: 'Custom URL',
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'custom',
          },
        },
        {
          name: 'category',
          type: 'relationship',
          relationTo: 'categories',
          label: 'Select Category',
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'category',
          },
        },
        {
          name: 'page',
          type: 'relationship',
          relationTo: 'pages',
          label: 'Select Page',
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'page',
          },
        },
        // --- SUB MENU (DROPDOWN LINKS) ---
        {
          name: 'subMenu',
          type: 'array',
          label: 'Sub Menu Links (Dropdown)',
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
              label: 'Sub Link Label',
            },
            {
              name: 'url',
              type: 'text',
              required: true,
              label: 'URL / Path (e.g. /shop/laptops)',
            },
          ],
        },
      ],
    },
  ],
}
