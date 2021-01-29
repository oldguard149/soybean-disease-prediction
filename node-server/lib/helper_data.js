const className = ['2-4-d-injury', 'alternarialeaf-spot', 'anthracnose',
  'bacterial-blight', 'bacterial-pustule', 'brown-spot',
  'brown-stem-rot', 'charcoal-rot', 'cyst-nematode',
  'diaporthe-pod-&-stem-blight', 'diaporthe-stem-canker',
  'downy-mildew', 'frog-eye-leaf-spot', 'herbicide-injury',
  'phyllosticta-leaf-spot', 'phytophthora-rot', 'powdery-mildew',
  'purple-seed-stain', 'rhizoctonia-root-rot'];

const bodyName = ['date', 'plant-stand', 'precip', 'temp', 'hail', 'crop-hist',
  'area-damaged', 'severity', 'seed-tmt', 'germination', 'plant-growth', 'leaves',
  'leafspots-halo', 'leafspots-marg', 'leafspot-size', 'leaf-shread', 'leaf-malf',
  'leaf-mild', 'stem', 'lodging', 'stem-cankers', 'canker-lesion', 'fruiting-bodies',
  'external-decay', 'mycelium', 'int-discolor', 'sclerotina', 'fruit-pods', 'fruit-spots',
  'seed', 'mold-growth', 'seed-discolor', 'seed-size', 'shriveling', 'roots'];


const csvFields = [
  { label: 'date', value: 'date' },
  { label: 'plant-stand', value: 'plant-stand' },
  { label: 'precip', value: 'precip' },
  { label: 'temp', value: 'temp' },
  { label: 'hail', value: 'hail' },
  { label: 'crop-hist', value: 'crop-hist' },
  { label: 'area-damaged', value: 'area-damaged' },
  { label: 'severity', value: 'severity' },
  { label: 'seed-tmt', value: 'seed-tmt' },
  { label: 'germination', value: 'germination' },
  { label: 'plant-growth', value: 'plant-growth' },
  { label: 'leaves', value: 'leaves' },
  { label: 'leafspots-halo', value: 'leafspots-halo' },
  { label: 'leafspots-marg', value: 'leafspots-marg' },
  { label: 'leafspot-size', value: 'leafspot-size' },
  { label: 'leaf-shread', value: 'leaf-shread' },
  { label: 'leaf-malf', value: 'leaf-malf' },
  { label: 'leaf-mild', value: 'leaf-mild' },
  { label: 'stem', value: 'stem' },
  { label: 'lodging', value: 'lodging' },
  { label: 'stem-cankers', value: 'stem-cankers' },
  { label: 'canker-lesion', value: 'canker-lesion' },
  { label: 'fruiting-bodies', value: 'fruiting-bodies' },
  { label: 'external-decay', value: 'external-decay' },
  { label: 'mycelium', value: 'mycelium' },
  { label: 'int-discolor', value: 'int-discolor' },
  { label: 'sclerotina', value: 'sclerotina' },
  { label: 'fruit-pods', value: 'fruit-pods' },
  { label: 'fruit-spots', value: 'fruit-spots' },
  { label: 'seed', value: 'seed' },
  { label: 'mold-growth', value: 'mold-growth' },
  { label: 'seed-discolor', value: 'seed-discolor' },
  { label: 'seed-size', value: 'seed-size' },
  { label: 'shriveling', value: 'shriveling' },
  { label: 'roots', value: 'roots' },
  { label: 'class', value: 'class' }
]

module.exports = {
  className,
  bodyName,
  csvFields
}