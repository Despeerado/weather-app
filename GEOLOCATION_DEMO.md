# 📍 Geolocation Demo & Usage

## 🎯 Jak používat geolokaci

### Pro uživatele
1. **Otevři aplikaci** na https://localhost:3000
2. **Najdi SearchForm** (vyhledávací formulář)
3. **Klikni na 📍 tlačítko** (vedle favoritů)
4. **Povol přístup k poloze** (browser popup)
5. **Automaticky se načte lokální počasí** ✨

### Visual Guide
```
┌─────────────────────────────────────┐
│ 🔍 Vyhledat město                   │
├─────────────────────────────────────┤
│ [Praha____________] [📍] [⭐] [🔍] │ ← Klikni 📍
└─────────────────────────────────────┘
                         ↑
                    Geolocation
```

## 🔄 Workflow ukázka

### Scénář 1: Úspěšná geolokace
```
👤 User: Klikne 📍
🌐 Browser: "Povolit přístup k polohe?"
👤 User: "Povolit"
⏳ App: Zobrazí loading spinner
📡 GPS: Získá souřadnice (50.0755, 14.4378)
🌍 API: Reverse geocoding → "Praha"
🌦️ Weather: Načte počasí pro Prahu
✅ Result: Zobrazí počasí + grafy
```

### Scénář 2: Permission denied
```
👤 User: Klikne 📍  
🌐 Browser: "Povolit přístup k poloze?"
👤 User: "Blokovat"
❌ App: Zobrazí error tooltip
💡 Fallback: User může zadat město ručně
```

## 🎨 Visual States ukázka

### 1. Výchozí stav
```jsx
<IconButton> 
  <MyLocation color="orange" />  // 📍 Oranžová ikona
</IconButton>
// Tooltip: "Použít moji aktuální polohu"
```

### 2. Loading stav
```jsx
<IconButton disabled>
  <CircularProgress color="orange" />  // ⏳ Spinning
</IconButton>
// Tooltip: "Získávám vaši polohu..."
```

### 3. Error stav
```jsx
<IconButton>
  <MyLocation color="error" />  // 📍 Červená ikona
</IconButton>
// Tooltip: "Přístup k poloze byl zamítnut"
```

### 4. Nepodporováno
```jsx
<IconButton disabled>
  <LocationDisabled />  // 🚫 Zakázaná ikona
</IconButton>
// Tooltip: "Geolokace není podporována"
```

## 🔧 Developer Info

### API Calls při geolokaci
```javascript
// 1. Geolocation API
navigator.geolocation.getCurrentPosition()
// → {latitude: 50.0755, longitude: 14.4378}

// 2. Reverse Geocoding
GET /geo/1.0/reverse?lat=50.0755&lon=14.4378&appid={key}
// → [{name: "Praha", country: "CZ"}]

// 3. Weather API  
GET /weather?q=Praha&appid={key}&units=metric&lang=cs
GET /forecast?q=Praha&appid={key}&units=metric&lang=cs
// → Weather data + 5-day forecast
```

### Error Handling ukázka
```javascript
// Možné chyby a jejich handling:
switch (error.code) {
  case 1: // PERMISSION_DENIED
    showTooltip("Přístup k poloze byl zamítnut")
    break
  case 2: // POSITION_UNAVAILABLE  
    showTooltip("Informace o poloze nejsou dostupné")
    break
  case 3: // TIMEOUT
    showTooltip("Časový limit vypršel") 
    break
}
```

## 📱 Mobile Experience

### Touch Optimalizace
- **48px minimum touch target** ✅
- **Clear visual feedback** na touch ✅  
- **Loading states** pro pomalé sítě ✅
- **Error recovery** options ✅

### Responsive Layout
```
Mobile:                Desktop:
┌─────────────┐       ┌──────────────────────┐
│ [Input____] │       │ [Input] [📍][⭐][🔍] │
│ [📍][⭐][🔍] │       └──────────────────────┘
└─────────────┘
```

## 🌟 Advanced Features

### Smart Caching
```javascript
// Geolocation results cache:
coordinates: 5 minutes    // GPS coordinates
cityName: 5 minutes      // Reverse geocoding
weatherData: API default // Weather service cache
```

### Fallback Chain
```
1. GPS coords → City name → Weather ✅
2. GPS coords → Direct coords → Weather ✅  
3. Network location → City name → Weather ✅
4. Manual input → Weather ✅
```

### Accessibility
```jsx
// ARIA labels pro screen readery:
<IconButton 
  aria-label="Použít aktuální polohu"
  aria-describedby="geolocation-tooltip"
>
  <MyLocation />
</IconButton>
```

## 🎯 Performance Optimizations

### Efficient API Usage
- **Single geolocation request** per user action
- **Cached reverse geocoding** (5 min)
- **Reused weather service** infrastructure
- **Minimal re-renders** through proper state management

### Bundle Size Impact
```
New dependencies: 0 bytes
New components: ~2KB gzipped
Total impact: Minimal
```

## 🧪 Testing Checklist

### Manual Testing
- [ ] Klikni 📍 tlačítko
- [ ] Povol geolokaci → mělo by se načíst místní počasí
- [ ] Zakažj geolokaci → měla by se zobrazit chyba  
- [ ] Testuj na HTTPS (geolokace nefunguje na HTTP)
- [ ] Testuj mobile responsive design
- [ ] Ověř accessibility (tab navigation)

### Browser Compatibility
- [ ] Chrome (desktop + mobile)
- [ ] Safari (desktop + mobile)  
- [ ] Firefox
- [ ] Edge

---

## 🚀 Ready to Use!

Geolokace je nyní plně funkční a integrovaná do aplikace. Uživatelé mohou jednoduchým kliknutím na 📍 tlačítko získat počasí pro svou aktuální polohu bez nutnosti ručního zadávání města! 

**One-click weather is here!** ⚡📍
