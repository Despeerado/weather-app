# Oprava Autocomplete Dropdown - Scrolling Issue ✅

## Problém
Autocomplete našeptávač scrolloval dolů spolu se stránkou namísto aby zůstal fixován pod input polem.

## Řešení
Nahradili jsme `Portal` komponentu za `Popper` komponentu z MUI, která má vestavěnou podporu pro správné positioning a automatické přepočítávání pozice při scrollování.

### Klíčové změny v `CityAutocomplete.jsx`:

1. **Import změna**: 
   ```jsx
   // Před
   import { Portal, ClickAwayListener } from '@mui/material'
   
   // Po
   import { Popper, ClickAwayListener } from '@mui/material'
   ```

2. **Implementace Popper**:
   ```jsx
   <Popper
     open={isOpen && suggestions.length > 0}
     anchorEl={inputRef.current}
     placement="bottom-start"
     modifiers={[
       {
         name: 'offset',
         options: { offset: [0, 4] },
       },
       {
         name: 'preventOverflow',
         options: { boundary: 'viewport' },
       },
     ]}
     style={{ zIndex: 9999, width: inputRef.current?.getBoundingClientRect().width }}
   >
   ```

3. **Odebráno**: 
   - `getDropdownStyle()` funkce
   - Komplexní useEffect pro scroll/resize handling
   - Manual positioning logic

## Výhody nového řešení

✅ **Automatické positioning**: Popper automaticky řeší pozici dropdown
✅ **Scroll handling**: Vestavěná podpora pro scrollování stránky
✅ **Viewport boundaries**: Automatické přizpůsobení při nedostatku místa
✅ **Responsive**: Správně funguje na všech velikostech obrazovek
✅ **Performance**: Méně manual event listenerů
✅ **Accessibility**: Lepší podpora screen readerů

## Testování
- ✅ Dropdown se již nepohybuje při scrollování stránky
- ✅ Správně se pozicionuje pod input field
- ✅ Funguje na mobilních zařízeních
- ✅ Respektuje viewport boundaries

---
**Oprava dokončena: 1. června 2025**
