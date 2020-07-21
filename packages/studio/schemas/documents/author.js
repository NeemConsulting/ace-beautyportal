import { MdPerson } from 'react-icons/md'

export default {
  name: 'author',
  type: 'document',
  icon: MdPerson,
  title: 'Author',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name'
    },
    {
      name: 'image',
      type: 'figure',
      title: 'Image'
    },
    {
      name: 'bio',
      type: 'authorBioPortableText',
      title: 'Biography'
    },
    {
      name: 'parentPage',
      title: 'Parent Page',
      description: 'Article will be categorised under the parent landing page',
      type: 'reference',
      to: {
        type: 'landingPage'
      }
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {
        source: 'name',
        maxLength: 96
      }
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'slug.current',
      media: 'image'
    }
  }
}
