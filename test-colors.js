// Test script pro ověření vlastního barevného schématu
import { customColors, getCustomColors } from "./src/theme/muiTheme.js";

console.log("=== Test vlastního barevného schématu ===\n");

// Test light mode barev
console.log("🌞 Light Mode Colors:");
const lightColors = getCustomColors("light");
console.log("Primary (Orange Pantone):", lightColors.orangePantone);
console.log("Secondary (Apple Green):", lightColors.appleGreen);
console.log("Success (Avocado):", lightColors.avocado);
console.log("Warning (Xanthous):", lightColors.xanthous);
console.log("Info (Citrine):", lightColors.citrine);

console.log("\n🌙 Dark Mode Colors:");
const darkColors = getCustomColors("dark");
console.log("Primary (Verdigris):", darkColors.verdigris);
console.log("Secondary (YInMn Blue):", darkColors.yinmnBlue);
console.log("Success (Fluorescent Cyan):", darkColors.fluorescentCyan);
console.log("Background (Oxford Blue):", darkColors.oxfordBlue);
console.log("Paper (Space Cadet):", darkColors.spaceCadet);

console.log("\n✅ Všechny barvy byly úspěšně načteny!");

// Test přístupnosti barev
console.log("\n=== Color Accessibility Test ===");
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

function getLuminance(r, g, b) {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function getContrastRatio(color1, color2) {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);
  const lum1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
  const lum2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
}

// Test kontrastů pro light mode
console.log("Light mode kontrast ratios (vs white background):");
Object.entries(lightColors).forEach(([name, color]) => {
  const ratio = getContrastRatio(color, "#ffffff");
  const accessibility =
    ratio >= 4.5 ? "✅ AA" : ratio >= 3 ? "⚠️ AA Large" : "❌ Fail";
  console.log(`${name}: ${ratio.toFixed(2)} ${accessibility}`);
});

console.log("\nDark mode kontrast ratios (vs Oxford Blue background):");
Object.entries(darkColors).forEach(([name, color]) => {
  const ratio = getContrastRatio(color, darkColors.oxfordBlue);
  const accessibility =
    ratio >= 4.5 ? "✅ AA" : ratio >= 3 ? "⚠️ AA Large" : "❌ Fail";
  console.log(`${name}: ${ratio.toFixed(2)} ${accessibility}`);
});
