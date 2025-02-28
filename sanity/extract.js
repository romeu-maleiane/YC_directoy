import createSchema from 'part:@sanity/base/schema-creator';
import schemaTypes from 'all:part:@sanity/base/schema-type';

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([
    {
      name: 'startup',
      type: 'document',
      title: 'Startup',
      fields: [
        {
          name: 'title',
          type: 'string',
          title: 'Title'
        },
        {
          name: 'slug',
          type: 'slug',
          title: 'Slug',
          options: {
            source: 'title',
            maxLength: 96
          }
        },
        {
          name: 'description',
          type: 'text',
          title: 'Description'
        },
        {
          name: 'author',
          type: 'reference',
          to: [{ type: 'author' }]
        },
        {
          name: 'category',
          type: 'string',
          title: 'Category'
        },
        {
          name: 'image',
          type: 'image',
          title: 'Image'
        },
        {
          name: 'views',
          type: 'number',
          title: 'Views'
        }
      ]
    },
    {
      name: 'author',
      type: 'document',
      title: 'Author',
      fields: [
        {
          name: 'name',
          type: 'string',
          title: 'Name'
        },
        {
          name: 'image',
          type: 'image',
          title: 'Image'
        },
        {
          name: 'bio',
          type: 'text',
          title: 'Bio'
        }
      ]
    }
  ])
});