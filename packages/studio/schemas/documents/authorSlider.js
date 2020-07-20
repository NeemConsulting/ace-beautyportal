import { FaSlidersH } from 'react-icons/fa'

export default {
  name: 'authorSlider',
  type: 'document',
  icon: FaSlidersH,
  title: 'Author Slider',
  description: 'Author slider for showing global editors & experts ',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Slider',
      description: 'Name is used to identify the slider for page layout'
    },
    {
      name: 'headline',
      title: 'Headline',
      type: 'string',
      description: 'Headline will be displayed on website'
    },
    {
      name: 'description',
      title: 'Description',
      type: 'string',
      description: 'Description will be displayed on website'
    },
    {
      name: 'slideType',
      title: 'Slide Type',
      type: 'reference',
      to: {
        type: 'sliderType'
      },
      description: 'Select Slide Type'
    },
    {
      name: 'slides',
      type: 'array',
      title: 'Slides',
      description: 'Add list of authors',
      of: [
        {
          type: 'reference',
          to: [{ type: 'author' }]
        }
      ]
    },
    {
      name: 'searchCtaLabel',
      type: 'string',
      title: 'Search CTA Label',
      description: 'For example: See All, or leave blank'
    },
    {
      name: 'searchTags',
      type: 'array',
      title: 'Search Tags',
      description: 'Add list of tags that will be searched, when CTA label is pressed',
      of: [
        {
          type: 'reference',
          to: {
            type: 'tag'
          }
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'slideType.name',
      media: 'FaSlidersH'
    }
  }
}
