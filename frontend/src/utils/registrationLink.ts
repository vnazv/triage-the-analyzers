/**
 * The query parameters of an invitation link (EmailService builds it as
 * /register?email=&token=&courseId=&sectionId=&role=). Both student and instructor
 * registration send courseId and sectionId to the backend, which requires them.
 */
export interface RegistrationLink {
  email: string
  token: string
  courseId: number
  sectionId: number
  role: string
}

/** Returns the parsed link, or null when the link is invalid and the page should refuse it. */
export function parseRegistrationLink(
  query: Record<string, string | undefined>
): RegistrationLink | null {
  const { email, token, courseId, sectionId, role } = query
  if (!email || !token || !role) {
    return null
  }
  return {
    email,
    token,
    courseId: parseInt(courseId),
    sectionId: parseInt(sectionId),
    role
  }
}
