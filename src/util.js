const parseRgbFromHex = (hex) => {
  // hex is in the form "#RRGGBB", so start at 1 to skip "#"
  const r = parseInt(hex.substring(1, 3), 16);
  const g = parseInt(hex.substring(3, 5), 16);
  const b = parseInt(hex.substring(5), 16);
  return [r, g, b];
};

const pickForegroundColor = (backgroundColor, darkColor, lightColor) => {
  const [r, g, b] = parseRgbFromHex(backgroundColor).map((c) => {
    c /= 255;
    if (c <= 0.04045) {
      return c / 12.92;
    } else {
      return Math.pow((c + 0.055) / 1.055, 2.4);
    }
  });
  const L = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return L > 0.179 ? darkColor : lightColor;
};

export { parseRgbFromHex, pickForegroundColor };
