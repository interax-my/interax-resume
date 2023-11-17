type SuggestionContent = {
  answer: boolean;
  justification: string;
  suggestion: string;
};
export type Suggestion = {
  [key: string]: SuggestionContent;
  'Professional Email': SuggestionContent;
  'Location Privacy': SuggestionContent;
  'Graduation Date': SuggestionContent;
  'Job Responsibilities': SuggestionContent;
  'Job Location': SuggestionContent;
  Skills: SuggestionContent;
  'Certification Expiry': SuggestionContent;
};
