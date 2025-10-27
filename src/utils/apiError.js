
export function parseApiError(errorResponse) {
  // If ProblemDetails with validation errors
  if (errorResponse.errors) {
    // Flatten validation errors
    const messages = Object.entries(errorResponse.errors)
      .map(([key, msgs]) => `${key}: ${msgs.join(", ")}`)
      .join(" | ");
    return messages;
  }

  // Fallback: just use the title or detail
  return errorResponse.detail || errorResponse.title || "Unknown error occurred";
}
