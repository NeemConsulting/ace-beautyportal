import { MdTextFields } from 'react-icons/md'

export default {
  name: 'accordionBlock',
  type: 'document',
  icon: MdTextFields,
  title: 'Accordion Block',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Accordion Block Name *',
      validation: Rule => Rule.required(),
      description: 'Name is used to identify the text for page layout'
    },
    {
      name: 'textBlockBody',
      type: 'textBlockPortableText',
      title: 'Accordion Text Block',
      description: 'Add some rich text or quote'
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'textBlockBody',
      media: 'MdTextFields'
    }
  }
}
