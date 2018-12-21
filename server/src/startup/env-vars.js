require('dotenv').config();

/**
 * @summary Makes sure all env vars are set
 */

const {
  // NODE_ENV,
  MONGO_URL,
  // MONGO_URL_TEST,
  JWT_PRIVATE_KEY,
  SMTP_HOST,
  SMTP_USERNAME,
  SMTP_PASSWORD,
  SMTP_PORT,
  GCM_PRIVATE_KEY,
  VAPID_SUBJECT,
  VAPID_PUBLIC_KEY,
  VAPID_PRIVATE_KEY,
} = process.env;

// if (NODE_ENV && NODE_ENV === 'test' && (!MONGO_URL_TEST || MONGO_URL_TEST.trim().length === 0)) {
//   console.error('FATAL ERROR: MONGO_URL_TEST env var missing');
//   process.exit(1);
// }

if (!MONGO_URL || MONGO_URL.trim().length === 0) {
  console.error('FATAL ERROR: MONGO_URL env var missing');
  process.exit(1);
}

if (!JWT_PRIVATE_KEY || JWT_PRIVATE_KEY.trim().length === 0) {
  console.error('FATAL ERROR: JWT_PRIVATE_KEY env var missing');
  process.exit(1);
}

if (
  !SMTP_HOST || SMTP_HOST.trim().length === 0
  || !SMTP_USERNAME || SMTP_USERNAME.trim().length === 0
  || !SMTP_PASSWORD || SMTP_PASSWORD.trim().length === 0
  || !SMTP_PORT || SMTP_PORT.trim().length === 0
) {
  console.error('FATAL ERROR: SMTP env vars missing');
  process.exit(1);
}

if (!GCM_PRIVATE_KEY || GCM_PRIVATE_KEY.trim().length === 0) {
  console.error('FATAL ERROR: GCM_PRIVATE_KEY env var missing');
  process.exit(1);
}

if (
  !VAPID_SUBJECT || VAPID_SUBJECT.trim().length === 0
  || !VAPID_PUBLIC_KEY || VAPID_PUBLIC_KEY.trim().length === 0
  || !VAPID_PRIVATE_KEY || VAPID_PRIVATE_KEY.trim().length === 0
) {
  console.error('FATAL ERROR: VAPID envs var missing');
  process.exit(1);
}
