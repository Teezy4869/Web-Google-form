// scratch/test_form_logic.js
import { validateField, validateAll, normalizePhone } from '../src/utils/validation.js';
import { submitGalaRegistration, GALA_FORM_MODE, GALA_GOOGLE_FORM_CONFIG, isGoogleFormConfigured } from '../src/services/googleForm.js';

console.log("=== RUNNING REGISTRATION FORM LOGIC TESTS ===");

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  [PASS] ${message}`);
    passed++;
  } else {
    console.error(`  [FAIL] ${message}`);
    failed++;
  }
}

// 1. Test empty form validation
const emptyData = {
  fullName: '',
  email: '',
  phone: '',
  studentId: '',
  className: '',
  attendeeType: '',
  note: '',
  consent: false
};
const emptyErrors = validateAll(emptyData);
assert(emptyErrors.fullName !== undefined, "Empty fullName returns error");
assert(emptyErrors.email !== undefined, "Empty email returns error");
assert(emptyErrors.phone !== undefined, "Empty phone returns error");
assert(emptyErrors.attendeeType !== undefined, "Empty attendeeType returns error");
assert(emptyErrors.consent !== undefined, "Empty consent returns error");
assert(emptyErrors.studentId === undefined, "Optional studentId has no error when empty");
assert(emptyErrors.className === undefined, "Optional className has no error when empty");
assert(emptyErrors.note === undefined, "Optional note has no error when empty");

// 2. Test valid data
const validData = {
  fullName: 'Nguyễn Văn An',
  email: 'an.nguyen@gmail.com',
  phone: '0983259655',
  studentId: '11234567',
  className: 'POHE 68A',
  attendeeType: 'Thành viên CLB',
  note: 'Không có ghi chú',
  consent: true
};
const validErrors = validateAll(validData);
assert(Object.keys(validErrors).length === 0, "Valid form data has 0 errors");

// 3. Test phone normalizer
assert(normalizePhone('098 325 9655') === '0983259655', "Phone normalized correctly with spaces");
assert(normalizePhone('098-325-9655') === '0983259655', "Phone normalized correctly with hyphens");
assert(normalizePhone('+84983259655') === '+84983259655', "Phone normalized correctly with +84");

// 4. Test invalid phone and email
assert(validateField('phone', '12345') !== null, "Invalid short phone flagged");
assert(validateField('email', 'not-an-email') !== null, "Invalid email flagged");

// 5. Test UNCONFIGURED safe submission
const unconfigResult = await submitGalaRegistration(validData);
assert(unconfigResult.status === 'unconfigured', "Default submission returns status 'unconfigured'");
assert(unconfigResult.success === false, "Default submission has success: false");
assert(unconfigResult.verified === false, "Default submission has verified: false");
assert(unconfigResult.data.fullName === validData.fullName, "User entered data strictly preserved in result");

// 6. Test MOCK mode
const mockResult = await submitGalaRegistration(validData, { mode: GALA_FORM_MODE.MOCK });
assert(mockResult.status === 'success', "Mock mode returns status 'success'");
assert(mockResult.success === true, "Mock mode returns success: true");

// 7. Test MOCK unverified mode
const mockUnverifiedResult = await submitGalaRegistration(validData, { mode: GALA_FORM_MODE.MOCK, simulateUnverified: true });
assert(mockUnverifiedResult.status === 'submitted_unverified', "Mock unverified returns status 'submitted_unverified'");
assert(mockUnverifiedResult.verified === false, "Mock unverified has verified: false");

console.log(`\nTests finished: ${passed} passed, ${failed} failed.`);
if (failed > 0) process.exit(1);
