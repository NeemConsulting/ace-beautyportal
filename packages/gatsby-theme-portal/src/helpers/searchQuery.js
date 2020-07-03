/* eslint-disable prettier/prettier */
const handleProductRawBody = node => {
  const { _rawUsageDetails, _rawIngredients, tags, brandName, ...rest } = node;
  const record = {
    ...rest,
    tag: tags.map(tag => tag.name),
    category: tags.map(tag => tag.tagCategory.name),
    brand: brandName ? brandName.name : '',
  };
  if (_rawUsageDetails) {
    record.usageBody = _rawUsageDetails
      .map(temp => temp.children && temp.children.map(temp1 => temp1.text))
      .toString();
  }
  if (_rawIngredients) {
    record.ingredientBody = _rawUsageDetails
      .map(temp => temp.children && temp.children.map(temp1 => temp1.text))
      .toString();
  }

  return record;
};

const handlehowToArticleRawBody = node => {
  const { _rawHowTobody, tags, ...rest } = node;
  const record = {
    ...rest,
    tag: tags.map(tag => tag.name),
    category: tags.map(tag => tag.tagCategory.name),
  };
  if (_rawHowTobody) {
    record.howTobody = _rawHowTobody
      .map(temp => temp.children && temp.children.map(temp1 => temp1.text))
      .toString();
  }

  return record;
};

const handleGalleryArticleRawBody = node => {
  const { _rawBody, tags, ...rest } = node;
  const record = {
    ...rest,
    tag: tags.map(tag => tag.name),
    category: tags.map(tag => tag.tagCategory.name),
  };
  if (_rawBody) {
    record.galleryBody = _rawBody
      .map(temp => temp.children && temp.children.map(temp1 => temp1.text))
      .toString();
  }

  return record;
};

const handleFeatureArticleRawBody = node => {
  const { _rawFeatureBody, tags, ...rest } = node;
  const record = {
    ...rest,
    tag: tags.map(tag => tag.name),
    category: tags.map(tag => tag.tagCategory.name),
  };
  if (_rawFeatureBody) {
    record.featureBody = _rawFeatureBody
      .map(temp => temp.children && temp.children.map(temp1 => temp1.text))
      .toString();
  }

  return record;
};
module.exports = {
  handleFeatureArticleRawBody,
  handleProductRawBody,
  handleGalleryArticleRawBody,
  handlehowToArticleRawBody,
};
