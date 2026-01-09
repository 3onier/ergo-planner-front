export class TherapyPrescription {
  public id?: number;
  public issue_date?: Date;
  public patient?: number;
  public doctor?: number;
  public icd_codes: string[] = [];
  public diagnosis?: string;
  public diagnosis_group?: string;
  public key_symptom_a : boolean = false;
  public key_symptom_b : boolean = false;
  public key_symptom_c : boolean = false;
  public key_symptom_individual_bool = false;
  public key_symptom_individual_text?: string;
  public therapy_report?: boolean;
  public home_visit?: boolean;
  public therapy_frequency?: string;
  public urgent?: boolean;
  public therapy_goals_and_comment?: string;


  constructor(params: Partial<TherapyPrescription> = {}) {
    Object.assign(this, params);
  }
}

export type TherapyPrescriptions = Array<TherapyPrescription>;
