const generateImages = (folder, prefix, count, extensions = {}) => {
  return Array.from({ length: count }, (_, i) => {
    const index = i + 1;
    const ext = extensions[index] || 'png';
    return `/images/${folder}/${prefix}${index}.${ext}`;
  });
};

export const galleryData = {
  heroGrid: [
    "/images/single/p (1).png",
    "/images/single/p (42).png",
    "/images/single/p (12).png"
  ],
  portraits: Array.from({ length: 42 }, (_, i) => `/images/single/p (${i + 1}).png`),
  magicMakeovers: generateImages('comparison', 'c', 18),
  hairstyles: generateImages('hairstyle', 'h', 12),
  mehndi: generateImages('mehndi', 'm', 24),
  nailart: generateImages('nailart', 'n', 18, {
    1: 'webp',
    17: 'jpeg', 
    18: 'jpeg', 
    16: 'jpeg'
  }),
  saree: ["/images/saree/sa (1).png", "/images/saree/sa (2).png"]
};