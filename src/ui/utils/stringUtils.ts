class StringUtils {
  static cleanString = (input: string) => {
    if (!input) {
      return '';
    }

    // Use regular expression to remove commas ,periods, hyphens and space
    const cleanedString = input.replace(/[,\.\s-]/g, '');

    return cleanedString;
  };

  static cleanStringExceptDot = (input: string) => {
    if (!input) {
      return '';
    }

    // Use regular expression to remove commas ,periods, hyphens and space
    const cleanedString = input.replace(/[,\s-]/g, '');

    return cleanedString;
  };

  static hasOnlyZeroOrOneDot(input: string): boolean {
    if (!input) {
      return false;
    }

    // Use regular expression to match dots
    const dotMatches = input.match(/\./g);

    // Check if there is exactly one dot
    return dotMatches === null || dotMatches.length === 1;
  }
}
export default StringUtils;
