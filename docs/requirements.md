# Cerințe – TaskBoard

## Cerințe funcționale
1. Utilizatorul poate adăuga un task cu: titlu (obligatoriu), prioritate, scadență.
2. Utilizatorul poate marca un task ca Done/Open.
3. Utilizatorul poate șterge un task.
4. Utilizatorul poate filtra taskurile după status: All/Open/Done.
5. Utilizatorul poate căuta taskuri după text (în titlu).
6. Aplicația păstrează taskurile între sesiuni (LocalStorage).

## Cerințe nefuncționale
- UI simplu, responsive (desktop + mobil).
- Cod modular (logică separată de UI).
- Teste unitare pentru funcțiile principale.
- Repository organizat + documentație minimă (README, changelog).

## Criterii de acceptare (scurt)
- Nu se poate salva un task cu titlu mai scurt de 2 caractere.
- Taskurile persistă după refresh (LocalStorage).
- Filtrarea după status și căutarea după text funcționează.
- Testele rulează cu succes (npm test).