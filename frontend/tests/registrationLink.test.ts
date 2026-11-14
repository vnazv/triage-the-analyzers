// Slice 8, vue-tsc TS2345 at UserRegistration.vue:156-157 (parseInt of a possibly undefined courseId / sectionId).
// Run: node --test --experimental-strip-types tests/   (from frontend/; Node 22.6+)
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { parseRegistrationLink } from '../src/utils/registrationLink.ts'

const valid = {
  email: 'l.santos@abc.edu',
  token: 'registrationToken',
  courseId: '1',
  sectionId: '2',
  role: 'student'
}

test('a complete invitation link parses to numeric ids', () => {
  assert.deepEqual(parseRegistrationLink(valid), { ...valid, courseId: 1, sectionId: 2 })
})

// The bug: the page only checked email, token and role, so a link without courseId or sectionId showed the
// form with NaN ids, and the student only learned the link was bad when the backend rejected her submission.
test('a link without courseId is refused', () => {
  assert.equal(parseRegistrationLink({ ...valid, courseId: undefined }), null)
})

test('a link without sectionId is refused', () => {
  assert.equal(parseRegistrationLink({ ...valid, sectionId: undefined }), null)
})

test('a link whose ids are not numbers is refused', () => {
  assert.equal(parseRegistrationLink({ ...valid, sectionId: 'null' }), null)
})
