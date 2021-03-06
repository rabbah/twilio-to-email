/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Composition receives a Twilio webhook, projects two fields
 * for the sendmail action, and terminates the webhook response.
 */
composer.sequence(
  // inline function convenient for projections and schema alignment
  sms => ({ content: sms.Body, subject: `message from ${sms.From}`}),

  // cloud function referenced by name
  'schoa/sendmail',

  // this is the response to twilio webhook
  _ => ({ body: '<Response><Message>OK</Message></Response>' })
)
