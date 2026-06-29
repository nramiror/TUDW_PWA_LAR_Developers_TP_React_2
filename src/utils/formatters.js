export const formatFieldLabel = (key, t) => {
  const labelMap = {
    name: t('itemDetail.labels.name'),
    category: t('itemDetail.labels.category'),
    description: t('itemDetail.labels.description'),
    image: t('itemDetail.labels.image'),
  };
  
  const normalizedKey = key.replace(/[_\s-]/g, '').toLowerCase();
  if (labelMap[normalizedKey]) return labelMap[normalizedKey];

  return key.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/_/g, ' ').toLowerCase();
};

export const formatFieldValue = (value, t) => {
  if (Array.isArray(value)) return value.join(', ');
  if (value && typeof value === 'object') return JSON.stringify(value);
  return value === null || value === undefined || value === '' 
    ? t('itemDetail.values.noData') 
    : String(value);
};