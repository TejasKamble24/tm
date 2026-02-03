
export interface QuestionEntry {
  id: string;
  question: string;
  answer: string;
}

export interface Section {
  id: string;
  title: string;
  questions: QuestionEntry[];
}

export interface AppData {
  masterTitle: string;
  sections: Section[];
  extraSections: {
    title: string;
    items?: string[];
    content?: string;
  }[];
}
