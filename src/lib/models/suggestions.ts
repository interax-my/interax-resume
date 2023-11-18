export type Suggestion = {
  grammar_error: [];
  content_optimization: [];
  suitable_roles: [];
};

export const suggestionTitle = (str: string) => {
  switch (str.toLowerCase()) {
    case 'grammar_error': return "Grammartical Errors";
    case 'content_optimization': return "Content Improvements";
    case 'suitable_roles': return "Suitable Roles";
    default: return str;
  }
}