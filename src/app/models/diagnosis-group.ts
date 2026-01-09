export class DiagnosisGroup {
  public abbreviation?: string;
  public description?: string;
  public keySymptomA?: string;
  public keySymptomB?: string;
  public keySymptomC?: string;

  public constructor(params?: Partial<DiagnosisGroup>) {
    Object.assign(this, params);
  }
}
