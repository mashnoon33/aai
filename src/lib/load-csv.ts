import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

export type Trial = {
  "NCT Number": string,
  "Study Title": string,
  "Study URL": string,
  "Acronym": string,
  "Study Status": string,
  "Brief Summary": string,
  "Study Results": string,
  "Conditions": string,
  "Interventions": string,
  "Primary Outcome Measures": string,
  "Secondary Outcome Measures": string,
  "Other Outcome Measures": string,
  "Sponsor": string,
  "Collaborators": string,
  "Sex": string,
  "Age": string,
  "Phases": string,
  "Enrollment": string,
  "Funder Type": string,
  "Study Type": string,
  "Study Design": string,
  "Other IDs": string,
  "Start Date": string,
  "Primary Completion Date": string,
  "Completion Date": string,
  "First Posted": string,
  "Results First Posted": string,
  "Last Update Posted": string,
  "Locations": string,
  "Study Documents": string
}


export function loadCsvData(): Trial[] {
    const filePath = path.join(process.cwd(), 'src/data/ctg-studies.csv');
    const fileContent = fs.readFileSync(filePath, 'utf-8');
  
    const records = parse(fileContent, {
      columns: true, // First row = keys
      skip_empty_lines: true,
      trim: true,
    }) as Trial[]

    return records;
  }