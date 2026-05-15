# BloodDonate Torino 🩸

App React Native per la prenotazione delle donazioni di sangue a Torino e provincia.

## Funzionalità

### Schermata Home
- Card personale con gruppo sanguigno, livello donatore e totale donazioni
- Statistiche rapide (donazioni totali, vite salvate, giorni alla prossima donazione)
- Prossimo appuntamento confermato
- Accesso rapido alle sezioni
- Banner urgenze sangue nella città

### Prenotazione
- Flusso guidato a 5 step con progress stepper
- Selezione centro tra i centri AVIS/ospedalieri di Torino
- Scelta tipo di donazione (Sangue Intero, Plasma, Piastrine)
- Calendario date disponibili
- Selezione slot orario con disponibilità
- Riepilogo e conferma con modal di successo

### Documenti Medici
- Lista referti post-donazione con indicatori di valori anomali
- Dettaglio completo con tabella esami (emoglobina, ematocrito, glicemia, colesterolo, ferritina, ...)
- Filtro documenti con valori fuori range
- Riepilogo statistico (totali / normali / anomalie)

### Profilo Donatore
- Header con gradiente, avatar e dati principali
- Badge livello donatore con progress bar verso il livello successivo (Base → Periodico → Benemerito → D'Oro)
- Dati personali completi (CF, contatti, peso)
- Timeline cronologica di tutte le donazioni
- Impostazioni (notifiche, privacy, supporto)

## Architettura

```
src/
├── components/
│   ├── common/       # Button, Card, Badge, Avatar, ProgressBar, SectionHeader
│   ├── home/         # BloodTypeCard, NextAppointmentCard, StatsRow, EmergencyBanner
│   ├── booking/      # CenterCard, TimeSlotPicker
│   ├── documents/    # DocumentCard
│   └── profile/      # DonorBadge, DonationTimeline
├── screens/          # HomeScreen, BookingScreen, DocumentsScreen, ProfileScreen
├── navigation/       # AppNavigator (Bottom Tabs)
├── data/             # Mock data (utente, centri, donazioni, documenti)
├── theme/            # Colors, Typography, Spacing
└── types/            # TypeScript interfaces
```

## Centri di donazione inclusi

| Centro | Indirizzo | Tipo |
|--------|-----------|------|
| AVIS Comunale Torino | Via Nizza, 131 | Sangue Intero, Plasma, Piastrine |
| Ospedale Molinette | C.so Bramante, 88 | Sangue Intero, Plasma |
| Centro Trasfusionale CTO | Via Zuretti, 29 | Sangue Intero, Piastrine |
| Ospedale San Giovanni Bosco | P.za Donatore di Sangue, 3 | Sangue Intero, Plasma |
| AVIS Moncalieri | Via Roma, 120 | Sangue Intero |

## Requisiti tecnici

- Node.js ≥ 18
- Expo CLI
- React Native (Expo managed workflow)

## Avvio

```bash
git clone https://github.com/Anita-Liberatore/blood-donation-torino.git
cd blood-donation-torino
npm install --legacy-peer-deps
npx expo start
```

Poi scansiona il QR con l'app **Expo Go** su iOS o Android.

## Stack tecnico

- **React Native** + **Expo** (managed workflow)
- **TypeScript** per type safety
- **React Navigation** v7 (Bottom Tabs)
- **Expo Linear Gradient** per i gradienti
- **@expo/vector-icons** (Ionicons)
- **react-native-safe-area-context** per i safe area
- **react-native-gesture-handler** + **react-native-reanimated**

## Livelli donatore

| Livello | Donazioni richieste |
|---------|---------------------|
| Base | 0–4 |
| Periodico | 5–14 |
| Benemerito | 15–24 |
| D'Oro | 25+ |
