import {DiagnosisGroup} from '../models/diagnosis-group';

export const DIAGNOSIS_GROUPS: DiagnosisGroup[] = [
  new DiagnosisGroup({
    abbreviation: "SB1",
    description: "Erkrankungen der Wirbelsäule, Gelenke und Extremitäten (mit motorisch-funktionellen Schädigungen)",
    keySymptomA: "Schädigung der Wirbelsäulen- und Gelenkfunktion",
    keySymptomB: "Schädigung der Muskelfunktion"
  }),
  new DiagnosisGroup({
    abbreviation: "SB2",
    description: "Erkrankungen der Wirbelsäule, Gelenke und Extremitäten (mit motorisch-funktionellen und sensomotorisch-perzeptiven Schädigungen)",
    keySymptomA: "Schädigung der Wirbelsäulen- und Gelenkfunktion",
    keySymptomB: "Schädigung der Muskelfunktion",
    keySymptomC: "Schädigung der Sinnes- und Bewegungsfunktionen"
  }),
  new DiagnosisGroup({
    abbreviation: "SB3",
    description: "System- und Autoimmunerkrankungen mit Bindegewebe-, Muskel- und Gefäßbeteiligung (mit motorisch-funktionellen/ sensomotorisch-perzeptiven Schädigungen)",
    keySymptomA: "Schädigung der Gelenkfunktionen",
    keySymptomB: "Schädigung der Muskelfunktion",
    keySymptomC: "Schädigung der Sinnes- und Bewegungsfunktionen"
  }),
  new DiagnosisGroup({
    abbreviation: "EN1",
    description: "ZNS-Erkrankungen (Gehirn) Entwicklungsstörungen",
    keySymptomA: "Schädigung der Bewegungsfunktionen",
    keySymptomB: "Schädigung der Sinnesfunktionen",
    keySymptomC: "Schädigung der mentalen Funktionen"
  }),
  new DiagnosisGroup({
    abbreviation: "EN2",
    description: "ZNS-Erkrankungen (Rückenmark)/ Neuromuskuläre Erkrankungen",
    keySymptomA: "Schädigung der Bewegungsfunktionen",
    keySymptomB: "Schädigung der Sinnesfunktionen",
    keySymptomC: "Schädigung der mentalen Funktionen"
  }),
  new DiagnosisGroup({
    abbreviation: "EN3",
    description: "Periphere Nervenläsionen/ Muskelerkrankungen",
    keySymptomA: "Schädigung der Bewegungsfunktionen",
    keySymptomB: "Schädigung der Sinnesfunktionen"
  }),
  new DiagnosisGroup({
    abbreviation: "PS1",
    description: "Entwicklungs-, Verhaltens- und emotionale Störungen mit Beginn in Kindheit und Jugend",
    keySymptomA: "Schädigung der globalen mentalen Funktionen",
    keySymptomB: "Schädigung der spezifischen mentalen Funktionen"
  }),
  new DiagnosisGroup({
    abbreviation: "PS2",
    description: "Neurotische, Belastungs-, somatoforme und Persönlichkeitsstörungen",
    keySymptomA: "Schädigung der globalen mentalen Funktionen",
    keySymptomB: "Schädigung der spezifischen mentalen Funktionen"
  }),
  new DiagnosisGroup({
    abbreviation: "PS3",
    description: "Wahnhafte und affektive Störungen/ Abhängigkeitserkrankungen",
    keySymptomA: "Schädigung der globalen mentalen Funktionen",
    keySymptomB: "Schädigung der spezifischen mentalen Funktionen"
  }),
  new DiagnosisGroup({
    abbreviation: "PS4",
    description: "Dementielle Syndrome",
    keySymptomA: "Schädigung der globalen mentalen Funktionen",
    keySymptomB: "Schädigung der spezifischen mentalen Funktionen"
  })
]
